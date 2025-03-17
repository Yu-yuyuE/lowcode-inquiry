import React, { FunctionComponent, useEffect, useState } from "react";
import styles from "./index.module.scss";
import { useGetComponentInfo, useGetPageInfo, useLoadQuestionData } from "@/hooks";
import { useDispatch } from "react-redux";
import { Button, Form, Message, Space, Spin } from "@arco-design/web-react";
import { IconCheckCircleFill, IconFile, IconThumbUp } from "@arco-design/web-react/icon";
import { useRequest, useTitle } from "ahooks";
import { ComponentInfoType } from "@/store/componentsReducer";
import { getComponentConfByType } from "@/components/QuestionComponents";
import { RelationActionEnum, RelationSymbolEnum } from "@/components/RelationAction";
import { useParams } from "react-router-dom";
import { submitQuestion } from "@/services/question";

function genComponent(componentInfo: ComponentInfoType) {
  const { type, props, title, fe_id } = componentInfo; // 每个组件的信息，是从 redux store 获取的（服务端获取）
  const componentConf = getComponentConfByType(type);
  if (componentConf == null) return null;

  const { FormComponent, Component } = componentConf;

  return FormComponent ? (
    <Form.Item
      label={title}
      key={fe_id}
      field={fe_id}
      layout="vertical"
      className={styles["form-item-container"]}
      required={true}
      rules={[{ required: true, message: props?.placeholder ?? "请填写表单" }]}>
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
  const { id = "" } = useParams();
  const { componentList } = useGetComponentInfo();
  const [form] = Form.useForm();
  const [hideFeIds, setHideFeIds] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const { run, loading } = useRequest(data => submitQuestion(id, data), {
    manual: true,
    onSuccess(result) {
      Message.success("提交成功，谢谢参与！");
      setIsSubmitted(true);
    },
  });

  const onClick = async () => {
    try {
      await form.validate();
      const value = form.getFieldsValue();
      run(value);
    } catch (e) {
      return;
    }
  };

  const handleChange = () => {
    setHideFeIds(getHideIds());
  };

  useEffect(() => {
    setHideFeIds(getHideIds());
  }, [componentList]);

  const getHideIds = () => {
    const hideIds: string[] = [];
    const formValue = form.getFieldsValue();
    componentList.forEach(component => {
      if (!component.props?.relations?.length) return;
      component.props.relations.forEach(relation => {
        if (relation.symbol === RelationSymbolEnum.EQUAL) {
          if (
            (relation.action === RelationActionEnum.SHOW &&
              formValue[component.fe_id] !== relation.targetValue) ||
            (relation.action === RelationActionEnum.HIDE &&
              formValue[component.fe_id] === relation.targetValue)
          ) {
            hideIds.push(relation.targetItem);
          }
        } else if (relation.symbol === RelationSymbolEnum.NOT_EQUAL) {
          if (
            (relation.action === RelationActionEnum.SHOW &&
              formValue[component.fe_id] === relation.targetValue) ||
            (relation.action === RelationActionEnum.HIDE &&
              formValue[component.fe_id] !== relation.targetValue)
          ) {
            hideIds.push(relation.targetItem);
          }
        } else if (relation.symbol === RelationSymbolEnum.CONTAIN) {
          if (
            (relation.action === RelationActionEnum.SHOW &&
              !formValue[component.fe_id]?.includes(relation.targetValue)) ||
            (relation.action === RelationActionEnum.HIDE &&
              formValue[component.fe_id]?.includes(relation.targetValue))
          ) {
            hideIds.push(relation.targetItem);
          }
        } else if (relation.symbol === RelationSymbolEnum.NOT_CONTAIN) {
          if (
            (relation.action === RelationActionEnum.SHOW &&
              formValue[component.fe_id]?.includes(relation.targetValue)) ||
            (relation.action === RelationActionEnum.HIDE &&
              !formValue[component.fe_id]?.includes(relation.targetValue))
          ) {
            hideIds.push(relation.targetItem);
          }
        }
      });
    });

    return hideIds;
  };

  return isSubmitted ? (
    <div className={styles["submitted-container"]}>
      <div className={styles["icon"]}>
        <IconCheckCircleFill />
      </div>
      提交成功，谢谢参与！
    </div>
  ) : (
    <div className={styles.container}>
      <Form form={form} onChange={handleChange} initialValues={{}}>
        {componentList?.map(item => {
          return hideFeIds.includes(item.fe_id) ? null : genComponent(item);
        })}
      </Form>
      <Button
        className={styles["footer-btn"]}
        type="primary"
        long
        onClick={onClick}
        disabled={loading}>
        提交
      </Button>
    </div>
  );
};

export default PublishCanvas;
