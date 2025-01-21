import React, { FunctionComponent, useState } from "react";
import "./index.module.scss";
import {
  Button,
  Message,
  Modal,
  Space,
  Spin,
  Table,
  TableColumnProps,
  Tag,
} from "@arco-design/web-react";
import { useRequest, useTitle } from "ahooks";
import { useLoadQuestionListData } from "@/hooks/useLoadQuestionListData";
import { batchUpdateQuestionService, deleteQuestionsService } from "@/services/question";
import { IconDelete } from "@arco-design/web-react/icon";

const { confirm } = Modal;

interface TrashProps {}

const columns: TableColumnProps[] = [
  {
    title: "标题",
    dataIndex: "title",
  },
  {
    title: "是否发布",
    dataIndex: "isPublished",
    render: (isPublished: boolean) => {
      return isPublished ? <Tag color="green">已发布</Tag> : <Tag>未发布</Tag>;
    },
  },
  {
    title: "答卷",
    dataIndex: "answerCount",
  },
  {
    title: "创建时间",
    dataIndex: "createdAt",
  },
];

const Trash: FunctionComponent<TrashProps> = () => {
  useTitle("低代码问卷 - 回收站");

  // 记录选中的 id
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const { data = {}, loading, refresh } = useLoadQuestionListData({ isDeleted: true });
  const { list = [], total = 0 } = data;
  // 恢复
  const { run: recover } = useRequest(
    async () => {
      await batchUpdateQuestionService({ isDeleted: false, ids: selectedIds });
    },
    {
      manual: true,
      debounceWait: 500, // 防抖
      onSuccess() {
        Message.success("恢复成功");
        refresh(); // 手动刷新列表
        setSelectedIds([]);
      },
    },
  );

  const { run: deleteQuestion } = useRequest(
    async () => await deleteQuestionsService(selectedIds),
    {
      manual: true,
      onSuccess() {
        Message.success("删除成功");
        refresh();
        setSelectedIds([]);
      },
    },
  );

  function onRecover() {
    console.log(selectedIds);
    console.log("onRecover");
    recover();
  }

  function onDelete() {
    confirm({
      title: "确认彻底删除该问卷？",
      icon: <IconDelete />,
      content: "删除以后不可以找回",
      onOk: deleteQuestion,
    });
  }

  return (
    <>
      {loading ? (
        <div style={{ textAlign: "center", marginTop: "60px" }}>
          <Spin />
        </div>
      ) : (
        <Space direction="vertical" style={{ width: "100%" }}>
          <Space>
            <Button type="outline" onClick={onRecover}>
              恢复
            </Button>
            <Button type="outline" status="danger" onClick={onDelete}>
              彻底删除
            </Button>
          </Space>
          <Table
            rowKey="_id"
            columns={columns}
            data={list}
            rowSelection={{
              type: "checkbox",
              onChange: selectedRowKeys => {
                setSelectedIds(selectedRowKeys as string[]);
              },
            }}
          />
        </Space>
      )}
    </>
  );
};

export default Trash;
