import React, { FunctionComponent } from "react";
import styles from "./index.module.scss";
import EditHeader from "./EditHeader";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import { useDispatch } from "react-redux";
import { changeSelectedId } from "@/store/componentsReducer";
import { useLoadQuestionData } from "@/hooks";
import EditCanvas from "./EditCanvas";

interface EditProps {}

const Edit: FunctionComponent<EditProps> = () => {
  const { loading } = useLoadQuestionData();
  const dispatch = useDispatch();

  function clearSelectedId() {
    dispatch(changeSelectedId(""));
  }
  return (
    <div className={styles.container}>
      <EditHeader />
      <div className={styles["content-wrapper"]}>
        <div className={styles.content}>
          <div className={styles.left}>
            <LeftPanel />
          </div>
          <div className={styles.main} onClick={clearSelectedId}>
            <div className={styles["canvas-wrapper"]}>
              <EditCanvas loading={loading} />
            </div>
          </div>
          <div className={styles.right}>
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
