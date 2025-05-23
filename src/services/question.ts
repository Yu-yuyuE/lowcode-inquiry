import { API_URL } from "@/constants";
import axios, { ResDataType } from "./ajax";
type SearchOption = {
  keyword: string;
  isStar: boolean;
  isDeleted: boolean;
  page: number;
  pageSize: number;
};

// 创建问卷
export async function createQuestionService(): Promise<ResDataType> {
  const url = `${API_URL}/question/create`;
  const data = (await axios.post(url)) as ResDataType;
  return data;
}

// 获取（查询）问卷列表
export async function getQuestionListService(
  opt: Partial<SearchOption> = {},
): Promise<ResDataType> {
  const url = `${API_URL}/question/list`;
  const data = (await axios.get(url, {
    params: opt,
  })) as ResDataType;
  return data;
}

// 更新多个问卷，用于删除和恢复
export async function batchUpdateQuestionService(opt: {
  [key: string]: any;
}): Promise<ResDataType> {
  const url = `${API_URL}/question/update`;
  const data = (await axios.patch(url, opt)) as ResDataType;
  return data;
}

// 更新单个问卷
export async function updateQuestionService(id, opt: { [key: string]: any }): Promise<ResDataType> {
  const url = `${API_URL}/question/update/${id}`;
  const data = (await axios.patch(url, opt)) as ResDataType;
  return data;
}

// 复制问卷
export async function duplicateQuestionService(id: string): Promise<ResDataType> {
  const url = `${API_URL}/question/duplicate/${id}`;
  const data = (await axios.post(url)) as ResDataType;
  return data;
}

// 批量彻底删除
export async function deleteQuestionsService(ids: string[]): Promise<ResDataType> {
  const url = `${API_URL}/question/delete`;
  const data = (await axios.delete(url, { data: { ids } })) as ResDataType;
  return data;
}

// 获取单个问卷信息
export async function getQuestionService(id: string): Promise<ResDataType> {
  const url = `${API_URL}/question/${id}`;
  const data = (await axios.get(url)) as ResDataType;
  return data;
}

// 提交问卷结果
export async function submitQuestion(id: string, formValue: any): Promise<ResDataType> {
  const url = `${API_URL}/question/submit/${id}`;
  const data = (await axios.post(url, { data: formValue })) as ResDataType;
  return data;
}
