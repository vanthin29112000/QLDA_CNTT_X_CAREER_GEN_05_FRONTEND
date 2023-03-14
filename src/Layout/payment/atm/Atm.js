import { Input, InputNumber, Select } from "antd";
import React from "react";

export const Atm = () => {
   return (
      <div class="visa-container">
         <p class="visa-title">Thông tin thẻ ATM nội địa</p>
         <div class="visa-content">
            <div class="visa-item">
               <p>Ngân hàng :</p>
               <Select
                  showSearch
                  placeholder="Chọn ngân hàng"
                  optionFilterProp="children"
                  //   onChange={onChange}
                  //   onSearch={onSearch}
                  filterOption={(input, option) =>
                     (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                  }
                  options={[
                     {
                        value: "acb",
                        label: "Ngân hàng ACB",
                     },
                     {
                        value: "agribank",
                        label: "Ngân hàng Agribank",
                     },
                     {
                        value: "sacombank",
                        label: "Ngân hàng Sacombank",
                     },
                  ]}
                  style={{ width: "100%" }}
               />
            </div>
            <div class="visa-item">
               <p>Số thẻ :</p>
               <InputNumber
                  placeholder="4123 4567 8901 2345"
                  controls={false}
                  style={{ width: "100%" }}
               />
            </div>
            <div class="visa-item">
               <p>Tên in trên thẻ :</p>
               <Input placeholder="NGUYEN VAN A" />
            </div>
            <div class="visa-item ">
               <p>Ngày hết hạn :</p>
               <Input placeholder="MM/YY" />
            </div>
         </div>
      </div>
   );
};
