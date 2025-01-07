import React from "react";
import styles from "./index.module.scss";
import { Button, Layout, Spin } from "@arco-design/web-react";
import { Outlet } from "react-router-dom";
import { useLoadUserData, useNavPage } from "@/hooks";
import { Logo, User } from "@/components";

const { Header, Footer, Content, Sider } = Layout;

function MainLayout() {
  const { isWaitingUserData } = useLoadUserData();
  useNavPage(isWaitingUserData);
  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>
          <Logo />
        </div>
        <div className={styles.right}>
          <User />
        </div>
      </Header>
      <Layout className={styles.main}>
        <Content>
          {isWaitingUserData ? (
            <div style={{ textAlign: "center", marginTop: "60px" }}>
              <Spin />
            </div>
          ) : (
            <Outlet />
          )}
        </Content>
      </Layout>
      <Footer className={styles.footer}>低代码问卷 &copy;2025. Created by EthanY</Footer>
    </Layout>
  );
}

export default MainLayout;
