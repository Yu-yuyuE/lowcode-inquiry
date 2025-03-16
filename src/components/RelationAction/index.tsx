import React, { FunctionComponent, useEffect, useState } from "react";
import { Form, Select, Space } from "@arco-design/web-react";
import { useGetComponentInfo } from "@/hooks";
import { IconMinusCircle } from "@arco-design/web-react/icon";

interface RelationActionProps {
  key: number;
  index: number;
  field: string;
  targetOptions: any[];
  remove: (index: number) => void;
  multiple: boolean;
}

export enum RelationActionEnum {
  SHOW = "show",
  HIDE = "hide",
}
export enum RelationSymbolEnum {
  EQUAL = "equal",
  NOT_EQUAL = "not_equal",
  CONTAIN = "contain",
  NOT_CONTAIN = "not_contain",
}
export const actionOptions = [
  {
    label: "显示",
    value: RelationActionEnum.SHOW,
  },
  {
    label: "隐藏",
    value: RelationActionEnum.HIDE,
  },
];
export const ratioSymbolOptions = [
  {
    label: "等于",
    value: RelationSymbolEnum.EQUAL,
  },
  {
    label: "不等于",
    value: RelationSymbolEnum.NOT_EQUAL,
  },
];
export const checkboxSymbolOptions = [
  {
    label: "包含",
    value: RelationSymbolEnum.CONTAIN,
  },
  {
    label: "不包含",
    value: RelationSymbolEnum.NOT_CONTAIN,
  },
];

const RelationAction: FunctionComponent<RelationActionProps> = ({
  index,
  field,
  targetOptions,
  remove,
  multiple,
}) => {
  const { componentList, selectedComponent } = useGetComponentInfo();
  return (
    <Form.Item noStyle>
      <Space align="baseline" wrap>
        当选中值
        <Form.Item
          field={field + ".symbol"}
          rules={[{ required: true, message: "请选择关系符" }]}
          initialValue={RelationSymbolEnum.EQUAL}
          noStyle>
          <Select
            getPopupContainer={node => node.parentElement || document.body}
            triggerProps={{
              autoAlignPopupWidth: false,
              position: "bottom",
            }}
            placeholder="关系符"
            options={multiple ? checkboxSymbolOptions : ratioSymbolOptions}></Select>
        </Form.Item>
        <Form.Item
          field={field + ".targetValue"}
          rules={[{ required: true, message: "选择命中值时，触发关联动作" }]}
          initialValue={targetOptions[0]?.text}
          noStyle>
          <Select
            getPopupContainer={node => node.parentElement || document.body}
            triggerProps={{
              autoAlignPopupWidth: false,
              position: "bottom",
            }}
            placeholder="命中值"
            options={targetOptions.map(({ text, value }) => ({
              value: text,
              label: text || "",
            }))}></Select>
        </Form.Item>
        时，表单项
        <Form.Item
          field={field + ".targetItem"}
          rules={[{ required: true, message: "请选择关联表单项" }]}
          initialValue={componentList[0]?.fe_id}
          noStyle>
          <Select
            getPopupContainer={node => node.parentElement || document.body}
            triggerProps={{
              autoAlignPopupWidth: false,
              position: "bottom",
            }}
            placeholder="关联表单项"
            options={componentList
              .filter(com => com.fe_id !== selectedComponent?.fe_id)
              .map(({ props: { title, text }, fe_id }) => ({
                value: fe_id,
                label: title || text || "",
              }))}></Select>
        </Form.Item>
        会
        <Form.Item
          field={field + ".action"}
          rules={[{ required: true, message: "请选择关联动作" }]}
          initialValue={RelationActionEnum.SHOW}
          noStyle>
          <Select
            getPopupContainer={node => node.parentElement || document.body}
            triggerProps={{
              autoAlignPopupWidth: false,
              position: "bottom",
            }}
            placeholder="关联动作"
            options={actionOptions}></Select>
        </Form.Item>
        {/* 当前选项 删除按钮 */}
        <IconMinusCircle onClick={() => remove(index)} />
      </Space>
    </Form.Item>
  );
};

export default RelationAction;
