import { Button } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { isLogin } from "../../reduxToolkit/selector/userSelector";

export const Home = () => {
   const isAuth = useSelector(isLogin);

   return (
      <div>
         Home
         <a href="/auth/login">Login</a>
         <a href="/auth/register">Register</a>
         <a href="/product">Product</a>
         <a href="/cart">ShoppingCart</a>
         <a href="/accountDetail">Thông tin tài khoản</a>
         {isAuth ? (
            <Button
               type="primary"
               onClick={() => {
                  localStorage.clear();
               }}
            >
               Đăng xuất
            </Button>
         ) : (
            ""
         )}
         <Outlet />
      </div>
   );
};
