import React, { FunctionComponent, useEffect } from "react";
import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input, Message, Space } from "@arco-design/web-react";
import Title from "@arco-design/web-react/es/Typography/title";
import { IconUserAdd } from "@arco-design/web-react/icon";
import { loginService } from "@/services/userinfo";
import {
  deleteUserFromStorage,
  getUserInfoFromStorage,
  rememberUser,
  setCookie,
  setToken,
  USER_TOKEN_KEY,
} from "@/utils/user-token";
import { useRequest } from "ahooks";
import { MANAGE_INDEX_PATHNAME, REGISTER_PATHNAME } from "@/router";
import { useDispatch } from "react-redux";
import { loginReducer } from "@/store/userReducer";

const { Item } = Form;

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
  const nav = useNavigate();
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    const { username, password } = getUserInfoFromStorage();
    form.setFieldsValue({ username, password });
  }, []);

  const { run } = useRequest(
    async (username, password) => {
      const data = await loginService(username, password);
      return data;
    },
    {
      manual: true,
      onSuccess(result) {
        const {
          token = "",
          userInfo: { username, nickname },
        } = result;

        setToken(token); // 存储 token
        setCookie(USER_TOKEN_KEY, token);
        dispatch(loginReducer({ username, nickname }));
        Message.success("登录成功");
        nav(MANAGE_INDEX_PATHNAME); // 导航到“我的问卷”
      },
    },
  );

  const onSubmit = async values => {
    const { username, password, remember } = values || {};

    if (remember) {
      rememberUser(username, password);
    } else {
      deleteUserFromStorage();
    }

    run(username, password); // 执行 ajax
  };

  return (
    <div className={styles.container}>
      <div>
        <Space>
          <h2>
            <IconUserAdd />
          </h2>
          <h2>用户登录</h2>
        </Space>
      </div>
      <div className={styles.loginForm}>
        <Form
          form={form}
          validateMessages={{
            required: (_, { label }) => `请输入${label}`,
          }}
          onSubmit={onSubmit}>
          <Item
            field="username"
            label="用户名"
            rules={[
              {
                required: true,
                match: /^[a-zA-Z0-9#$%_-]{4,32}$/,
                message: "用户名只能是字母、数字或者 #、$、%、_、- 这些字符",
              },
            ]}>
            <Input placeholder="请输入用户名" />
          </Item>
          <Item
            field="password"
            label="密码"
            rules={[
              {
                required: true,
                match: /^[a-zA-Z0-9#$%_-]{6,32}$/,
                message: "密码只能是字母、数字或者 #、$、%、_、- 这些字符，长度6-32位",
              },
            ]}>
            <Input.Password placeholder="请输入密码" />
          </Item>
          <Item field="remember" wrapperCol={{ offset: 5 }}>
            <Checkbox>记住我</Checkbox>
          </Item>
          <Item wrapperCol={{ offset: 5 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
              <Button type="primary" onClick={() => nav(REGISTER_PATHNAME)}>
                注册
              </Button>
            </Space>
          </Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
