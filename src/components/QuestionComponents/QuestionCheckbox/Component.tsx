import React, { FC } from "react";
import { QuestionCheckboxDefaultProps, QuestionCheckboxPropsType } from "./interface";
import { Checkbox, Space, Typography } from "@arco-design/web-react";

const { Paragraph } = Typography;

const Component: FC<QuestionCheckboxPropsType> = (props: QuestionCheckboxPropsType) => {
  const {
    title,
    isVertical,
    list = [],
    defaultChecked = [],
  } = { ...QuestionCheckboxDefaultProps, ...props };

  return (
    <div>
      <Paragraph bold>{title}</Paragraph>
      <Space direction={isVertical ? "vertical" : "horizontal"}>
        {list.map(opt => {
          const { value, text, checked } = opt;
          return (
            <Checkbox key={text} value={text} checked={defaultChecked.includes(text)}>
              {text}
            </Checkbox>
          );
        })}
      </Space>
    </div>
  );
};

export default Component;
