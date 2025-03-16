import React, { FC } from "react";
import { QuestionRadioPropsType, QuestionRadioDefaultProps } from "./interface";
import { Radio, Space, Typography } from "@arco-design/web-react";

const { Paragraph } = Typography;

const FormComponent: FC<any> = (props: any) => {
  const { title, options, defaultChecked, isVertical } = { ...QuestionRadioDefaultProps, ...props };

  return (
    <Radio.Group
      direction={isVertical ? "vertical" : "horizontal"}
      value={props.value}
      onChange={props.onChange}>
      {(options ?? []).map(opt => {
        const { text } = opt;
        return (
          <Radio key={text} value={text}>
            {text}
          </Radio>
        );
      })}
    </Radio.Group>
  );
};

export default FormComponent;
