import React, { FC } from "react";
import { nanoid } from "nanoid";
import { QuestionCheckboxPropsType, OptionType } from "./interface";
import { Button, Checkbox, Form, Input, Space } from "@arco-design/web-react";
import { IconMinus, IconPlus } from "@arco-design/web-react/icon";

const PropComponent: FC<QuestionCheckboxPropsType> = (props: QuestionCheckboxPropsType) => {
  const { title, isVertical, list = [], onChange, disabled } = props;
  const [form] = Form.useForm();

  function handleValuesChange() {
    if (onChange == null) return;

    const newValues = form.getFieldsValue() as QuestionCheckboxPropsType;

    if (newValues.list) {
      newValues.list = newValues.list.filter(opt => !(opt.text == null));
    }

    const { list = [] } = newValues;
    list.forEach(opt => {
      if (opt.value) return;
      opt.value = nanoid(5);
    });

    onChange(newValues);
  }

  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={{ title, isVertical, list }}
      disabled={disabled}
      validateMessages={{
        required: (_, { label }) => `请输入${label}`,
        string: { match: "只能是字母数字下划线,字符长度在 5-20 之间" },
      }}
      onValuesChange={handleValuesChange}>
      <Form.Item label="标题" field="title" rules={[{ required: true, message: "请输入标题" }]}>
        <Input />
      </Form.Item>
      <Form.Item label="选项">
        <Form.List field="list">
          {(fields, { add, remove }) => (
            <>
              {/* 遍历所有的选项（可删除） */}
              {fields.map(({ key, field }, index) => {
                return (
                  <Space key={key} align="baseline">
                    {/* 当前选项 是否选中 */}
                    <Form.Item field={`checked_${field}`}>
                      <Checkbox />
                    </Form.Item>
                    {/* 当前选项 输入框 */}
                    <Form.Item
                      field={`text_${field}`}
                      rules={[
                        { required: true, message: "请输入选项文字" },
                        {
                          validator: (value, cb) => {
                            const { list = [] } = form.getFieldsValue();
                            let num = 0;
                            list.forEach((opt: OptionType) => {
                              if (opt[`text_${field}`] === value) num++; // 记录 text 相同的个数，预期只有 1 个（自己）
                            });
                            if (num === 1) return;
                            return cb("和其他选项重复了");
                          },
                        },
                      ]}>
                      <Input placeholder="输入选项文字..." />
                    </Form.Item>

                    {/* 当前选项 删除按钮 */}
                    {index > 0 && <IconMinus onClick={() => remove(index)} />}
                  </Space>
                );
              })}

              {/* 添加选项 */}
              <Form.Item>
                <Button
                  type="text"
                  onClick={() => add({ text: "", value: "", checked: false })}
                  icon={<IconPlus />}>
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item field="isVertical">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
