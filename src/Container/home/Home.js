import React from "react";
import { Outlet } from "react-router-dom";

export const Home = () => {
   return (
      <div>
         Home
         <a href="/auth/login">Login</a>
         <a href="/auth/register">Register</a>
         <a href="/product">Product</a>
         <Outlet />
      </div>
   );
};
