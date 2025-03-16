import React, { FunctionComponent } from "react";
import styles from "./index.module.scss";
import { useGetComponentInfo, useGetPageInfo, useLoadQuestionData } from "@/hooks";
import { useDispatch } from "react-redux";
import { Button, Form, Space, Spin } from "@arco-design/web-react";
import { IconFile } from "@arco-design/web-react/icon";
import { useTitle } from "ahooks";
import { ComponentInfoType } from "@/store/componentsReducer";
import { getComponentConfByType } from "@/components/QuestionComponents";

function genComponent(componentInfo: ComponentInfoType) {
  const { type, props, title, fe_id } = componentInfo; // 每个组件的信息，是从 redux store 获取的（服务端获取）
  const componentConf = getComponentConfByType(type);
  if (componentConf == null) return null;

  const { FormComponent, Component } = componentConf;

  console.log(title, fe_id);

  return FormComponent ? (
    <Form.Item
      label={title}
      key={fe_id}
      field={fe_id}
      layout="vertical"
      className={styles["form-item-container"]}>
      <FormComponent {...props} />
    </Form.Item>
  ) : (
    <div key={fe_id} className={styles["component-wrapper"]}>
      <Component {...props} />
    </div>
  );
}

interface PublishCanvasProps {}

const PublishCanvas: FunctionComponent<PublishCanvasProps> = () => {
  const { componentList } = useGetComponentInfo();
  const [form] = Form.useForm();

  const onClick = () => {
    console.log("click");
    const value = form.getFieldsValue();
    console.log(value);
  };

  return (
    <div className={styles.container}>
      <Form form={form} initialValues={{}}>
        {componentList?.map(item => {
          return genComponent(item);
        })}
      </Form>
      <Button className={styles["footer-btn"]} type="primary" long onClick={onClick}>
        提交
      </Button>
    </div>
  );
};

export default PublishCanvas;
