import React, { useEffect } from "react";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Input, Checkbox, Button, Divider, Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginStaff } from "../../reduxToolkit/thunk/staffThunk";
import {
   isLogin,
   notification,
} from "../../reduxToolkit/selector/staffSelector";
import { openNotificationWithIcon } from "../../Layout/notification/Notification";
import { handleEndNotification } from "../../reduxToolkit/slice/staffSlice";

export const LoginAdmin = () => {
   const dispatch = useDispatch();
   const isAuth = useSelector(isLogin);
   const notify = useSelector(notification);

   const navigate = useNavigate();

   useEffect(() => {
      if (notify.isShow) {
         openNotificationWithIcon(notify.type, notify.message);
         dispatch(handleEndNotification());
      }
   }, [notify]);

   useEffect(() => {
      if (isAuth) {
         navigate("/admin");
      }
   }, [isAuth]);
   const onLogin = (value) => {
      dispatch(
         loginStaff({ username: value.username, password: value.password })
      );
   };
   return (
      <div class="auth-container row g-0">
         <div class="auth-bg col-12 col-md-11 col-lg-8 col-xl-8 row g-0">
            <div
               class="auth-bg__item auth-bg__item-left col"
               style={{ padding: "0px 16px" }}
            >
               <img
                  src="/images/463c6657be5ebf3364830ef7487c6519.jpg"
                  alt=".png"
               ></img>
            </div>
            <div class="auth-bg__item auth-bg__item-right col">
               <div class="auth__login-container">
                  <div class="auth__login-top">
                     <div class="auth__login-title">
                        <p>Trang quản lý</p>
                     </div>
                     <Form name="normal_login" onFinish={onLogin}>
                        <div class="auth__login-input">
                           <Form.Item
                              name="username"
                              rules={[
                                 {
                                    required: true,
                                    message: "Vui lòng nhập tài khoản !",
                                 },
                              ]}
                              style={{ marginBottom: "16px" }}
                           >
                              <Input
                                 placeholder="Tài khoản"
                                 prefix={
                                    <UserOutlined class="site-form-item-icon" />
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
                              ]}
                              style={{ marginBottom: "16px" }}
                           >
                              <Input.Password
                                 placeholder="Mật khẩu"
                                 prefix={<LockOutlined />}
                              />
                           </Form.Item>
                        </div>
                        <div class="auth__login-rememberMe-forgetPass"></div>

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
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};
