import { useGetUserInfo } from "@/hooks";
import { LOGIN_PATHNAME } from "@/router";
import { logoutReducer } from "@/store/userReducer";
import { removeToken } from "@/utils/user-token";
import { Button, Link, Message, Space } from "@arco-design/web-react";
import { IconUser } from "@arco-design/web-react/icon";
import React, { FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

interface UserProps {}

const User: FunctionComponent<UserProps> = () => {
  const nav = useNavigate();
  const { username, nickname } = useGetUserInfo(); // 从 redux 中获取用户信息
  const dispatch = useDispatch();

  function logout() {
    dispatch(logoutReducer()); // 清空了 user 数据
    removeToken(); // 清除 token 的存储
    Message.success("退出成功");
    nav(LOGIN_PATHNAME);
  }

  const UserInfo = (
    <Space style={{ color: "#f7f7f7" }}>
      <IconUser />
      {nickname}
      <Link style={{ color: "#f7f7f7" }} onClick={logout}>
        退出
      </Link>
    </Space>
  );

  const Login = (
    <Link style={{ color: "#f7f7f7" }} href={LOGIN_PATHNAME}>
      登录
    </Link>
  );

  return <div>{username ? UserInfo : Login}</div>;
};

export default User;
