import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useRequest } from "ahooks";
import { updateQuestionService, duplicateQuestionService } from "@/services/question";
import styles from "./index.module.scss";
import {
  Button,
  Divider,
  Icon,
  Message,
  Modal,
  Popconfirm,
  Space,
  Tag,
} from "@arco-design/web-react";
import {
  IconCopy,
  IconDelete,
  IconEdit,
  IconInfoCircle,
  IconStar,
} from "@arco-design/web-react/icon";

type PropsType = {
  _id: string;
  title: string;
  isPublished: boolean;
  isStar: boolean;
  answerCount: number;
  createdAt: string;
};

const { confirm } = Modal;
const IconFont = Icon.addFromIconFontCn({
  src: "//at.alicdn.com/t/c/font_4810396_bji5d4z3ps.js",
});

function QuestionCard(props: PropsType) {
  const nav = useNavigate();

  const { _id, title, createdAt, answerCount, isPublished, isStar } = props;

  // 修改 标星
  const [isStarState, setIsStarState] = useState(isStar);
  const { loading: changeStarLoading, run: changeStar } = useRequest(
    async () => {
      await updateQuestionService(_id, { isStar: !isStarState });
    },
    {
      manual: true,
      onSuccess() {
        setIsStarState(!isStarState); // 更新 state
        Message.success("已更新");
      },
    },
  );

  // 复制
  const { loading: duplicateLoading, run: duplicate } = useRequest(
    async () => await duplicateQuestionService(_id),
    {
      manual: true,
      onSuccess(result) {
        Message.success("复制成功");
        nav(`/question/edit/${result.id}`); // 跳转到问卷编辑页
      },
    },
  );

  // 删除
  const [isDeletedState, setIsDeletedState] = useState(false);
  const { loading: deleteLoading, run: deleteQuestion } = useRequest(
    async () => await updateQuestionService(_id, { isDeleted: true }),
    {
      manual: true,
      onSuccess() {
        Message.success("删除成功");
        setIsDeletedState(true);
      },
    },
  );
  function del() {
    confirm({
      title: "确定删除该问卷？",
      icon: <IconInfoCircle />,
      onOk: deleteQuestion,
    });
  }
  // 已经删除的问卷，不要再渲染卡片了
  if (isDeletedState) return null;

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}>
            <Space>
              {isStarState && <IconStar style={{ color: "orange" }} />}
              {title}
            </Space>
          </Link>
        </div>
        <div className={styles.right}>
          <Space>
            {isPublished ? <Tag color="green">已发布</Tag> : <Tag>未发布</Tag>}
            <span>答卷: {answerCount}</span>
            <span>{createdAt}</span>
          </Space>
        </div>
      </div>
      <Divider style={{ margin: "12px 0" }} />
      <div className={styles["button-container"]}>
        <div className={styles.left}>
          <Space>
            <Button
              icon={<IconEdit />}
              type="text"
              size="small"
              onClick={() => nav(`/question/edit/${_id}`)}>
              编辑问卷
            </Button>
            <Button
              icon={<IconFont type="icon-line-chart-line" />}
              type="text"
              size="small"
              onClick={() => nav(`/question/stat/${_id}`)}
              disabled={!isPublished}>
              问卷统计
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Space>
            <Button
              type="text"
              icon={<IconStar />}
              size="small"
              onClick={changeStar}
              disabled={changeStarLoading}
              status="warning">
              {isStarState ? "取消标星" : "标星"}
            </Button>
            <Popconfirm title="确定复制该问卷？" okText="确定" cancelText="取消" onOk={duplicate}>
              <Button type="text" icon={<IconCopy />} size="small" loading={duplicateLoading}>
                复制
              </Button>
            </Popconfirm>
            <Button
              type="text"
              icon={<IconDelete />}
              size="small"
              onClick={del}
              disabled={deleteLoading}
              status="danger">
              删除
            </Button>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default QuestionCard;
