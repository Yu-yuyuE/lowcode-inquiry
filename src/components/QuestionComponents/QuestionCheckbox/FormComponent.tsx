import React, { FC } from "react";
import { QuestionCheckboxDefaultProps, QuestionCheckboxPropsType } from "./interface";
import { Checkbox, Space, Typography } from "@arco-design/web-react";

const Component: FC<any> = (props: any) => {
  const {
    title,
    isVertical,
    list = [],
    defaultChecked = [],
  } = { ...QuestionCheckboxDefaultProps, ...props };

  return (
    <Checkbox.Group
      direction={isVertical ? "vertical" : "horizontal"}
      value={props.value}
      onChange={props.onChange}>
      {list.map(opt => {
        const { value, text, checked } = opt;
        return (
          <Checkbox key={text} value={text}>
            {text}
          </Checkbox>
        );
      })}
    </Checkbox.Group>
  );
};

export default Component;
