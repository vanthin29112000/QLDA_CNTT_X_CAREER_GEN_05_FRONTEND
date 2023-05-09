import { notification } from "antd";

export const openNotificationWithIcon = (type, message) => {
   notification[type]({
      message: message,
      description: "",
      style: { top: "48px" },
   });
};
