import React, { FC } from "react";
import { QuestionSelectDefaultProps } from "./interface";
import { Input, Select, Typography } from "@arco-design/web-react";

const FormComponent: FC<any> = (props: any) => {
  const { title, placeholder, options } = { ...QuestionSelectDefaultProps, ...props };

  return (
    <Select
      placeholder={placeholder}
      value={props.value}
      onChange={props.onChange}
      options={options.map(opt => ({ label: opt.text, value: opt.text }))}></Select>
  );
};

export default FormComponent;
