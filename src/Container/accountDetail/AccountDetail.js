import React, { useEffect, useState } from "react";
import { Avatar } from "../../Layout/avatar/Avatar";
import "./AccountDetail.css";
import moment from "moment";
import { LockOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { Button, Checkbox, DatePicker, Form, Input, Radio, Select } from "antd";
import { useSelector } from "react-redux";
import {
   isLogin,
   loadingUser,
   userInfo,
} from "../../reduxToolkit/selector/userSelector";
import { formatDate } from "../../service/formater";
import { useNavigate } from "react-router-dom";
// import { loading } from "../../reduxToolkit/selector/userSelector";

// const { Option } = Select;
export const AccountDetail = () => {
   const [isShowPhone, setIsShowPhone] = useState(true);
   const [isShowChangePass, setIsShowChangePass] = useState(true);
   const formRef = React.useRef(null);
   const accountInfo = useSelector(userInfo);
   const isAuth = useSelector(isLogin);
   const isLoading = useSelector(loadingUser);
   const navigate = useNavigate();
   const token = localStorage.getItem("token");
   useEffect(() => {
      console.log("auth", isAuth, isLoading, accountInfo);
      if (!isAuth && !token) {
         navigate("/");
      }
   }, [isAuth]);

   const onChangeIsShow = () => {
      console.log("change");
      setIsShowPhone(!isShowPhone);
   };

   const dateFormat = "DD/MM/YYYY";

   useEffect(() => {
      if (accountInfo !== "") {
         let tempBirthday = formatDate(accountInfo.birthday);

         formRef.current?.setFieldsValue({
            fullName: accountInfo.name,
            birthDay: moment(tempBirthday, dateFormat),
         });
      }
   }, [accountInfo]);

   return (
      <div class="account-detail__container">
         <div
            class="container  px-0"
            style={{ width: "100%", height: "fit-content" }}
         >
            <h3>Thông tin tài khoản</h3>
            <div class="account-detail__bg">
               <div class="row gx-0">
                  <div
                     class="col-md-12 col-lg-6 col-xl-6"
                     style={{ borderRight: "1px solid rgba(0,0,0,.12)" }}
                  >
                     <div class="ad__user-info">
                        <div
                           style={{
                              width: " 100%",
                              height: "fit-content",
                           }}
                        >
                           <p
                              style={{
                                 fontSize: "18px",
                                 fontWeight: "400",
                                 color: "rgb(100, 100, 109)",
                              }}
                           >
                              Thông tin cá nhân
                           </p>
                           <div class="ad__avatar">
                              <Avatar imgDefault={accountInfo.avatar}></Avatar>
                           </div>
                           <div class="add__user-info-detail">
                              <div class="add__user-info-item">
                                 <Form
                                    name="basic"
                                    labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                    ref={formRef}
                                    initialValues={{ remember: true }}
                                    // onFinish={onFinish}
                                    // onFinishFailed={onFinishFailed}
                                    // autoComplete="off"
                                 >
                                    <Form.Item
                                       label="Họ và tên"
                                       name="fullName"
                                       rules={[
                                          {
                                             required: true,
                                             message:
                                                "Vui lòng nhập họ và tên của bạn!",
                                          },
                                       ]}
                                    >
                                       <Input />
                                    </Form.Item>

                                    {/* <Form.Item
                                       label="Nickname"
                                       name="nickname"
                                       rules={[
                                          {
                                             required: true,
                                             message:
                                                "Vui lòng nhập nickname của bạn!",
                                          },
                                       ]}
                                    >
                                       <Input />
                                    </Form.Item> */}
                                    <Form.Item
                                       label="Ngày sinh"
                                       name="birthDay"
                                       rules={[
                                          {
                                             required: true,
                                             message:
                                                "Vui lòng chọn ngày sinh!",
                                          },
                                       ]}
                                    >
                                       <DatePicker
                                          // defaultValue={moment(
                                          //    formatDate(accountInfo.birthday) ||
                                          //       "01/01/2023",
                                          //    dateFormat
                                          // )}

                                          // defaultValue={moment(
                                          //    accountInfo.birthday && "",
                                          //    dateFormat
                                          // )}
                                          format={dateFormat}
                                       />
                                    </Form.Item>

                                    <Form.Item
                                       label="Giới tính"
                                       name="gender"
                                       rules={[
                                          {
                                             required: true,
                                             message:
                                                "Vui lòng chọn giới tính!",
                                          },
                                       ]}
                                       initialValue={accountInfo.gender || -1}
                                    >
                                       <Radio.Group>
                                          <Radio value={0}>Nam</Radio>
                                          <Radio value={1}>Nữ</Radio>
                                          <Radio value={2}>LGBT</Radio>
                                       </Radio.Group>
                                    </Form.Item>

                                    <Form.Item
                                       label="Quốc tịch"
                                       name="nationality"
                                       rules={[
                                          {
                                             required: true,
                                             message:
                                                "Vui lòng chọn quốc tịch!",
                                          },
                                       ]}
                                       initialValue={
                                          accountInfo.nationality || ""
                                       }
                                    >
                                       <Select>
                                          <Select.Option value="VietNam">
                                             Việt Nam
                                          </Select.Option>
                                       </Select>
                                    </Form.Item>

                                    <Form.Item
                                       wrapperCol={{ offset: 9, span: 16 }}
                                    >
                                       <Button type="primary" htmlType="submit">
                                          Lưu thay đổi
                                       </Button>
                                    </Form.Item>
                                 </Form>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="col-md-12 col-lg-6 col-xl-6">
                     <div class="ad__user-info">
                        <p
                           style={{
                              fontSize: "18px",
                              fontWeight: "400",
                              color: "rgb(100, 100, 109)",
                              margin: "0",
                           }}
                        >
                           Số điện thoại và Email
                        </p>
                        <Form onFinish={onChangeIsShow}>
                           <div class="ad__user-info-item">
                              <div class="ad__user-detail-item">
                                 <PhoneOutlined
                                    style={{
                                       fontSize: "24px",
                                       marginRight: "16px",
                                       color: "#D3D3D8",
                                    }}
                                 />
                                 <div class="ad__user-detail-title">
                                    <p>Số điện thoại</p>
                                    {isShowPhone ? (
                                       <p style={{ fontWeight: "500" }}>
                                          (+84) {accountInfo.phone}
                                       </p>
                                    ) : (
                                       <Form.Item
                                          name="phone"
                                          rules={[
                                             {
                                                required: true,
                                                message:
                                                   "Vui lòng nhập số điện thoại!",
                                             },
                                             {
                                                type: Number,
                                                message:
                                                   "Vui lòng nhập đúng định dạng !",
                                             },
                                             {
                                                min: 9,
                                                message:
                                                   "Số điện thoại không đúng !",
                                             },
                                          ]}
                                          style={{ marginBottom: "0px" }}
                                       >
                                          <Input
                                             addonBefore={"(+84)"}
                                             defaultValue={accountInfo.phone}
                                             style={{ width: "100%" }}
                                          />
                                       </Form.Item>
                                    )}
                                 </div>
                              </div>
                              {isShowPhone ? (
                                 <Button
                                    type="primary"
                                    ghost
                                    onClick={onChangeIsShow}
                                    style={{ marginTop: "22px" }}
                                 >
                                    Thay đổi
                                 </Button>
                              ) : (
                                 <Button
                                    type="primary"
                                    style={{ marginTop: "22px" }}
                                    htmlType="submit"
                                 >
                                    Cập nhật
                                 </Button>
                              )}
                           </div>{" "}
                        </Form>
                        <div class="ad__user-info-item">
                           <div class="ad__user-detail-item">
                              <MailOutlined
                                 style={{
                                    fontSize: "24px",
                                    marginRight: "16px",
                                    color: "#D3D3D8",
                                 }}
                              />

                              <div class="ad__user-detail-title">
                                 <p>Email</p>
                                 <p style={{ fontWeight: "500" }}>
                                    {accountInfo.email}
                                 </p>
                              </div>
                           </div>
                        </div>
                     </div>

                     <div class="ad__user-info">
                        <p
                           style={{
                              fontSize: "18px",
                              fontWeight: "400",
                              color: "rgb(100, 100, 109)",
                              margin: "0",
                           }}
                        >
                           Bảo mật
                        </p>

                        {isShowChangePass ? (
                           <div class="ad__user-info-item">
                              <div class="ad__user-detail-item">
                                 <LockOutlined
                                    style={{
                                       fontSize: "24px",
                                       marginRight: "16px",
                                       color: "#D3D3D8",
                                    }}
                                 />

                                 <div class="ad__user-detail-title">
                                    <p>Mật khẩu</p>
                                    <p style={{ fontWeight: "500" }}>
                                       *************
                                    </p>
                                 </div>
                              </div>
                              <Button
                                 type="primary"
                                 ghost
                                 onClick={() => {
                                    setIsShowChangePass(false);
                                 }}
                              >
                                 Thay đổi
                              </Button>
                           </div>
                        ) : (
                           <div class="add__change-password">
                              <p
                                 style={{
                                    fontSize: "18px",
                                    marginBottom: "16px",
                                    fontWeight: "500",
                                    textAlign: "center",
                                 }}
                              >
                                 Thay đổi mật khẩu
                              </p>
                              <div>
                                 <Form>
                                    <Form.Item
                                       name="oldPassword"
                                       rules={[
                                          {
                                             required: true,
                                             message:
                                                "Vui lòng nhập mật khẩu !",
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
                                          placeholder="Nhập mật khẩu cũ"
                                          prefix={<LockOutlined />}
                                       />
                                    </Form.Item>
                                    <Form.Item
                                       name="password"
                                       rules={[
                                          {
                                             required: true,
                                             message:
                                                "Vui lòng nhập mật khẩu !",
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
                                          placeholder="Nhập mật khẩu"
                                          prefix={<LockOutlined />}
                                       />
                                    </Form.Item>
                                    <Form.Item
                                       name="confirm"
                                       dependencies={["password"]}
                                       rules={[
                                          {
                                             required: true,
                                             message:
                                                "Vui lòng nhập lại mật khẩu !",
                                          },
                                          ({ getFieldValue }) => ({
                                             validator(_, value) {
                                                if (
                                                   !value ||
                                                   getFieldValue("password") ===
                                                      value
                                                ) {
                                                   return Promise.resolve();
                                                }
                                                return Promise.reject(
                                                   new Error(
                                                      "Mật khẩu không khớp!"
                                                   )
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
                                    <div
                                       style={{
                                          width: "100%",
                                          display: "grid",
                                          gridTemplateColumns: "49% 49%",
                                          gridGap: "2%",
                                       }}
                                    >
                                       <Button
                                          // htmlType="submit"
                                          style={{
                                             width: "100%",

                                             margin: "8px 0px",
                                             fontWeight: "600",
                                             marginBottom: "0px",
                                          }}
                                          onClick={() => {
                                             setIsShowChangePass(true);
                                          }}
                                       >
                                          Quay lại
                                       </Button>
                                       <Button
                                          htmlType="submit"
                                          type="danger"
                                          style={{
                                             width: "100%",
                                             margin: "8px 0px",
                                             fontWeight: "600",
                                             marginBottom: "0px",
                                          }}
                                       >
                                          Lưu thay đổi
                                       </Button>
                                    </div>
                                 </Form>
                              </div>
                           </div>
                        )}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};
