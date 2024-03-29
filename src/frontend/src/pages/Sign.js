import React, { useEffect } from "react";
import {
  Input,
  Button,
  Row,
  Col,
  Form,
  Tabs,
  notification,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import * as Service from "../../src/core/Service";

import AppLayout from "../components/AppLayout";


const { TabPane } = Tabs;

const Sign = () => {
  const app = useSelector((state) => state.app);
  const dispatch = useDispatch();

  return (
    <AppLayout>
      <Row justify="center" style={{ height: "65vh", marginTop: 100 }}>
        <Col span={6}>
          <Tabs
            centered
            size="large"
            tabBarStyle={{ color: "#fff", fontWeight: "bold" }}
          >
            <TabPane tab="Login" key="1">
              <Login />
            </TabPane>
            <TabPane tab="Register" key="2">
              <Register />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </AppLayout>
  );
};

const Login = () => {
  const [form] = Form.useForm();

	useEffect(() => {
		onFinish()
	}, [])

  const onFinish = async (formData) => {
    console.log(formData);
    let result = await Service.call("get", "/api/user");

		console.log('result', result)
    if (result.status < 1) {
      return notification.warning({ message: result.errorMessage });
    }
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Row justify="center" style={{ padding: "20px 0" }}>
        <Col>
          <Row gutter={[0, 40]}>
            <Col span={24}>
              <Form.Item
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!",
                  },
                ]}
              >
                <Input placeholder="E-mail*" className="custom-input" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="password">
                <Input.Password
                  placeholder="Password*"
                  className="custom-input"
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Button
								htmlType="submit"
                size="large"
                className="custom-button"
                style={{ width: "100%" }}
              >
                Sign In
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};

const Register = () => {
  const [form] = Form.useForm();

  const onFinish = async (formData) => {
    console.log(formData);
    let result = await Service.call("post", "/api/user", formData);
    if (result.status < 1) {
      return notification.warning({ message: result.errorMessage });
    }

    localStorage.setItem("keystore", JSON.stringify(result));
  };

  return (
    <Form form={form} onFinish={onFinish} style={{ marginBottom: 80 }}>
      <Row justify="center" style={{ padding: "20px 0" }}>
        <Col>
          <Row gutter={[0, 20]}>
            <Col span={24}>
              <Form.Item
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!",
                  },
                ]}
              >
                <Input
                  placeholder="E-mail*"
                  className="custom-input"
                  autoComplete="off"
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password
                  placeholder="Password*"
                  className="custom-input"
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="confirm_password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The two passwords that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  placeholder="Confirm Password*"
                  className="custom-input"
                />
              </Form.Item>
            </Col>
            <Col>
              <span className="custom-font">
                Your personal data will be used to upport and improve your
                experience on this website. For details, please refer to the{" "}
                <u>Privacy Policy</u>.
              </span>
            </Col>
            <Col span={24}>
              <Button
                htmlType="submit"
                size="large"
                className="custom-button"
                style={{ width: "100%" }}
              >
                Sign Up
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};
export default Sign;
