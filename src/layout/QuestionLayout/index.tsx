import React from "react";
import styles from "./index.module.scss";
import { Button, Layout, Spin } from "@arco-design/web-react";
import { Outlet } from "react-router-dom";
import { useLoadUserData } from "@/hooks";

const { Header, Footer, Content, Sider } = Layout;

function QuestionLayout() {
  const { hasUserData } = useLoadUserData();
  return (
    <div style={{ height: "100vh" }}>
      {hasUserData ? (
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
