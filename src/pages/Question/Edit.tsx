import React, { FunctionComponent } from "react";
import styles from "./index.module.scss";
import EditHeader from "./EditHeader";

interface EditProps {}

const Edit: FunctionComponent<EditProps> = () => {
  return (
    <div className={styles.container}>
      <EditHeader />
      <div className={styles["content-wrapper"]}>
        <div className={styles.content}>
          <div className={styles.left}>left</div>
          <div className={styles.main}>
            <div className={styles["canvas-wrapper"]}>middle</div>
          </div>
          <div className={styles.right}>right</div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
