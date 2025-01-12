import React, { FunctionComponent } from "react";
import styles from "./index.module.scss";
import { Button, Checkbox, Form, Input, Message, Space } from "@arco-design/web-react";
import { IconUserAdd } from "@arco-design/web-react/icon";
import { useRequest } from "ahooks";
import { registerService } from "@/services/userinfo";
import { useNavigate } from "react-router-dom";
import { LOGIN_PATHNAME } from "@/router";

const Item = Form.Item;

interface RegisterProps {}

const Register: FunctionComponent<RegisterProps> = () => {
  const nav = useNavigate();
  const [form] = Form.useForm();

  const { run } = useRequest(
    async () => {
      const { username, password } = form.getFieldsValue();
      return await registerService(username, password);
    },
    {
      manual: true,
      onSuccess() {
        Message.success("注册成功");
        nav(LOGIN_PATHNAME);
      },
    },
  );

  const onSubmit = () => {
    run();
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
            string: { match: "只能是字母数字下划线,字符长度在 5-20 之间" },
          }}
          onSubmit={onSubmit}>
          <Item field="username" label="用户名" rules={[{ required: true, match: /^\w{5,20}$/ }]}>
            <Input placeholder="请输入用户名" />
          </Item>
          <Item field="password" label="密码" rules={[{ required: true }]}>
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
