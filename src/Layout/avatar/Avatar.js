import React, { useEffect, useState } from "react";
import "./Avatar.css";
// import { UserOutlined } from "@ant-design/icons";
export const Avatar = ({ imgDefault }) => {
   const [urlImg, setUrlImg] = useState(
      "./images/depositphotos_364169666-stock-illustration-default-avatar-profile-icon-vector.jpg"
   );

   useEffect(() => {
      console.log("img", imgDefault);
      if (imgDefault !== undefined) {
         setUrlImg(imgDefault);
      }
   }, [imgDefault]);

   const onChangeImg = (e) => {
      // const reader = new FileReader();
      const files = e.target.files;
      console.log(files[0], files[0].type);
      const file = files[0];
      const typeFile = file.type;

      let ftype = ["png", "jpg", "jpeg"];

      if (ftype.includes(typeFile.split("/")[1])) {
         const url = URL.createObjectURL(files[0]);
         console.log(url);
         setUrlImg(url);
      }
   };

   return (
      <div class="avatar">
         <img src={urlImg} alt=".png" style={{ borderRadius: "100px" }}></img>
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
   );
};
