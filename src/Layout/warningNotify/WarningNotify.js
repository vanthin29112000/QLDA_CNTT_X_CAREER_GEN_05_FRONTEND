import React from "react";

export const WarningNotify = ({ isShow, text }) => {
   return <> {isShow && <p style={{ color: "#ff4d4f" }}>{text}</p>}</>;
};
