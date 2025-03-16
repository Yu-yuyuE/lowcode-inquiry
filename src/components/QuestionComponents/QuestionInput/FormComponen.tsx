import React, { FC } from "react";
import { QuestionInputPropsType, QuestionInputDefaultProps } from "./interface";
import { Input, Typography } from "@arco-design/web-react";

const FormComponent: FC<any> = (props: any) => {
  const { title, placeholder } = { ...QuestionInputDefaultProps, ...props };

  return <Input placeholder={placeholder} value={props.value} onChange={props.onChange}></Input>;
};

export default FormComponent;
