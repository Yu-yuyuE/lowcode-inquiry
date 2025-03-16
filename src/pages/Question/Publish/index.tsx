import React, { FunctionComponent } from "react";
import styles from "./index.module.scss";
import { useGetComponentInfo, useGetPageInfo, useLoadQuestionData } from "@/hooks";
import { useDispatch } from "react-redux";
import { Button, Space, Spin } from "@arco-design/web-react";
import { IconFile } from "@arco-design/web-react/icon";
import { useTitle } from "ahooks";
import PublishCanvas from "./PublishCanvas";

interface PublishProps {}

const Publish: FunctionComponent<PublishProps> = () => {
  const { loading } = useLoadQuestionData();
  const { title } = useGetPageInfo();
  useTitle(`低代码问卷-${title}`);

  return loading ? (
    <div style={{ textAlign: "center", marginTop: "60px" }}>
      <Spin />
    </div>
  ) : (
    <div className={styles.container}>
      <div className={styles["header-container"]}>
        <Space>
          <h1>
            <IconFile />
          </h1>
          <h1>{title}</h1>
        </Space>
      </div>
      <div className={styles["canvas-wrapper"]}>
        <PublishCanvas />
      </div>
    </div>
  );
};

export default Publish;
