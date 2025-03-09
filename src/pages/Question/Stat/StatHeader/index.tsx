import React, { useMemo, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import QRCode from "qrcode.react";
import { useGetPageInfo } from "@/hooks";
import styles from "./index.module.scss";
import {
  Button,
  Input,
  Message,
  Popover,
  Space,
  Tooltip,
  Typography,
} from "@arco-design/web-react";
import { IconCopy, IconLeft, IconQrcode } from "@arco-design/web-react/icon";
import { API_URL } from "@/constants";

const { Title } = Typography;
const StatHeader = () => {
  const nav = useNavigate();
  const { id } = useParams();
  const { title, isPublished } = useGetPageInfo();
  // 拷贝链接
  const urlInputRef = useRef<any>(null);
  function copy() {
    // const elem = urlInputRef.current;
    // if (elem == null) return;
    // elem.select(); // 选中 input 的内容
    // document.execCommand("copy"); // 拷贝选中内容 （富文本编辑器的操作）
    Message.success("拷贝成功");
  }
  // 使用 useMemo 1. 依赖项是否经常变化; 2. 缓存的元素是否创建成本较高
  const LinkAndQRCodeElem = useMemo(() => {
    if (!isPublished) return null;

    // 拼接 url ，需要参考 C 端的规则
    const url = `${API_URL}/question/${id}`;

    // 定义二维码组件
    const QRCodeElem = (
      <div style={{ textAlign: "center" }}>
        <QRCode value={url} size={150} />
      </div>
    );

    return (
      <Space>
        <Input value={url} style={{ width: "300px" }} ref={urlInputRef} />
        <Tooltip content="拷贝链接">
          <Button icon={<IconCopy />} onClick={copy}></Button>
        </Tooltip>
        <Popover content={QRCodeElem}>
          <Button icon={<IconQrcode />}></Button>
        </Popover>
      </Space>
    );
  }, [id, isPublished]);
  return (
    <div className={styles["header-wrapper"]}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="text" icon={<IconLeft />} onClick={() => nav(-1)}>
              返回
            </Button>
            <span style={{ fontSize: 18, fontWeight: 500 }}>{title}</span>
          </Space>
        </div>
        <div className={styles.main}>{LinkAndQRCodeElem}</div>
        <div className={styles.right}>
          <Button type="primary" onClick={() => nav(`/question/edit/${id}`)}>
            编辑问卷
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StatHeader;
