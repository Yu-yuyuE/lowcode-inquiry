import React, { FC, useEffect } from "react";
import { nanoid } from "nanoid";
import { QuestionCheckboxPropsType, OptionType } from "./interface";
import { Button, Checkbox, Form, Input, Select, Space } from "@arco-design/web-react";
import { IconMinus, IconMinusCircle, IconPlus, IconPlusCircle } from "@arco-design/web-react/icon";
import RelationAction, {
  RelationActionEnum,
  RelationSymbolEnum,
} from "@/components/RelationAction";
import { useGetComponentInfo } from "@/hooks";

const PropComponent: FC<QuestionCheckboxPropsType> = (props: QuestionCheckboxPropsType) => {
  const { componentList, selectedComponent } = useGetComponentInfo();
  const {
    title,
    isVertical,
    list = [],
    onChange,
    disabled,
    defaultChecked = [],
    relations = [],
  } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ title, isVertical, list, defaultChecked, relations });
  }, [title, isVertical, list, defaultChecked, relations]);

  function handleValuesChange() {
    if (onChange == null) return;

    const newValues = form.getFields() as QuestionCheckboxPropsType;

    if (newValues.list) {
      newValues.list = newValues.list.filter(opt => !(opt.text == null));
    }

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
      onChange={handleValuesChange}>
      <Form.Item label="标题" field="title" rules={[{ required: true, message: "请输入标题" }]}>
        <Input />
      </Form.Item>
      <Form.Item label="选项列表">
        <Form.List field="list">
          {(fields, { add, remove }) => (
            <div style={{ padding: "12px", backgroundColor: "rgb(250, 250, 250)" }}>
              {/* 遍历所有的选项（可删除） */}
              {fields.map(({ key, field }, index) => {
                return (
                  <Space key={key} align="baseline">
                    {/* 当前选项 是否选中 */}
                    <Form.Item field={field + ".checked"}>
                      <Checkbox />
                    </Form.Item>
                    {/* 当前选项 输入框 */}
                    <Form.Item
                      field={field + ".text"}
                      rules={[
                        { required: true, message: "请输入选项文字" },
                        {
                          validator: (value, cb) => {
                            const { list = [] } = form.getFieldsValue();
                            let num = 0;
                            list.forEach((opt: OptionType) => {
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
                    {index > 0 && <IconMinusCircle onClick={() => remove(index)} />}
                  </Space>
                );
              })}

              {/* 添加选项 */}
              <Form.Item>
                <Button
                  type="text"
                  onClick={() => add({ text: "", checked: false })}
                  icon={<IconPlusCircle />}>
                  添加选项
                </Button>
              </Form.Item>
            </div>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item label="默认选中" field="defaultChecked">
        <Select
          value={defaultChecked}
          mode="multiple"
          options={list.map(({ text, value }) => ({
            value: text,
            label: text || "",
          }))}></Select>
      </Form.Item>
      <Form.Item label="关联项">
        <Form.List field="relations">
          {(fields, { add, remove }) => (
            <div style={{ padding: "12px", backgroundColor: "rgb(250, 250, 250)" }}>
              {(fields ?? []).map(({ key, field }, index) => {
                return (
                  <RelationAction
                    key={key}
                    index={index}
                    field={field}
                    remove={remove}
                    targetOptions={list}
                    multiple={true}
                  />
                );
              })}
              {/* 添加选项 */}
              <Form.Item noStyle>
                <Button
                  disabled={componentList.length <= 1}
                  type="text"
                  onClick={() =>
                    add({
                      targetValue: list[0]?.text ?? "",
                      action: RelationActionEnum.SHOW,
                      targetItem:
                        componentList.filter(com => com.fe_id !== selectedComponent?.fe_id)[0]
                          ?.fe_id ?? "",
                      symbol: RelationSymbolEnum.CONTAIN,
                    })
                  }
                  icon={<IconPlusCircle />}>
                  添加关联项
                </Button>
              </Form.Item>
            </div>
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
