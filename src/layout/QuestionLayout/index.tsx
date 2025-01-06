import React from "react";
import styles from "./index.module.scss";
import { Button, Layout, Spin } from "@arco-design/web-react";
import { Outlet } from "react-router-dom";
import { useLoadUserData, useNavPage } from "@/hooks";

const { Header, Footer, Content, Sider } = Layout;

function QuestionLayout() {
  const { isWaitingUserData } = useLoadUserData();
  useNavPage(isWaitingUserData);
  return (
    <div style={{ height: "100vh" }}>
      {isWaitingUserData ? (
        <div style={{ textAlign: "center", marginTop: "60px" }}>
          <Spin />
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  );
}

export default QuestionLayout;
