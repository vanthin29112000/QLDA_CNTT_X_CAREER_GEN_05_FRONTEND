import React, { useEffect, useState } from "react";
import "./Avatar.css";
import { uploadFirebase } from "../../service/upload";
import { Spin } from "antd";
// import { UserOutlined } from "@ant-design/icons";
export const Avatar = ({ imgDefault, onChangeFileImg }) => {
   const [urlImg, setUrlImg] = useState(
      "./images/depositphotos_364169666-stock-illustration-default-avatar-profile-icon-vector.jpg"
   );
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      console.log("img", imgDefault);
      if (imgDefault !== undefined) {
         setUrlImg(imgDefault);
      }
   }, [imgDefault]);

   const onChangeImg = async (e) => {
      // const reader = new FileReader();
      const files = e.target.files;
      console.log(files[0], files[0].type);
      const file = files[0];
      const typeFile = file.type;

      let ftype = ["png", "jpg", "jpeg"];
      if (ftype.includes(typeFile.split("/")[1])) {
         setLoading(true);
         const link = await uploadFirebase(files[0], "/avatar");
         onChangeFileImg(link);
         setUrlImg(link);
      }
   };

   useEffect(() => {
      setLoading(false);
   }, [urlImg]);

   return (
      <Spin tip="Loading" size="small" spinning={loading}>
         <div class="avatar">
            <img
               src={urlImg}
               alt=".png"
               style={{ borderRadius: "100px" }}
            ></img>
            {/* <Avatar size={64} icon={<UserOutlined />} /> */}
            <label htmlFor="edit-avatar">
               <i class="fa-solid fa-pen i-avatar"></i>
            </label>
            <input
               type="file"
               id="edit-avatar"
               onChange={onChangeImg}
               style={{ display: "none" }}
               accept=".jpg, .png"
            ></input>
         </div>
      </Spin>
   );
};
