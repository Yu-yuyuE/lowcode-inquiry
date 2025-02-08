import React, { FC } from "react";
import { useDispatch } from "react-redux";
import classNames from "classnames";
import { useGetComponentInfo, useBindCanvasKeyPress } from "@/hooks";
import { getComponentConfByType } from "@/components/QuestionComponents";
import { ComponentInfoType, changeSelectedId, moveComponent } from "@/store/componentsReducer";
import SortableContainer from "@/components/DragSortable/SortableContainer";
import SortableItem from "@/components/DragSortable/SortableItem";
import styles from "./index.module.scss";
import { Spin } from "@arco-design/web-react";

type PropsType = {
  loading: boolean;
};

function genComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo; // 每个组件的信息，是从 redux store 获取的（服务端获取）

  const componentConf = getComponentConfByType(type);
  if (componentConf == null) return null;

  const { Component } = componentConf;
  return <Component {...props} />;
}

const Edit: FC<PropsType> = ({ loading }) => {
  const { componentList, selectedId } = useGetComponentInfo();
  const dispatch = useDispatch();

  // 点击组件，选中
  function handleClick(event: MouseEvent, id: string) {
    event.stopPropagation(); // 阻止冒泡
    dispatch(changeSelectedId(id));
  }

  // 绑定快捷键
  useBindCanvasKeyPress();

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "24px" }}>
        <Spin />
      </div>
    );
  }
  // SortableContainer 组件的 items 属性，需要每个 item 都有 id
  const componentListWithId = componentList.map(c => {
    return { ...c, id: c.fe_id };
  });

  // 拖拽排序结束
  function handleDragEnd(oldIndex: number, newIndex: number) {
    dispatch(moveComponent({ oldIndex, newIndex }));
  }
  return (
    <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
      <div className={styles.canvas}>
        {componentList?.map(item => {
          const { fe_id, isLocked } = item;
          // 拼接 class name
          const wrapperDefaultClassName = styles["component-wrapper"];
          const selectedClassName = styles.selected;
          const lockedClassName = styles.locked;
          const wrapperClassName = classNames({
            [wrapperDefaultClassName]: true,
            [selectedClassName]: fe_id === selectedId,
            [lockedClassName]: isLocked,
          });

          return (
            <SortableItem key={item.fe_id} id={item.fe_id}>
              <div className={wrapperClassName} onClick={(e: any) => handleClick(e, item.fe_id)}>
                <div className={styles.component}>{genComponent(item)}</div>
              </div>
            </SortableItem>
          );
        })}
      </div>
    </SortableContainer>
  );
};

export default Edit;
