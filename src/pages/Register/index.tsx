import React, { FunctionComponent, useState } from "react";
import styles from "./index.module.scss";
import { Button, Checkbox, Form, Input, Message, Space } from "@arco-design/web-react";
import { IconUserAdd } from "@arco-design/web-react/icon";
import { useRequest } from "ahooks";
import { captchaService, registerService } from "@/services/userinfo";
import { useNavigate } from "react-router-dom";
import { LOGIN_PATHNAME } from "@/router";
import { EMAIL_ADDRESS_REG } from "@/constants";

const Item = Form.Item;

interface RegisterProps {}

const Register: FunctionComponent<RegisterProps> = () => {
  const [isWaitingCaptcha, setWaitingCaptcha] = useState(false);
  const [waitingTime, setWaitingTime] = useState(60);
  const nav = useNavigate();
  const [form] = Form.useForm();

  const { run: login } = useRequest(
    async () => {
      const { username, password, nickname, email, captcha } = form.getFieldsValue();
      return await registerService({ username, password, nickname, email, captcha });
    },
    {
      manual: true,
      onSuccess() {
        Message.success("注册成功");
        nav(LOGIN_PATHNAME);
      },
    },
  );

  const { run: getCaptcha } = useRequest(
    async () => {
      const { email } = form.getFieldsValue();
      return await captchaService({ email });
    },
    {
      manual: true,
      onSuccess() {
        Message.success("验证码发送成功");
      },
    },
  );

  const onSubmit = () => {
    login();
  };

  const onCaptcha = async () => {
    try {
      await form.validate(["email"]);
    } catch (error) {
      return;
    }
    setWaitingCaptcha(true);
    getCaptcha();
    const interval = setInterval(() => {
      setWaitingTime(time => {
        if (time === 0) {
          setWaitingCaptcha(false);
          clearInterval(interval);
          return 60;
        }
        return time - 1;
      });
    }, 1000);
  };

  return (
    <div className={styles.container}>
      <div>
        <Space>
          <h2>
            <IconUserAdd />
          </h2>
          <h2>用户注册</h2>
        </Space>
      </div>
      <div className={styles.registerForm}>
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
            field="nickname"
            label="昵称"
            rules={[
              {
                match: /^[a-zA-Z0-9一-龟#$%_-]{1,32}$/,
                message: "昵称只能是字母、数字、中文汉字或者 #、$、%、_、- 这些字符",
              },
            ]}>
            <Input placeholder="请输入昵称" />
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
          <Item
            field="confirmPassword"
            label="确认密码"
            rules={[
              {
                required: true,
                validator: (v, cb) => {
                  if (!v) {
                    return cb("请再次输入密码");
                  } else if (form.getFieldValue("password") !== v) {
                    return cb("必须与密码一致");
                  }
                  cb(null);
                },
              },
            ]}>
            <Input.Password placeholder="请再次输入密码" />
          </Item>
          <Item
            field="email"
            label="邮箱"
            rules={[
              {
                required: true,
                match: EMAIL_ADDRESS_REG,
                message: "邮箱地址不合法",
              },
            ]}>
            <Input placeholder="请输入邮箱地址" />
          </Item>
          <Item
            field="captcha"
            label="验证码"
            rules={[
              {
                required: true,
              },
            ]}>
            <Input
              className="captcha-input"
              placeholder="请输入验证码"
              style={{ flex: 1, marginRight: 8 }}
              addAfter={
                <Button type="text" disabled={isWaitingCaptcha} onClick={onCaptcha}>
                  {isWaitingCaptcha ? `${waitingTime}秒后重新获取` : "获取验证码"}
                </Button>
              }
            />
          </Item>
          {/* <Item field="remember" wrapperCol={{ offset: 5 }}>
            <Checkbox>记住我</Checkbox>
          </Item> */}
          <Item wrapperCol={{ offset: 5 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                注册
              </Button>
              <Button type="text" onClick={() => nav(LOGIN_PATHNAME)}>
                已有账户，登录
              </Button>
            </Space>
          </Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
