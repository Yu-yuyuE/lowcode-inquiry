import React from "react";
import { useDispatch } from "react-redux";
import { ActionCreators as UndoActionCreators } from "redux-undo";
import {
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
  moveComponent,
} from "@/store/componentsReducer";
import { useGetComponentInfo } from "@/hooks";
import { Button, Space, Tooltip } from "@arco-design/web-react";
import {
  IconBackward,
  IconCodeBlock,
  IconCopy,
  IconDesktop,
  IconDown,
  IconEyeInvisible,
  IconLock,
  IconRedo,
  IconUp,
} from "@arco-design/web-react/icon";

const EditToolbar = () => {
  const dispatch = useDispatch();
  const { selectedId, selectedComponent, copiedComponent, componentList } = useGetComponentInfo();
  const { isLocked } = selectedComponent || {};
  const length = componentList.length;
  const selectedIndex = componentList.findIndex(c => c.fe_id === selectedId);
  const isFirst = selectedIndex <= 0; // 第一个
  const isLast = selectedIndex + 1 >= length; // 最后一个
  // 删除
  const handleDelete = () => {
    dispatch(removeSelectedComponent());
  };

  // 隐藏组件
  function handleHidden() {
    dispatch(changeComponentHidden({ fe_id: selectedId, isHidden: true }));
  }
  // 锁定组件
  function handleLock() {
    dispatch(toggleComponentLocked({ fe_id: selectedId }));
  }

  // 复制
  function copy() {
    dispatch(copySelectedComponent());
  }

  // 粘贴
  function paste() {
    dispatch(pasteCopiedComponent());
  }

  // 上移
  function moveUp() {
    if (isFirst) return;
    dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex - 1 }));
  }

  // 下移
  function moveDown() {
    if (isLast) return;
    dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex + 1 }));
  }
  // 撤销
  function undo() {
    dispatch(UndoActionCreators.undo());
  }

  // 重做
  function redo() {
    dispatch(UndoActionCreators.redo());
  }

  return (
    <Space>
      <Tooltip content="删除">
        <Button shape="circle" icon={<IconDesktop />} onClick={handleDelete}></Button>
      </Tooltip>
      <Tooltip content="隐藏">
        <Button shape="circle" icon={<IconEyeInvisible />} onClick={handleHidden}></Button>
      </Tooltip>
      <Tooltip content="锁定">
        <Button
          shape="circle"
          icon={<IconLock />}
          onClick={handleLock}
          type={isLocked ? "primary" : "default"}></Button>
      </Tooltip>
      <Tooltip content="复制">
        <Button shape="circle" icon={<IconCopy />} onClick={copy}></Button>
      </Tooltip>
      <Tooltip content="粘贴">
        <Button
          shape="circle"
          icon={<IconCodeBlock />}
          onClick={paste}
          disabled={copiedComponent == null}></Button>
      </Tooltip>
      <Tooltip content="上移">
        <Button shape="circle" icon={<IconUp />} onClick={moveUp} disabled={isFirst}></Button>
      </Tooltip>
      <Tooltip content="下移">
        <Button shape="circle" icon={<IconDown />} onClick={moveDown} disabled={isLast}></Button>
      </Tooltip>
      <Tooltip content="撤销">
        <Button shape="circle" icon={<IconBackward />} onClick={undo}></Button>
      </Tooltip>
      <Tooltip content="重做">
        <Button shape="circle" icon={<IconRedo />} onClick={redo}></Button>
      </Tooltip>
    </Space>
  );
};

export default EditToolbar;
