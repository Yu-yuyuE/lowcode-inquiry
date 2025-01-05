import React from "react";
import styles from "./index.module.scss";
import { Button, Layout } from "@arco-design/web-react";
import { Outlet } from "react-router-dom";

const { Header, Footer, Content, Sider } = Layout;

function QuestionLayout() {
  return (
    <div style={{ height: "100vh" }}>
      <Outlet />
    </div>
  );
}

export default QuestionLayout;
