import React, { useState } from "react";
import { Avatar } from "../../Layout/avatar/Avatar";
import "./AccountDetail.css";
import moment from "moment";
import { LockOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { Button, Checkbox, DatePicker, Form, Input, Radio, Select } from "antd";

const { Option } = Select;
export const AccountDetail = () => {
   const [isShowPhone, setIsShowPhone] = useState(true);
   const [isShowChangePass, setIsShowChangePass] = useState(true);

   const onChangeIsShow = () => {
      console.log("change");
      setIsShowPhone(!isShowPhone);
   };

   const dateFormat = "DD/MM/YYYY";

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
                              <Avatar></Avatar>
                           </div>
                           <div class="add__user-info-detail">
                              <div class="add__user-info-item">
                                 <Form
                                    name="basic"
                                    labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                    initialValues={{ remember: true }}
                                    // onFinish={onFinish}
                                    // onFinishFailed={onFinishFailed}
                                    autoComplete="off"
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

                                    <Form.Item
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
                                    </Form.Item>
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
                                          defaultValue={moment(
                                             "01/01/2015",
                                             dateFormat
                                          )}
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
                                    >
                                       <Radio.Group>
                                          <Radio value={1}>Nam</Radio>
                                          <Radio value={2}>Nữ</Radio>
                                          <Radio value={3}>LGBT</Radio>
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
                                       (+84) 922583848
                                    </p>
                                 ) : (
                                    <Form>
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
                                             defaultValue="922583848"
                                             style={{ width: "100%" }}
                                          />
                                       </Form.Item>
                                    </Form>
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
                                 onClick={onChangeIsShow}
                                 style={{ marginTop: "22px" }}
                              >
                                 Cập nhật
                              </Button>
                           )}
                        </div>
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
                                    vanthin1203@gmail.com
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

                                    <Form.Item style={{ marginBottom: "0px" }}>
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
                                    </Form.Item>
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
