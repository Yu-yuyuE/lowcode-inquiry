import Component from "./Component";
import PropComponent from "./PropComponent";
import { QuestionCheckboxDefaultProps } from "./interface";
import StatComponent from "./StatComponent";
import FormComponent from "./FormComponent";

export * from "./interface";

export default {
  title: "多选",
  type: "questionCheckbox", // 要和后端统一好
  Component,
  PropComponent,
  StatComponent,
  defaultProps: QuestionCheckboxDefaultProps,
  FormComponent,
};
