import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetPageInfo } from "@/hooks";
import { PageInfoType, resetPageInfo } from "@/store/pageInfoReducer";
import { Button, Form, Input } from "@arco-design/web-react";

const { TextArea } = Input;

const PageSetting: FC = () => {
  const pageInfo = useGetPageInfo();
  // const { title, desc, js, css } = pageInfo
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  // 实时更新表单内容
  useEffect(() => {
    form.setFieldsValue(pageInfo);
  }, [pageInfo]);

  function handleValuesChange(values: any) {
    dispatch(resetPageInfo(form.getFieldsValue() as PageInfoType));
  }

  return (
    <Form layout="vertical" initialValues={pageInfo} onChange={handleValuesChange} form={form}>
      <Form.Item label="问卷标题" field="title" rules={[{ required: true, message: "请输入标题" }]}>
        <Input placeholder="请输入标题" />
      </Form.Item>
      <Form.Item label="问卷描述" field="desc">
        <TextArea placeholder="问卷描述..." />
      </Form.Item>
      <Form.Item label="样式代码" field="css">
        <TextArea placeholder="输入 CSS 样式代码..." />
      </Form.Item>
      <Form.Item label="脚本代码" field="js">
        <TextArea placeholder="输入 JS 脚本代码..." />
      </Form.Item>
    </Form>
  );
};

export default PageSetting;
