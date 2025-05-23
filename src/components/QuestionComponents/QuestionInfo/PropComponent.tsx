import React, { FC, useEffect } from "react";
import { QuestionInfoPropsType } from "./interface";
import { Form, Input } from "@arco-design/web-react";

const { TextArea } = Input;

const PropComponent: FC<QuestionInfoPropsType> = (props: QuestionInfoPropsType) => {
  const { title, desc, onChange, disabled } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ title, desc });
  }, [title, desc]);

  function handleValuesChange() {
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  }

  return (
    <Form
      layout="vertical"
      initialValues={{ title, desc }}
      onChange={handleValuesChange}
      disabled={disabled}
      form={form}>
      <Form.Item label="标题" field="title" rules={[{ required: true, message: "请输入问卷标题" }]}>
        <Input />
      </Form.Item>
      <Form.Item label="描述" field="desc">
        <TextArea />
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
