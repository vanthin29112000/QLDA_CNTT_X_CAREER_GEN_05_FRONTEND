import { Button, Progress } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { formatDate, formatVND } from "../../service/formater";
import { useDispatch } from "react-redux";
import {
   addProductInCart,
   updateProductInCart,
} from "../../reduxToolkit/thunk/productThunk";

export const Product = ({ product }) => {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const onAddProductInCart = (id) => {
      dispatch(addProductInCart({ id: id, quantity: 1 }));
   };

   const widthProcess = Math.floor(
      ((product.countInStock - product.countSold) / product.countInStock) * 100
   );

   return (
      <>
         <div class="pagination__product-item-bg">
            {/* {console.log(widthProcess)} */}
            <div
               class="pagination__product-item-top"
               onClick={() => {
                  navigate(`/product/${product._id}`);
               }}
            >
               <img
                  src={product.brand.img}
                  class="product-item__image"
                  alt="brand.png"
               ></img>
               <div class="product-item__title-timer">
                  <p class="product-item__title">{product.name}</p>
                  <p class="product-item__timer">
                     Áp dụng : {formatDate(product.effectiveDate)} -{" "}
                     {formatDate(product.expirationDate)}
                  </p>
               </div>
            </div>
            <div class="product-content">
               <div class="product-content__item">
                  <p>
                     <strong class="product-content__item-title">
                        Mô tả :
                     </strong>{" "}
                     {product.desc}
                  </p>
               </div>
               <div class="product-content__item">
                  <p>
                     {" "}
                     <strong class="product-content__item-title">
                        Ngành hàng :
                     </strong>
                     {product.category}
                  </p>
               </div>
            </div>
            <div class="product-cart-price">
               {product.countInStock - product.countSold === 0 ? (
                  <p class="product-cart__sold-out">HẾT HÀNG</p>
               ) : (
                  <>
                     <div class="product__price-amount-bg">
                        <p class="product__price">{formatVND(product.price)}</p>
                        <div>
                           <div
                              class=" w3-round-xlarge product__price-amount-container"
                              style={{ width: "110px" }}
                           >
                              <div
                                 class="w3-round-xlarge product__price-amount-process"
                                 style={{
                                    height: "16px",
                                    width: `${widthProcess}%`,
                                 }}
                              ></div>
                              <p class="product__price-amount">
                                 {product.countInStock - product.countSold}{" "}
                                 voucher
                              </p>
                           </div>
                        </div>
                     </div>
                     <Button
                        type="primary"
                        style={{ height: "48px" }}
                        onClick={() => {
                           onAddProductInCart(product._id);
                        }}
                     >
                        Mua ngay
                     </Button>
                  </>
               )}
            </div>
         </div>
      </>
   );
};
