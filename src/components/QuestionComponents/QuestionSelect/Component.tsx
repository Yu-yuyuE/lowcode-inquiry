import React, { FC } from "react";
import { Input, Select, Typography } from "@arco-design/web-react";
import { QuestionSelectDefaultProps, QuestionSelectPropsType } from "./interface";

const { Paragraph } = Typography;

const QuestionSelect: FC<QuestionSelectPropsType> = (props: QuestionSelectPropsType) => {
  const { title, placeholder, defaultChecked } = { ...QuestionSelectDefaultProps, ...props };

  return (
    <div>
      <Paragraph bold>{title}</Paragraph>
      <div>
        <Select placeholder={placeholder} value={defaultChecked}></Select>
      </div>
    </div>
  );
};

export default QuestionSelect;
