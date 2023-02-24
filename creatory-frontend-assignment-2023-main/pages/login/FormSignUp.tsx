"use client";
import React, { useCallback, useState } from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import styles from "./form.module.css";
import { useRouter } from "next/navigation";
import axios from "axios";

const FormSignUp = () => {
  const onFinish = (values: any) => {};
  const router = useRouter();
  const [form] = Form.useForm();
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const login = useCallback(async () => {
    const formValues = form.getFieldsValue();
    const { username, password } = formValues;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      username: username,
      password: password,
    });
    const redirect: RequestRedirect = "follow";
    // call API from java server backend, DB: mySQL Server
    const response = await axios.post(
      "http://localhost:8080/api/authenticate",
      {
        data: { username: username, password: password },
      }
    );
    if (response.status === 200) {
      localStorage.setItem("ourToken", response.data);
      router.push("/create");
    } else {
      message.error("invalid account");
    }
  }, [form, router]);
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" onClick={() => login()}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default FormSignUp;
