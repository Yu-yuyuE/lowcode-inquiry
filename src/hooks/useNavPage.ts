import { useLocation, useNavigate } from "react-router-dom";
import useGetUserInfo from "./useGetUserInfo";
import { useEffect } from "react";
import {
  isLoginOrRegister,
  isNoNeedUserInfo,
  LOGIN_PATHNAME,
  MANAGE_INDEX_PATHNAME,
} from "@/router";

function useNavPage(isWaitingUserData: boolean) {
  const { username } = useGetUserInfo();
  const { pathname } = useLocation();
  const nav = useNavigate();

  useEffect(() => {
    // 如果在等待userdata返回
    if (isWaitingUserData) return;
    if (username) {
      // 如果已经登录
      if (isLoginOrRegister(pathname)) {
        // 如果在登录或者注册页，跳转到管理页
        nav(MANAGE_INDEX_PATHNAME);
      }
      return;
    }
    // 如果页面需要登录信息，跳转到登录页
    if (!isNoNeedUserInfo(pathname)) {
      nav(LOGIN_PATHNAME);
    }
  }, [username, pathname, isWaitingUserData]);
}

export default useNavPage;
