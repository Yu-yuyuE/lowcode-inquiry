import React, { FC } from "react";
import { QuestionCheckboxDefaultProps, QuestionCheckboxPropsType } from "./interface";
import { Checkbox, Space, Typography } from "@arco-design/web-react";

const { Paragraph } = Typography;

const Component: FC<QuestionCheckboxPropsType> = (props: QuestionCheckboxPropsType) => {
  const { title, isVertical, list = [] } = { ...QuestionCheckboxDefaultProps, ...props };

  return (
    <div>
      <Paragraph bold>{title}</Paragraph>
      <Space direction={isVertical ? "vertical" : "horizontal"}>
        {list.map(opt => {
          const { value, text, checked } = opt;
          return (
            <Checkbox key={value} value={value} checked={checked}>
              {text}
            </Checkbox>
          );
        })}
      </Space>
    </div>
  );
};

export default Component;
