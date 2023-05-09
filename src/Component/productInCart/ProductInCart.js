import { Checkbox, Popconfirm } from "antd";
import React, { useEffect, useState } from "react";
import { HandleAmount } from "../../Layout/handleAmount/HandleAmount";
import { DeleteOutlined } from "@ant-design/icons";
import { formatDate, formatVND } from "../../service/formater";
import { useDispatch } from "react-redux";
import {
   deleteProductInCart,
   updateProductInCart,
} from "../../reduxToolkit/thunk/productThunk";
export const ProductInCart = ({ productItem }) => {
   const [qty, setQty] = useState(productItem.quantity);
   const dispatch = useDispatch();
   const onUpdateProductInCart = (id) => {
      dispatch(updateProductInCart({ id, quantity: qty }));
   };

   useEffect(() => {
      onUpdateProductInCart(productItem.infoProduct._id);
   }, [qty]);

   return (
      <div class="shopping-cart__product-content">
         <div class="row g-0 text-center align-items-center">
            <div class="col-4">
               <div class="sc__product-detail">
                  {/* <Checkbox></Checkbox> */}
                  <img
                     src={productItem.infoProduct.brand.img}
                     style={{
                        height: "64px",
                        objectFit: "cover",
                        margin: "0px 16px",
                     }}
                     alt="product.png"
                  ></img>
                  <div class="sc__product-info">
                     <p style={{ fontSize: "1em" }}>
                        {productItem.infoProduct.name}
                     </p>
                     <p
                        style={{
                           fontSize: "0.8em",
                           color: "#999",
                        }}
                     >
                        HSD:{" "}
                        {formatDate(productItem.infoProduct.expirationDate)}
                     </p>
                  </div>
               </div>
            </div>
            <div class="col-2">{formatVND(productItem.infoProduct.price)}</div>
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
                     max={
                        productItem.infoProduct.countInStock -
                        productItem.infoProduct.countSold
                     }
                     min={1}
                     value={qty}
                     setValue={setQty}
                  ></HandleAmount>
                  <p class="sc__qty-in-stock">
                     ( Còn{" "}
                     {productItem.infoProduct.countInStock -
                        productItem.infoProduct.countSold}{" "}
                     voucher )
                  </p>
               </div>
            </div>
            <div class="col-2">
               <p style={{ color: "#4096ff", margin: 0, fontWeight: "500" }}>
                  {formatVND(productItem.infoProduct.price * qty)}
               </p>
            </div>
            <div class="col-1">
               <Popconfirm
                  placement="bottom"
                  title={"Bạn có muốn xóa sản phẩm này"}
                  // description={"Bạn có muốn xóa sản phẩm này"}
                  onConfirm={() => {
                     dispatch(
                        deleteProductInCart({ id: productItem.infoProduct._id })
                     );
                  }}
                  okText="Có"
                  cancelText="Không"
               >
                  <DeleteOutlined
                     class="sc__delete-product"
                     style={{ cursor: "pointer" }}
                  />
               </Popconfirm>
            </div>
         </div>
      </div>
   );
};
