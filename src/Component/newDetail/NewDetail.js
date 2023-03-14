import React from "react";
import parse from "html-react-parser";
import "./NewDetail.css";
import { formatDate } from "../../service/formater";
export const NewDetail = ({ newItem }) => {
   const arrObjType = {
      technology: "Công nghệ",
      appliances: "Gia dụng",
      life: "Đời sống",
      entertainment: "Giải trí",
   };

   return (
      <div class="new-detail">
         <img
            src={newItem.imgThumbnail}
            alt="thumbnail.png"
            class="new-detail__img"
         ></img>
         <div class="new-detail__date-submitted">
            <p class="new-detail__type">{arrObjType[newItem.type]}</p>
            <p>Ngày đăng : {formatDate(newItem.dateSubmit)}</p>
         </div>

         <div class="new-detail__title">
            <p>{newItem.title}</p>
         </div>
         {parse(newItem.content)}
      </div>
   );
};
