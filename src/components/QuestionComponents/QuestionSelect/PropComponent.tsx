import React, { FC, useEffect } from "react";
import { QuestionSelectPropsType } from "./interface";
import { Button, Form, Input, Space } from "@arco-design/web-react";
import { IconMinusCircle, IconPlusCircle } from "@arco-design/web-react/icon";
import { OptionType } from "../QuestionRadio";

const PropComponent: FC<QuestionSelectPropsType> = (props: QuestionSelectPropsType) => {
  const { title, placeholder, onChange, disabled, options = [], defaultChecked } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ title, placeholder, options, defaultChecked });
  }, [title, placeholder, options, defaultChecked]);

  function handleValuesChange() {
    if (onChange == null) return;
    // 触发 onChange 函数
    const newValues = form.getFieldsValue() as QuestionSelectPropsType;

    if (newValues.options) {
      // 需要清除 text undefined 的选项
      newValues.options = newValues.options.filter(opt => !(opt.text == null));
    }

    onChange(newValues);
  }

  return (
    <Form
      layout="vertical"
      initialValues={{ title, placeholder }}
      form={form}
      onValuesChange={handleValuesChange}
      disabled={disabled}>
      <Form.Item label="标题" field="title" rules={[{ required: true, message: "请输入标题" }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Placeholder" field="placeholder">
        <Input />
      </Form.Item>
      <Form.Item label="选项列表">
        <Form.List field="options">
          {(fields, { add, remove }) => (
            <>
              {/* 遍历所有的选项（可删除） */}
              {fields.map(({ key, field }, index) => {
                return (
                  <Form.Item key={key} noStyle>
                    <Space align="baseline">
                      {/* 当前选项 输入框 */}
                      <Form.Item
                        field={field + ".text"}
                        rules={[
                          { required: true, message: "请输入选项标题" },
                          {
                            validator: (value, cb) => {
                              const { options = [] } = form.getFieldsValue();
                              let num = 0;
                              options.forEach((opt: OptionType) => {
                                if (opt.text === value) num++; // 记录 text 相同的个数，预期只有 1 个（自己）
                              });
                              if (num === 1) return;
                              return cb("和其他选项重复了");
                            },
                          },
                        ]}>
                        <Input placeholder="输入选项文字..." />
                      </Form.Item>

                      {/* 当前选项 删除按钮 */}
                      {index > 1 && <IconMinusCircle onClick={() => remove(index)} />}
                    </Space>
                  </Form.Item>
                );
              })}

              {/* 添加选项 */}
              <Form.Item>
                <Button type="text" onClick={() => add({ text: "" })} icon={<IconPlusCircle />}>
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
