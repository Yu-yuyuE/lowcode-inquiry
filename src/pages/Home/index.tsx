import React from "react";
import styles from "./index.module.scss";
import { Button, Layout } from "@arco-design/web-react";
import { MANAGE_INDEX_PATHNAME } from "@/router";
import { useNavigate } from "react-router-dom";
import Paragraph from "@arco-design/web-react/es/Typography/paragraph";

const { Header, Footer, Content, Sider } = Layout;

function Home() {
  const nav = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <h1>问卷调查 | 在线投票</h1>
        <Paragraph>已累计创建问卷 100 份，发布问卷 10 份，收到答卷 80 份</Paragraph>
        <div>
          <Button type="primary" onClick={() => nav(MANAGE_INDEX_PATHNAME)}>
            开始使用
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Home;
