import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { notification } from "../../reduxToolkit/selector/productsSelector";
import { openNotificationWithIcon } from "../../Layout/notification/Notification";
import { handleEndNotification } from "../../reduxToolkit/slice/productSlice";

export const Product = () => {
   const dispatch = useDispatch();
   const notify = useSelector(notification);

   useEffect(() => {
      if (notify.isShow) {
         openNotificationWithIcon(notify.type, notify.message);
         dispatch(handleEndNotification());
      }
   }, [notify]);

   return <Outlet></Outlet>;
};
