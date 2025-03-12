import { API_URL } from "@/constants";
import instance, { ResDataType } from "./ajax";

export type UserInfoType = {
  username: string;
  nickname?: string;
  password: string;
  email: string;
  captcha: string;
};

// 获取用户信息，通过cookie中的token确定身份
export async function getUserInfoService(): Promise<ResDataType> {
  const url = `${API_URL}/user/info`;
  const data = (await instance.get(url)) as ResDataType;
  return data;
}

// 注册用户
export async function registerService(userInfo: UserInfoType): Promise<ResDataType> {
  const url = `${API_URL}/user/register`;
  const body = { ...userInfo, nickname: userInfo.nickname || userInfo.username };
  const data = (await instance.post(url, body)) as ResDataType;
  return data;
}

// 登录
export async function loginService(username: string, password: string): Promise<ResDataType> {
  const url = `${API_URL}/user/login`;
  const body = { username, password };
  const data = (await instance.post(url, body)) as ResDataType;
  return data;
}

// 获取验证码
export async function captchaService(params): Promise<ResDataType> {
  const url = `${API_URL}/user/register-captcha`;
  const data = (await instance.get(url, { params })) as ResDataType;
  return data;
}
