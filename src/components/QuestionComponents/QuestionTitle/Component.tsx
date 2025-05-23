import React, { FC } from "react";
import { QuestionTitlePropsType, QuestionTitleDefaultProps } from "./interface";
import { Typography } from "@arco-design/web-react";

const { Title } = Typography;

const QuestionTitle: FC<QuestionTitlePropsType> = (props: QuestionTitlePropsType) => {
  const { text = "", level = 1, isCenter = false } = { ...QuestionTitleDefaultProps, ...props };

  const genFontSize = (level: number) => {
    if (level === 1) return "24px";
    if (level === 2) return "20px";
    if (level === 3) return "16px";
    return "16px";
  };

  return (
    <Title
      heading={level}
      style={{
        textAlign: isCenter ? "center" : "start",
        marginBottom: "0",
        marginTop: "0",
        fontSize: genFontSize(level),
      }}>
      {text}
    </Title>
  );
};

export default QuestionTitle;
