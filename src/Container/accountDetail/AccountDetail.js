import React, { useEffect, useState } from "react";
import { Avatar } from "../../Layout/avatar/Avatar";
import "./AccountDetail.css";
import moment from "moment";
import {
   AimOutlined,
   LockOutlined,
   MailOutlined,
   PhoneOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, DatePicker, Form, Input, Radio, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
   isLogin,
   loadingUser,
   userInfo,
} from "../../reduxToolkit/selector/userSelector";
import { formatAddress, formatDate } from "../../service/formater";
import { useNavigate } from "react-router-dom";
import { AddressForm } from "../../Component/addressForm/AddressForm";
import {
   changePasswordUser,
   updateInfoUser,
} from "../../reduxToolkit/thunk/userThunk";

// import { loading } from "../../reduxToolkit/selector/userSelector";

// const { Option } = Select;
export const AccountDetail = () => {
   const [isShowPhone, setIsShowPhone] = useState(true);
   const [isShowChangePass, setIsShowChangePass] = useState(true);
   const [isShowChangeAddess, setIsShowChangeAddress] = useState(true);
   const [avatar, setAvatar] = useState("");

   const formRef = React.useRef(null);
   const phoneRef = React.useRef(null);
   const accountInfo = useSelector(userInfo);
   const isAuth = useSelector(isLogin);
   const isLoading = useSelector(loadingUser);
   const navigate = useNavigate();

   const dispatch = useDispatch();
   const token = localStorage.getItem("token");

   useEffect(() => {
      console.log("auth", isAuth, isLoading, accountInfo);
      if (!isAuth && !token) {
         navigate("/");
      }
   }, [isAuth]);

   const dateFormat = "DD/MM/YYYY";

   useEffect(() => {
      if (accountInfo !== "") {
         let tempBirthday = formatDate(accountInfo.birthday);

         formRef.current?.setFieldsValue({
            name: accountInfo.name,
            birthday: moment(tempBirthday, dateFormat),
            nationality: accountInfo.nationality,
            gender: accountInfo.gender,
         });

         phoneRef.current?.setFieldsValue({
            phone: accountInfo.phone,
         });
      }
   }, [accountInfo]);

   const onUpdateInfoUser = (e) => {
      dispatch(updateInfoUser({ ...e, avatar }));
   };

   const onUpdatePhone = (e) => {
      dispatch(updateInfoUser(e));
      setIsShowPhone(!isShowPhone);
   };

   const onUpdatePassword = (e) => {
      dispatch(changePasswordUser(e));
      setIsShowChangePass(true);
   };

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
                              <Avatar
                                 imgDefault={accountInfo.avatar}
                                 onChangeFileImg={(e) => {
                                    setAvatar(e);
                                 }}
                              ></Avatar>
                           </div>
                           <div class="add__user-info-detail">
                              <div class="add__user-info-item">
                                 <Form
                                    name="basic"
                                    labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 16 }}
                                    ref={formRef}
                                    initialValues={{ remember: true }}
                                    onFinish={onUpdateInfoUser}
                                 >
                                    <Form.Item
                                       label="Họ và tên"
                                       name="name"
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
                                       label="Ngày sinh"
                                       name="birthday"
                                       rules={[
                                          {
                                             required: true,
                                             message:
                                                "Vui lòng chọn ngày sinh!",
                                          },
                                       ]}
                                    >
                                       <DatePicker format={dateFormat} />
                                    </Form.Item>

                                    <Form.Item label="Giới tính" name="gender">
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
                                       <Button
                                          type="primary"
                                          htmlType="submit"
                                          // onClick={onUpdateInfoUser}
                                       >
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
                        <Form ref={phoneRef} onFinish={onUpdatePhone}>
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
                                          {accountInfo.phone}
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
                                                validator: (_, value) => {
                                                   if (
                                                      !value ||
                                                      /^[0-9\+]*$/.test(value)
                                                   ) {
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
                                                message:
                                                   "Số điện thoại không đúng !",
                                             },
                                          ]}
                                          style={{ marginBottom: "0px" }}
                                       >
                                          <Input style={{ width: "100%" }} />
                                       </Form.Item>
                                    )}
                                 </div>
                              </div>
                              {isShowPhone ? (
                                 <Button
                                    type="primary"
                                    ghost
                                    onClick={() => {
                                       setIsShowPhone(false);
                                    }}
                                    style={{ marginTop: "22px" }}
                                 >
                                    Thay đổi
                                 </Button>
                              ) : (
                                 <div>
                                    <Button
                                       style={{
                                          marginTop: "22px",
                                          marginRight: "8px",
                                       }}
                                       onClick={() => {
                                          setIsShowPhone(true);
                                       }}
                                    >
                                       Quay lại
                                    </Button>
                                    <Button
                                       type="primary"
                                       style={{ marginTop: "22px" }}
                                       htmlType="submit"
                                    >
                                       Cập nhật
                                    </Button>
                                 </div>
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

                     {/* Địa chỉ */}
                     <div class="ad__user-info">
                        <p
                           style={{
                              fontSize: "18px",
                              fontWeight: "400",
                              color: "rgb(100, 100, 109)",
                              margin: "0",
                              paddingRight: "8px",
                           }}
                        >
                           Địa chỉ giao hàng
                        </p>

                        {isShowChangeAddess ? (
                           <div class="ad__user-info-item">
                              <div class="ad__user-detail-item">
                                 {isShowChangeAddess && (
                                    <AimOutlined
                                       style={{
                                          fontSize: "24px",
                                          marginRight: "16px",
                                          color: "#D3D3D8",
                                       }}
                                    />
                                 )}
                                 <div
                                    class="ad__user-detail-title"
                                    style={{ width: "100%" }}
                                 >
                                    <p>Địa chỉ</p>
                                    <p style={{ fontWeight: "500" }}>
                                       {formatAddress(accountInfo.address)}
                                    </p>
                                 </div>
                              </div>

                              <Button
                                 type="primary"
                                 ghost
                                 onClick={() => {
                                    setIsShowChangeAddress(false);
                                 }}
                                 style={{ marginTop: "22px" }}
                              >
                                 Thay đổi
                              </Button>
                           </div>
                        ) : (
                           <div
                              style={{
                                 borderBottom: "1px solid rgba(0,0,0,.12)",
                                 padding: "16px 0px",
                              }}
                           >
                              <AddressForm
                                 addressInfo={accountInfo.address}
                                 setIsShowChangeAddress={setIsShowChangeAddress}
                              ></AddressForm>
                           </div>
                        )}
                     </div>
                     {/*  */}
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
                                 <Form onFinish={onUpdatePassword}>
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
                                          ({ getFieldValue }) => ({
                                             validator(_, value) {
                                                if (
                                                   !value ||
                                                   getFieldValue(
                                                      "oldPassword"
                                                   ) !== value
                                                ) {
                                                   return Promise.resolve();
                                                }
                                                return Promise.reject(
                                                   new Error(
                                                      "Mật khẩu mới giống với mật khẩu cũ vui lòng chọn mật khẩu khác!"
                                                   )
                                                );
                                             },
                                          }),
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
