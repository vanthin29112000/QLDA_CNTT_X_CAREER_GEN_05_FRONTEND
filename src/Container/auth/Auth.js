import React from "react";
import { Outlet } from "react-router-dom";

import "./Auth.css";

export const Auth = () => {
   return (
      <div class="auth-container row g-0">
         <div class="auth-bg col-12 col-md-11 col-lg-8 col-xl-8 row g-0">
            <div class="auth-bg__item auth-bg__item-left col">
               <img
                  src="/images/Allura - Online Searching.png"
                  alt=".png"
               ></img>
            </div>
            <div class="auth-bg__item auth-bg__item-right col">
               <Outlet />
            </div>
         </div>
      </div>
   );
};
