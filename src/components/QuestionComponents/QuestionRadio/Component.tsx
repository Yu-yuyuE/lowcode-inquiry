import React, { FC } from "react";
import { QuestionRadioPropsType, QuestionRadioDefaultProps } from "./interface";
import { Radio, Space, Typography } from "@arco-design/web-react";

const { Paragraph } = Typography;

const Component: FC<QuestionRadioPropsType> = (props: QuestionRadioPropsType) => {
  const { title, options, defaultChecked, isVertical } = { ...QuestionRadioDefaultProps, ...props };

  return (
    <div>
      <Paragraph>{title}</Paragraph>
      <Radio.Group value={defaultChecked}>
        <Space direction={isVertical ? "vertical" : "horizontal"}>
          {(options ?? []).map(opt => {
            const { text } = opt;
            return (
              <Radio key={text} value={text}>
                {text}
              </Radio>
            );
          })}
        </Space>
      </Radio.Group>
    </div>
  );
};

export default Component;
