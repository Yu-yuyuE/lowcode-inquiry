import axios from "axios";
import { getToken } from "@/utils/user-token";
import { Message } from "@arco-design/web-react";

const instance = axios.create({
  timeout: 10 * 1000,
});

// request 拦截：每次请求都带上 token
instance.interceptors.request.use(
  config => {
    config.headers["Authorization"] = `Bearer ${getToken()}`; // JWT 的固定格式
    return config;
  },
  error => Promise.reject(error),
);

// response 拦截：统一处理 error 和 msg
instance.interceptors.response.use(res => {
  const resData = (res.data || {}) as ResType;
  const { errno, data, msg } = resData;

  if (errno) {
    // 错误提示
    if (msg) {
      Message.error(msg);
    }

    throw new Error(msg);
  }

  return data as any;
});

export default instance;

export type ResType = {
  errno: number;
  data?: ResDataType;
  msg?: string;
};

export type ResDataType = {
  [key: string]: any;
};
