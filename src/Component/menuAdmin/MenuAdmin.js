import React, { useState } from "react";
import {
   AppstoreOutlined,
   ExportOutlined,
   IdcardOutlined,
   MenuFoldOutlined,
   MenuUnfoldOutlined,
   PieChartOutlined,
   ShopOutlined,
   ShoppingCartOutlined,
   UserOutlined,
} from "@ant-design/icons";
import "./menuAdmin.css";
import { Avatar, Button, Menu } from "antd";
import { useNavigate } from "react-router-dom";
function getItem(label, key, icon, children, type) {
   return {
      key,
      icon,
      children,
      label,
      type,
   };
}
const items = [
   getItem("Thống kê", "1", <PieChartOutlined />),
   getItem("Đơn hàng", "2", <ShoppingCartOutlined />),
   getItem("Quản lý sản phẩm", "3", <ShopOutlined />),
   getItem("Quản lý người dùng", "4", <IdcardOutlined />),
   getItem("Quản lý tin tức", "5", <AppstoreOutlined />),
];
export const MenuAdmin = () => {
   const [collapsed, setCollapsed] = useState(true);
   const toggleCollapsed = () => {
      setCollapsed(!collapsed);
   };
   const naviagte = useNavigate();

   const onChangeClick = (item) => {
      const { key } = item;
      switch (key) {
         case "5": {
            naviagte("/admin/news-management");
            break;
         }
         default: {
            break;
         }
      }
      setCollapsed(true);
   };
   return (
      <div
         style={{
            width: "fit-content",
            height: "100vh",
            // backgroundColor: "#001529",
            // transition: "width 2s  ",
            display: "flex",
            flexDirection: "column",
         }}
         class="admin__menu"
      >
         <div class="button-animation">
            <Button
               type="primary"
               class="btn-show-menu"
               onClick={toggleCollapsed}
               style={
                  collapsed
                     ? {
                          margin: "20px",
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          fontSize: "1.2em",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                       }
                     : {
                          marginLeft: "12px",
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          fontSize: "1.2em",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                       }
               }
            >
               {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>

            {!collapsed && (
               <p
                  style={{
                     margin: "0",
                     marginLeft: "10px",
                     fontSize: "1.2em",
                     fontWeight: "600",
                  }}
               >
                  ADMIN
               </p>
            )}
         </div>

         <div style={{ width: 256, height: "100vh" }}>
            <Menu
               defaultSelectedKeys={["1"]}
               defaultOpenKeys={["sub1"]}
               mode="inline"
               theme="dark"
               inlineCollapsed={collapsed}
               items={items}
               onClick={onChangeClick}
               style={{
                  height: "100%",
                  flexGrow: "1",
                  paddingTop: "64px",
               }}
            />
            <div
               class="admin__info-account"
               style={
                  collapsed
                     ? {
                          width: "80px",
                       }
                     : {
                          width: "256px",
                       }
               }
            >
               <div
                  style={
                     collapsed
                        ? {
                             //   paddingLeft: "20px",
                          }
                        : {
                             paddingLeft: "12px",
                          }
                  }
                  class="admin__info-account__item"
               >
                  <Avatar
                     style={{
                        backgroundColor: "#87d068",
                     }}
                     icon={<UserOutlined />}
                  />

                  {!collapsed ? (
                     <>
                        <span
                           class="admin__info-detail"
                           style={{
                              padding: "0 10px",
                              flexGrow: "1",
                           }}
                        >
                           <span style={{ fontWeight: "500" }}>
                              Phan Văn Thìn
                           </span>
                           <span
                              style={{ fontSize: "0.8em", color: "#bcbcbc" }}
                           >
                              Nhân viên
                           </span>
                        </span>

                        <ExportOutlined
                           style={{
                              width: "32px",
                              paddingRight: "12px",
                              fontSize: "1.2em",
                              cursor: "pointer",
                           }}
                        />
                     </>
                  ) : (
                     <>
                        <span
                           class="admin__info-detail"
                           style={{
                              padding: "0 10px",
                              flexGrow: "1",
                              display: "none",
                           }}
                        >
                           <span style={{ fontWeight: "500", opacity: "0" }}>
                              Phan Văn Thìn
                           </span>
                           <span
                              style={{
                                 fontSize: "0.8em",
                                 color: "#bcbcbc",
                                 opacity: "0",
                              }}
                           >
                              Nhân viên
                           </span>
                        </span>
                     </>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};
