import React, { FC, useCallback } from "react";
import { nanoid } from "nanoid";
import { useDispatch } from "react-redux";
import { addComponent } from "@/store/componentsReducer";
import styles from "./index.module.scss";
import { componentConfGroup, ComponentConfType } from "@/components/QuestionComponents";

function genComponent(c: ComponentConfType) {
  const { title, type, Component, defaultProps } = c;
  const dispatch = useDispatch();

  const handleClick = useCallback(() => {
    dispatch(
      addComponent({
        fe_id: nanoid(), // 前端生成的 id
        title,
        type,
        props: defaultProps,
      }),
    );
  }, []);

  return (
    <div key={type} className={styles.wrapper} onClick={handleClick}>
      <div className={styles.component}>
        <Component />
      </div>
    </div>
  );
}

const ComponentLib: FC = () => {
  return (
    <>
      {componentConfGroup?.map((group, index) => {
        const { groupId, groupName, components } = group;
        return (
          <div key={groupId}>
            <h3 style={{ fontSize: "16px", marginTop: index > 0 ? "20px" : "0" }}>{groupName}</h3>
            <div>{components.map((item: any) => genComponent(item))}</div>
          </div>
        );
      })}
    </>
  );
};
export default ComponentLib;
