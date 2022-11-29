import React, { useEffect } from "react";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Input, Checkbox, Button, Divider, Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../reduxToolkit/thunk/userThunk";
import { isLogin } from "../../reduxToolkit/selector/userSelector";
import { useNavigate } from "react-router-dom";
import { AuthWithFirebase } from "../authWithFirebase/AuthWithFirebase";

export const Login = () => {
   const dispatch = useDispatch();
   const isAuth = useSelector(isLogin);
   const navigate = useNavigate();

   useEffect(() => {
      if (isAuth) {
         navigate("/");
      }
   }, [isAuth]);
   const onLogin = (value) => {
      dispatch(login({ email: value.email, password: value.password }));
   };
   return (
      <div class="auth__login-container">
         <div class="auth__login-top">
            <div class="auth__login-title">
               <p>Đăng nhập</p>
            </div>
            <Form
               name="normal_login"
               initialValues={{ remember: true }}
               onFinish={onLogin}
            >
               <div class="auth__login-input">
                  <Form.Item
                     name="email"
                     rules={[
                        {
                           type: "email",
                           message:
                              "Không đúng định dạng E-mail (Ví dụ: abc@gmail.com)!",
                        },
                        {
                           required: true,
                           message: "Vui lòng nhập email !",
                        },
                     ]}
                     style={{ marginBottom: "16px" }}
                  >
                     <Input
                        placeholder="Email"
                        prefix={<UserOutlined class="site-form-item-icon" />}
                        // style={{ margin: "8px 0px" }}
                     />
                  </Form.Item>
                  <Form.Item
                     name="password"
                     rules={[
                        {
                           required: true,
                           message: "Vui lòng nhập mật khẩu !",
                        },
                     ]}
                     style={{ marginBottom: "16px" }}
                  >
                     <Input.Password
                        placeholder="Mật khẩu"
                        prefix={<LockOutlined />}
                        // style={{ margin: "8px 0px" }}
                     />
                  </Form.Item>
               </div>
               <div class="auth__login-rememberMe-forgetPass">
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                     <Checkbox>Ghi nhớ đăng nhập</Checkbox>
                  </Form.Item>
                  <a href="/auth/forgot_password">Quên mật khẩu ?</a>
               </div>

               <div class="auth__login-button">
                  <Form.Item style={{ marginBottom: "8px" }}>
                     <Button
                        type="primary"
                        htmlType="submit"
                        style={{
                           width: "100%",
                           margin: "8px 0px",
                           fontWeight: "600",
                        }}
                     >
                        Đăng nhập
                     </Button>
                  </Form.Item>
               </div>
            </Form>
            <Divider plain style={{ color: "#cccccc" }}>
               Hoặc
            </Divider>

            <AuthWithFirebase></AuthWithFirebase>
         </div>
         <div class="auth__login-bottom">
            <div class="auth__login-noAccount">
               <p>Chưa có tài khoản ?</p>
               <a href="/auth/register">Đăng kí</a>
            </div>
         </div>
      </div>
   );
};
