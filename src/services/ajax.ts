import axios from "axios";
import router, { LOGIN_PATHNAME } from "@/router";
import { getToken, removeCookie, removeToken, setToken, USER_TOKEN_KEY } from "@/utils/user-token";
import { Message } from "@arco-design/web-react";

const instance = axios.create({
  timeout: 30 * 1000,
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
instance.interceptors.response.use(
  res => {
    const resData = (res.data || {}) as ResType;
    const { error, statusCode, message, data } = resData;

    if (res.headers.token) {
      setToken(res.headers.token);
    }

    if (error) {
      // 错误提示
      if (message) {
        Message.error(message);
      }

      throw new Error(message);
    }

    return data as any;
  },
  err => {
    const { error, statusCode, message } = err.response.data as ResType;
    if (statusCode === 401) {
      removeToken(); // 清除无效token
      removeCookie(USER_TOKEN_KEY);
      router.navigate(LOGIN_PATHNAME);
      throw new Error(message);
    }

    if (err) {
      // 错误提示
      if (message) {
        Message.error(message);
      }

      throw new Error(message);
    }
  },
);

export default instance;

export type ResType = {
  statusCode: number;
  data?: ResDataType;
  message?: string;
  error?: string;
};

export type ResDataType = {
  [key: string]: any;
};
