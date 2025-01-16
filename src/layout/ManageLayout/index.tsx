import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { Button, Divider, Layout, Menu, Message, Space } from "@arco-design/web-react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { IconPlus, IconDelete, IconStar, IconList } from "@arco-design/web-react/icon";
import { useNavPage } from "@/hooks";
import { MANAGE_INDEX_PATHNAME, MANAGE_STAR_PATHNAME, MANAGE_TRASH_PATHNAME } from "@/router";
import { useRequest } from "ahooks";
import { createQuestionService } from "@/services/question";

const MenuItem = Menu.Item;
const MenuItemKeyMap = {
  "/manage/list": "0",
  "/manage/star": "1",
  "/manage/trash": "2",
};

function ManageLayout() {
  const nav = useNavigate();
  const { pathname } = useLocation();
  const [selectedKeys, setSelectedKeys] = useState<string[]>(["0"]);
  const { loading, run: handleCreateQuestion } = useRequest(createQuestionService, {
    manual: true,
    onSuccess(result) {
      nav(`/question/edit/${result.id}`);
      Message.success("创建成功");
    },
  });

  useEffect(() => {
    const key = MenuItemKeyMap[pathname];
    if (key) {
      setSelectedKeys([key]);
    }
  }, [pathname]);

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Space direction="vertical">
          <Button
            type="primary"
            size="large"
            icon={<IconPlus />}
            onClick={handleCreateQuestion}
            disabled={loading}>
            创建问卷
          </Button>
          <Divider style={{ borderTop: "transparent" }} />
          <Menu mode="vertical" defaultSelectedKeys={["0"]} selectedKeys={selectedKeys}>
            <MenuItem key="0" onClick={() => nav(MANAGE_INDEX_PATHNAME)}>
              <IconList />
              我的问卷
            </MenuItem>
            <MenuItem key="1" onClick={() => nav(MANAGE_STAR_PATHNAME)}>
              <IconStar />
              星标问卷
            </MenuItem>
            <MenuItem key="2" onClick={() => nav(MANAGE_TRASH_PATHNAME)}>
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
