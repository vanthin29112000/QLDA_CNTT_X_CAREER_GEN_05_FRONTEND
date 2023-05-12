import {
   LockOutlined,
   UserOutlined,
   MailOutlined,
   PhoneOutlined,
} from "@ant-design/icons";
import { Button, Divider, Form, Input, Result } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
   isLogin,
   notification,
} from "../../reduxToolkit/selector/userSelector";
import { handleEndNotification } from "../../reduxToolkit/slice/userSlice";
import { register } from "../../reduxToolkit/thunk/userThunk";
import { AuthWithFirebase } from "../authWithFirebase/AuthWithFirebase";
export const Register = () => {
   const dispatch = useDispatch();
   const isAuth = useSelector(isLogin);
   const navigate = useNavigate();
   const [isShowSuccess, setIsShowSuccess] = useState(false);
   const notify = useSelector(notification);

   useEffect(() => {
      if (notify.type === "success") {
         setIsShowSuccess(true);
         dispatch(handleEndNotification());
      }
   }, [notify]);

   useEffect(() => {
      if (isAuth) {
         navigate("/");
      }
   }, [isAuth]);

   const onRegister = (value) => {
      // console.log(value);
      dispatch(register(value));
   };

   return (
      <>
         {isShowSuccess ? (
            <Result
               status="success"
               title="Yêu cầu đăng kí của bạn đã được gửi đi"
               subTitle="Vui lòng theo dõi Email để xác thực tài khoản của bạn!!"
               extra={[
                  <Button
                     type="primary"
                     key="console"
                     onClick={() => {
                        navigate("/");
                     }}
                  >
                     Quay về trang chủ
                  </Button>,
               ]}
            />
         ) : (
            <div class="auth__register-container">
               <div class="auth__login-top">
                  <div class="auth__register-title">
                     <p>Đăng kí</p>
                  </div>
                  <Form name="register" onFinish={onRegister}>
                     <div class="auth__login-input">
                        {/* <UploadImage></UploadImage> */}
                        <Form.Item
                           name="name"
                           rules={[
                              {
                                 required: true,
                                 message: "Vui lòng nhập họ và tên !",
                              },
                           ]}
                           style={{ marginBottom: "16px" }}
                        >
                           <Input
                              placeholder="Họ và tên"
                              prefix={
                                 <UserOutlined class="site-form-item-icon" />
                              }
                           />
                        </Form.Item>
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
                              prefix={
                                 <MailOutlined class="site-form-item-icon" />
                              }
                           />
                        </Form.Item>
                        <Form.Item
                           name="phone"
                           rules={[
                              {
                                 required: true,
                                 message: "Vui lòng nhập số điện thoại !",
                              },
                              {
                                 validator: (_, value) => {
                                    if (!value || /^[0-9\+]*$/.test(value)) {
                                       return Promise.resolve();
                                    }
                                    return Promise.reject(
                                       new Error(
                                          "Vui lòng nhập đúng định dạng số"
                                       )
                                    );
                                 },
                              },
                              {
                                 min: 10,
                                 message: "Số điện thoại không đúng !",
                              },
                           ]}
                           style={{ marginBottom: "16px" }}
                        >
                           <Input
                              placeholder="Số điện thoại"
                              prefix={
                                 <PhoneOutlined class="site-form-item-icon" />
                              }
                           />
                        </Form.Item>
                        <Form.Item
                           name="password"
                           rules={[
                              {
                                 required: true,
                                 message: "Vui lòng nhập mật khẩu !",
                              },
                              {
                                 validator: (_, value) => {
                                    if (
                                       !value ||
                                       /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/.test(
                                          value
                                       )
                                    ) {
                                       return Promise.resolve();
                                    }
                                    return Promise.reject(
                                       new Error(
                                          "Mật khẩu phải hơn 8 ký tự (Bao gồm chữ in hoa, chữ số, ký tự đặc biệt)"
                                       )
                                    );
                                 },
                              },
                           ]}
                           style={{ marginBottom: "16px" }}
                        >
                           <Input.Password
                              placeholder="Mật khẩu"
                              prefix={<LockOutlined />}
                           />
                        </Form.Item>
                        <Form.Item
                           name="confirm"
                           dependencies={["password"]}
                           rules={[
                              {
                                 required: true,
                                 message: "Vui lòng nhập lại mật khẩu !",
                              },
                              ({ getFieldValue }) => ({
                                 validator(_, value) {
                                    if (
                                       !value ||
                                       getFieldValue("password") === value
                                    ) {
                                       return Promise.resolve();
                                    }
                                    return Promise.reject(
                                       new Error("Mật khẩu không khớp!")
                                    );
                                 },
                              }),
                           ]}
                           style={{ marginBottom: "16px" }}
                        >
                           <Input.Password
                              placeholder="Nhập lại mật khẩu"
                              prefix={<LockOutlined />}
                           />
                        </Form.Item>
                     </div>
                     {/* <div class="auth__login-rememberMe-forgetPass">
               <div>
                  <Checkbox>Ghi nhớ đăng nhập</Checkbox>
               </div>
               <a href="/">Quên mật khẩu ?</a>
            </div> */}

                     <div class="auth__login-button">
                        <Form.Item style={{ marginBottom: "0px" }}>
                           <Button
                              htmlType="submit"
                              type="primary"
                              style={{
                                 width: "100%",
                                 margin: "8px 0px",
                                 fontWeight: "600",
                                 marginBottom: "0px",
                              }}
                           >
                              Đăng kí{" "}
                           </Button>
                        </Form.Item>
                     </div>
                  </Form>
                  <Divider
                     plain
                     style={{ color: "#cccccc", margin: "8px 0px" }}
                  >
                     Hoặc
                  </Divider>

                  <AuthWithFirebase></AuthWithFirebase>
               </div>
               <div class="auth__login-bottom">
                  <div class="auth__login-noAccount">
                     <p>Đã có tài khoản ?</p>
                     <a href="/auth/login">Đăng nhập</a>
                  </div>
               </div>
            </div>
         )}
      </>
   );
};
