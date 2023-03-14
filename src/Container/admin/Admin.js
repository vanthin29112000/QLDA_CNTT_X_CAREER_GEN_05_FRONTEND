import { Button } from "antd";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { MenuAdmin } from "../../Component/menuAdmin/MenuAdmin";
import "./admin.css";
export const Admin = () => {
   return (
      <div class="admin-container">
         <div class="admin__menu-container">
            <MenuAdmin></MenuAdmin>
         </div>
         <div class="admin__content" style={{ paddingLeft: "80px" }}>
            <div class="container">
               <Outlet></Outlet>
            </div>
         </div>
      </div>
   );
};
