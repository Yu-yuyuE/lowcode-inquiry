import React, { FC, useState, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useRequest, useKeyPress, useDebounceEffect } from "ahooks";
import { useGetPageInfo, useGetComponentInfo } from "@/hooks";
import { changePageTitle } from "@/store/pageInfoReducer";
import { updateQuestionService } from "@/services/question";
import EditToolbar from "../EditToolbar";
import styles from "./index.module.scss";
import { Button, Input, Message, Space, Typography } from "@arco-design/web-react";
import { IconEdit, IconLeft, IconLoading } from "@arco-design/web-react/icon";

const { Title } = Typography;

// 显示和修改标题
const TitleElem: FC = () => {
  const { title } = useGetPageInfo();
  const dispatch = useDispatch();

  const [editState, setEditState] = useState(false);

  function handleChange(value) {
    if (!value) return;
    dispatch(changePageTitle(value));
  }

  return editState ? (
    <Input
      value={title}
      onChange={handleChange}
      onPressEnter={() => setEditState(false)}
      onBlur={() => setEditState(false)}
    />
  ) : (
    <Space>
      <h3 style={{ margin: 0 }}>{title}</h3>
      <Button icon={<IconEdit />} type="text" onClick={() => setEditState(true)} size="small" />
    </Space>
  );
};

// 保存按钮
const SaveButton: FC = () => {
  const { id } = useParams();
  const { componentList = [] } = useGetComponentInfo();
  const pageInfo = useGetPageInfo();

  const { loading, run: save } = useRequest(
    async () => {
      if (!id) return;
      await updateQuestionService(id, { ...pageInfo, componentList });
    },
    {
      manual: true,
      onSuccess() {
        Message.success("保存成功");
      },
    },
  );

  // 快捷键
  useKeyPress(["ctrl.s", "meta.s"], (event: KeyboardEvent) => {
    event.preventDefault();
    if (!loading) save();
  });

  // 自定保存（不是定期保存，不是定时器）
  useDebounceEffect(
    () => {
      save();
    },
    [componentList, pageInfo],
    {
      wait: 1000,
    },
  );

  return (
    <Button onClick={save} disabled={loading} icon={loading ? <IconLoading /> : null}>
      保存
    </Button>
  );
};

// 发布按钮
const PublishButton: FC = () => {
  const nav = useNavigate();
  const { id } = useParams();
  const { componentList = [] } = useGetComponentInfo();
  const pageInfo = useGetPageInfo();

  const { loading, run: pub } = useRequest(
    async () => {
      if (!id) return;
      await updateQuestionService(id, {
        ...pageInfo,
        componentList,
        isPublished: true, // 标志着问卷已经被发布
      });
    },
    {
      manual: true,
      onSuccess() {
        Message.success("发布成功");
        nav("/question/stat/" + id); // 发布成功，跳转到统计页面
      },
    },
  );

  return (
    <Button type="primary" onClick={pub} disabled={loading} icon={loading ? <IconLoading /> : null}>
      发布
    </Button>
  );
};

const EditHeader: FC = () => {
  const nav = useNavigate();

  return (
    <div className={styles["header-wrapper"]}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="text" icon={<IconLeft />} onClick={() => nav(-1)}>
              返回
            </Button>
            <TitleElem />
          </Space>
        </div>
        <div className={styles.main}>
          <EditToolbar />
        </div>
        <div className={styles.right}>
          <Space>
            <SaveButton />
            <PublishButton />
          </Space>
        </div>
      </div>
    </div>
  );
};

export default EditHeader;
