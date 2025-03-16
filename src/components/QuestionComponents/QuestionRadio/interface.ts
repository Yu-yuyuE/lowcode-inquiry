import { LabeledValue } from "@arco-design/web-react/es/Select/interface";
import { RelationType } from "../QuestionSelect";

export type OptionType = {
  value: any;
  text: string;
};

export type QuestionRadioPropsType = {
  title?: string;
  isVertical?: boolean;
  options?: OptionType[];
  defaultChecked?: string;

  // 用于 PropComponent
  onChange?: (newProps: QuestionRadioPropsType) => void;
  disabled?: boolean;
  relations?: RelationType[];
};

export const QuestionRadioDefaultProps: QuestionRadioPropsType = {
  title: "单选标题",
  isVertical: false,
  options: [
    { value: "item1", text: "选项1" },
    { value: "item2", text: "选项2" },
    { value: "item3", text: "选项3" },
  ],
  relations: [],
};

// 统计组件的属性类型
export type QuestionRadioStatPropsType = {
  stat: Array<{ name: string; count: number }>;
};
