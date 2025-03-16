import React, { FunctionComponent, useEffect, useState } from "react";
import { Select } from "@arco-design/web-react";

interface RelationActionProps {
  value: any;
  onChange: () => void;
}

enum RelationActionEnum {
  SHOW = "show",
  HIDE = "hide",
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

const RelationAction: FunctionComponent<RelationActionProps> = (...props) => {
  return <Select placeholder="请选择" options={actionOptions} {...props}></Select>;
};

export default RelationAction;
