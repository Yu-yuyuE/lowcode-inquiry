import Component from "./Component";
import FormComponent from "./FormComponen";
import { QuestionSelectDefaultProps } from "./interface";
import PropComponent from "./PropComponent";

export * from "./interface";

// Select 组件的配置
export default {
  title: "下拉选择框",
  type: "questionSelect", // 要和后端统一好
  Component, // 画布显示的组件
  PropComponent, // 修改属性
  defaultProps: QuestionSelectDefaultProps,
  FormComponent,
};
