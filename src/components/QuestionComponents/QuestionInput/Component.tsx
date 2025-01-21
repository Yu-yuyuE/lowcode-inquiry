import React, { FC } from "react";
import { QuestionInputPropsType, QuestionInputDefaultProps } from "./interface";
import { Input, Typography } from "@arco-design/web-react";

const { Paragraph } = Typography;

const QuestionInput: FC<QuestionInputPropsType> = (props: QuestionInputPropsType) => {
  const { title, placeholder } = { ...QuestionInputDefaultProps, ...props };

  return (
    <div>
      <Paragraph bold>{title}</Paragraph>
      <div>
        <Input placeholder={placeholder}></Input>
      </div>
    </div>
  );
};

export default QuestionInput;
