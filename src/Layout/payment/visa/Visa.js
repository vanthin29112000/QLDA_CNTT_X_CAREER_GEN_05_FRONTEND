import { Input, InputNumber } from "antd";
import React from "react";
import "./visa.css";
export const Visa = () => {
   return (
      <div class="visa-container">
         <p class="visa-title">Thông tin thẻ tín dụng / ghi nợ quốc tế</p>
         <div class="visa-content">
            <div class="visa-item">
               <p>Số thẻ :</p>
               <InputNumber
                  placeholder="VD: 4123 4567 8901 2345"
                  controls={false}
                  style={{ width: "100%" }}
               />
            </div>
            <div class="visa-item">
               <p>Tên in trên thẻ :</p>
               <Input placeholder="VD: NGUYEN VAN A" />
            </div>
            <div class="visa-item-flex">
               <div class="visa-item ">
                  <p>Ngày hết hạn :</p>
                  <Input placeholder="VD: MM/YY" />
               </div>
               <div class="visa-item">
                  <p>CVV :</p>
                  <InputNumber
                     placeholder="VD: 123"
                     controls={false}
                     style={{ width: "100%" }}
                  />
               </div>
            </div>
         </div>
      </div>
   );
};
