import { Checkbox } from "antd";
import React, { useState } from "react";
import { HandleAmount } from "../../Layout/handleAmount/HandleAmount";
import { DeleteOutlined } from "@ant-design/icons";
export const ProductInCart = () => {
   const [qty, setQty] = useState(1);

   return (
      <div class="shopping-cart__product-content">
         <div class="row g-0 text-center align-items-center">
            <div class="col-4">
               <div class="sc__product-detail">
                  <Checkbox></Checkbox>
                  <img
                     src=".\images\brand-item\grab-logo.webp"
                     style={{
                        height: "64px",
                        objectFit: "cover",
                        margin: "0px 16px",
                     }}
                     alt="product.png"
                  ></img>
                  <div class="sc__product-info">
                     <p style={{ fontSize: "1em" }}>Sản phẩm 1</p>
                     <p
                        style={{
                           fontSize: "0.8em",
                           color: "#999",
                        }}
                     >
                        HSD : 12 tháng
                     </p>
                  </div>
               </div>
            </div>
            <div class="col-2">12.000 đ</div>
            <div class="col-3">
               <div
                  class=""
                  style={{
                     width: "fit-content",
                     margin: "0 auto",
                     position: "relative",
                  }}
               >
                  <HandleAmount
                     max={12}
                     value={qty}
                     setValue={setQty}
                  ></HandleAmount>
                  <p class="sc__qty-in-stock">( Còn 12 voucher )</p>
               </div>
            </div>
            <div class="col-2">
               <p style={{ color: "#4096ff", margin: 0, fontWeight: "500" }}>
                  12.000 đ
               </p>
            </div>
            <div class="col-1">
               <DeleteOutlined
                  class="sc__delete-product"
                  style={{ cursor: "pointer" }}
               />
            </div>
         </div>
      </div>
   );
};
