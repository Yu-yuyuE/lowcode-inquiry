import Component from "./Component";
import PropComponent from "./PropComponent";
import { QuestionRadioDefaultProps } from "./interface";
import StatComponent from "./StatComponent";
import FormComponent from "./FormComponent";

export * from "./interface";

export default {
  title: "单选",
  type: "questionRadio",
  Component,
  PropComponent,
  StatComponent,
  defaultProps: QuestionRadioDefaultProps,
  FormComponent,
};
