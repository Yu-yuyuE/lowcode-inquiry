import React from "react";
import styles from "./index.module.scss";
import { Button, Layout } from "@arco-design/web-react";
import { Outlet } from "react-router-dom";

const { Header, Footer, Content, Sider } = Layout;

function MainLayout() {
  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>logo</div>
        <div className={styles.right}>user</div>
      </Header>
      <Content>
        <Outlet />
      </Content>
      <Footer className={styles.footer}>
        低代码问卷 &copy;2025. Created by EthanY
      </Footer>
    </Layout>
  );
}

export default MainLayout;
