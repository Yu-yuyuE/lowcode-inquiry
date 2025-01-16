import React, { FunctionComponent } from "react";
import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";
import { Button, Result } from "@arco-design/web-react";
import { MANAGE_INDEX_PATHNAME } from "@/router";

interface NotFoundProps {}

const NotFound: FunctionComponent<NotFoundProps> = () => {
  const nav = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle="抱歉，您访问的页面不存在"
      extra={
        <Button type="primary" onClick={() => nav(MANAGE_INDEX_PATHNAME)}>
          返回首页
        </Button>
      }></Result>
  );
};

export default NotFound;
