import React, { FC } from "react";
import { QuestionTextareaPropsType, QuestionTextareaDefaultProps } from "./interface";
import { Input, Typography } from "@arco-design/web-react";

const { Paragraph } = Typography;
const { TextArea } = Input;

const FormComponent: FC<any> = (props: any) => {
  const { title, placeholder } = { ...QuestionTextareaDefaultProps, ...props };

  return (
    <TextArea placeholder={placeholder} value={props.value} onChange={props.onChange}></TextArea>
  );
};

export default FormComponent;
