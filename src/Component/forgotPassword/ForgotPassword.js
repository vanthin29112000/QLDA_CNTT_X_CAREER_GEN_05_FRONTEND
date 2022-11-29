import React, { useEffect, useState } from "react";
import "./forgotPassword.css";
import { Button, Divider, Form, Input, Result } from "antd";
import { ArrowRightOutlined, MailOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordWithFirebase } from "../../reduxToolkit/thunk/userThunk";
import { notification } from "../../reduxToolkit/selector/userSelector";
import { handleEndNotification } from "../../reduxToolkit/slice/userSlice";
import { useNavigate } from "react-router-dom";
export const ForgotPassword = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [isShowSuccess, setIsShowSuccess] = useState(false);
   const notify = useSelector(notification);
   const onResetPassword = (value) => {
      dispatch(resetPasswordWithFirebase(value.email));
   };

   useEffect(() => {
      if (notify.type === "success") {
         setIsShowSuccess(true);
         dispatch(handleEndNotification());
      }
   }, [notify]);

   return (
      <>
         {isShowSuccess ? (
            <Result
               status="success"
               title="Yêu cầu của bạn đã được gửi đi"
               subTitle="Vui lòng theo dõi Email để biết thêm thông tin !!"
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
            <div class="auth__login-container">
               <div class="auth__login-top">
                  <div class="auth__login-title">
                     <p style={{ marginBottom: "16px" }}>Quên mật khẩu</p>
                  </div>
                  <p class="auth_forgot-pass-content">
                     Vui lòng nhập địa chỉ email bên dưới
                  </p>
                  <Form name="register" onFinish={onResetPassword}>
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
                           prefix={<MailOutlined class="site-form-item-icon" />}
                        />
                     </Form.Item>

                     <div class="auth__login-button">
                        <Form.Item style={{ marginBottom: "32px" }}>
                           <Button
                              htmlType="submit"
                              type="primary"
                              style={{
                                 width: "100%",
                                 margin: "8px 0px",
                                 fontWeight: "600",
                                 marginBottom: "0px",
                                 display: "flex",
                                 alignItems: "center",
                                 justifyContent: "center",
                              }}
                           >
                              Gửi thông tin đến Gmail <ArrowRightOutlined />
                           </Button>
                        </Form.Item>
                     </div>
                  </Form>
               </div>
               <Divider
                  plain
                  style={{ color: "#cccccc", margin: "8px 0px" }}
               ></Divider>

               <div class="auth__login-bottom">
                  <div class="auth__login-noAccount">
                     <p>Quay lại</p>
                     <a href="/">trang chủ !!!</a>
                  </div>
               </div>
            </div>
         )}
      </>
   );
};
