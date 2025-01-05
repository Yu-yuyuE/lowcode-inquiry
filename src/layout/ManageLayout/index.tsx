import React from "react";
import styles from "./index.module.scss";
import { Button, Divider, Layout, Menu, Space } from "@arco-design/web-react";
import { Outlet } from "react-router-dom";
import { IconPlus, IconDelete, IconStar, IconList } from "@arco-design/web-react/icon";

const MenuItem = Menu.Item;
const { Header, Footer, Content, Sider } = Layout;

function ManageLayout() {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Space direction="vertical">
          <Button type="primary" size="large" icon={<IconPlus />}>
            创建问卷
          </Button>
          <Divider style={{ borderTop: "transparent" }} />
          <Menu mode="vertical" defaultSelectedKeys={["0"]}>
            <MenuItem key="0">
              <IconList />
              我的问卷
            </MenuItem>
            <MenuItem key="1">
              <IconStar />
              星标问卷
            </MenuItem>
            <MenuItem key="2">
              <IconDelete />
              回收站
            </MenuItem>
          </Menu>
        </Space>
      </div>
      <div className={styles.right}>
        <Outlet />
      </div>
    </div>
  );
}

export default ManageLayout;
