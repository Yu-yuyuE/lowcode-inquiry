import { OptionType } from "../QuestionRadio";

export type QuestionSelectPropsType = {
  title?: string;
  placeholder?: string;

  onChange?: (newProps: QuestionSelectPropsType) => void;
  disabled?: boolean;
  options?: OptionType[];
  defaultChecked?: string;
};

export const QuestionSelectDefaultProps: QuestionSelectPropsType = {
  title: "下拉选择框标题",
  placeholder: "请选择",
  options: [
    { value: "item1", text: "选项1" },
    { value: "item2", text: "选项2" },
    { value: "item3", text: "选项3" },
  ],
};

// 统计组件的属性类型
export type QuestionSelectStatPropsType = {
  stat: Array<{ name: string; count: number }>;
};
