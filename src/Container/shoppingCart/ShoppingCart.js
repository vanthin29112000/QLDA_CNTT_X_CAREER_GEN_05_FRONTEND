import {
   CheckCircleOutlined,
   CloseOutlined,
   DownOutlined,
   MailOutlined,
   RightOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Divider, Input } from "antd";
import React, { useState } from "react";
import { ProductInCart } from "../../Component/productInCart/ProductInCart";
import { Atm } from "../../Layout/payment/atm/Atm";
import { Visa } from "../../Layout/payment/visa/Visa";
import "./ShoppingCart.css";
export const ShoppingCart = () => {
   const [isShowCard, setIsShowCard] = useState(true);
   const [cardType, setIsCardType] = useState(-1);

   const cardTypeList = [
      {
         id: 0,
         img: `./images/logo-payment/unnamed.png`,
      },
      {
         id: 1,
         img: `./images/logo-payment/momo_icon_square_pinkbg.svg`,
      },
      {
         id: 2,
         img: `./images/logo-payment/visa.png`,
      },
      {
         id: 3,
         img: `./images/logo-payment/icon-payment-method-atm.svg`,
      },
   ];

   const onChangeCardType = (key) => {
      if (key >= 0 && key <= 3) {
         setIsCardType(key);
      }
   };

   return (
      <div class="shopping-cart__container ">
         <div
            class="container  px-0"
            style={{ width: "100%", height: "fit-content" }}
         >
            <h3>Giỏ hàng</h3>
            <div class="row gx-4">
               <div class="col-8 col-md-8 col-lg-8 col-xl-8">
                  <div class="shopping-cart__info-product">
                     <div class="shopping-cart__info-product__title shopping-cart__info-product-item">
                        <div
                           class="row g-0 text-center"
                           style={{ width: "100%" }}
                        >
                           <p class="col-4">
                              <div
                                 style={{
                                    width: "100%",
                                    display: "flex",
                                    textAlign: "start",
                                    padding: "0px 16px",
                                 }}
                              >
                                 <Checkbox></Checkbox>{" "}
                                 <p
                                    style={{
                                       width: "fit-content",
                                       padding: "0 16px",
                                    }}
                                 >
                                    Sản phẩm
                                 </p>
                              </div>
                           </p>
                           <p class="col-2">Đơn giá</p>
                           <p class="col-3">Số lượng</p>
                           <p class="col-2">Thành tiền</p>
                           <p class="col-1"></p>
                        </div>
                     </div>

                     <div class="shopping-cart__info-product-item sc__list-product">
                        <ProductInCart></ProductInCart>
                        <Divider style={{ margin: " 0px" }} />
                        <ProductInCart></ProductInCart>
                        <Divider style={{ margin: " 0px" }} />
                        <ProductInCart></ProductInCart>
                        <Divider style={{ margin: " 0px" }} />
                        <ProductInCart></ProductInCart>
                        <Divider style={{ margin: "0px" }} />
                        <ProductInCart></ProductInCart>
                        <Divider style={{ margin: " 0px" }} />
                        <ProductInCart></ProductInCart>
                        <Divider style={{ margin: "0px" }} />
                        <ProductInCart></ProductInCart>
                        <Divider style={{ margin: " 0px" }} />
                     </div>
                  </div>
               </div>
               <div class=" col-4 col-md-4 col-lg-4 col-xl-4">
                  <div class="shopping-cart__info-user">
                     <div class="sc__info-user-item">
                        <div class="sc__info-user-title">
                           <p
                              style={{
                                 color: "rgb(128, 128, 137)",
                              }}
                           >
                              Thông tin khách hàng
                           </p>
                           <a
                              href="/"
                              style={{
                                 color: "rgb(11, 116, 229)",
                              }}
                           >
                              Thay đổi
                           </a>
                        </div>
                        <div class="sc__info-user-content">
                           <div class="sc__info-user-content-item">
                              <p>Phan Văn Thìn </p>{" "}
                              <div
                                 style={{
                                    fontWeight: "300",
                                    margin: "0px 8px",
                                    color: "rgb(128, 128, 137)",
                                 }}
                              >
                                 |
                              </div>{" "}
                              <p>0909*******</p>
                           </div>
                           <div class="sc__info-user-content-email">
                              <MailOutlined style={{ marginRight: "4px" }} />
                              <p>vanthin1203@gmail.com</p>
                           </div>
                        </div>
                     </div>

                     <div class="sc__info-user-item">
                        <div
                           class="sc__info-user-title"
                           onClick={() => {
                              setIsShowCard(!isShowCard);
                           }}
                           style={{ cursor: "pointer" }}
                        >
                           <p
                              style={{
                                 color: "rgb(128, 128, 137)",
                              }}
                           >
                              Chọn hình thức thanh toán
                           </p>

                           {isShowCard ? <DownOutlined /> : <RightOutlined />}
                        </div>

                        {isShowCard && (
                           <>
                              <div class="sc__info-payment">
                                 {cardTypeList.length > 0 &&
                                    cardTypeList.map((card, index) => {
                                       if (card.id === cardType) {
                                          return (
                                             <div
                                                class="sc__info-payment-item sc__info-payment-item-active"
                                                key={index}
                                             >
                                                <CheckCircleOutlined
                                                   style={{
                                                      position: "absolute",
                                                      top: "2px",
                                                      right: "2px",
                                                      color: "#64ca32",
                                                   }}
                                                />
                                                <img
                                                   src={card.img}
                                                   alt="logo-payment.png"
                                                ></img>
                                             </div>
                                          );
                                       } else {
                                          return (
                                             <div
                                                class="sc__info-payment-item"
                                                onClick={() => {
                                                   onChangeCardType(card.id);
                                                }}
                                                key={index}
                                             >
                                                <img
                                                   src={card.img}
                                                   alt="logo-payment.png"
                                                ></img>
                                             </div>
                                          );
                                       }
                                    })}
                              </div>

                              {cardType === 2 && (
                                 <div class="sc__info-payment-content">
                                    <Visa></Visa>
                                 </div>
                              )}

                              {cardType === 3 && (
                                 <div class="sc__info-payment-content">
                                    <Atm></Atm>
                                 </div>
                              )}
                           </>
                        )}
                     </div>

                     <div class="sc__info-user-item">
                        <div class="sc__info-user-title">
                           <p style={{ color: "rgb(128, 128, 137)" }}>
                              Áp mã giảm giá
                           </p>
                        </div>

                        <div class="sc__info-user-discount">
                           <Input placeholder="Nhập mã giảm giá" />
                           <Button
                              type="primary"
                              style={{ borderRadius: "4px", marginLeft: "4px" }}
                           >
                              Áp dụng
                           </Button>
                        </div>

                        <div class="sc__info-user-discount-content">
                           <p>HKJSHFGJS</p>
                           <p style={{ display: "flex", alignItems: "center" }}>
                              -12.000 đ{" "}
                              <CloseOutlined
                                 style={{
                                    color: "#dc3545",
                                    marginLeft: "8px",
                                    cursor: "pointer",
                                 }}
                              />
                           </p>
                        </div>
                     </div>

                     <div class="sc__info-user-item">
                        <div class="sc__info-user-title">
                           <p
                              style={{
                                 color: "black",
                                 fontWeight: "500",
                                 display: "flex",
                              }}
                           >
                              Đơn hàng{" "}
                              <p
                                 style={{
                                    color: " rgb(128, 128, 137)",
                                    fontSize: "1em",
                                    margin: "0px 4px",
                                    fontWeight: "400",
                                 }}
                              >
                                 (2 sản phẩm)
                              </p>
                           </p>
                        </div>

                        <div class="sc__info-order-content">
                           <div class="sc__info-order-item">
                              <p class="sc__info-order-item-title">Tạm tính</p>
                              <p>216.000 đ</p>
                           </div>
                           <div class="sc__info-order-item">
                              <p class="sc__info-order-item-title">
                                 Phí dịch vụ
                              </p>
                              <p>15.000 đ</p>
                           </div>
                           <div class="sc__info-order-item">
                              <p class="sc__info-order-item-title">Giảm giá</p>
                              <p style={{ color: "rgb(0, 171, 86)" }}>0 đ</p>
                           </div>
                        </div>

                        <div class="sc__info-order-total-cost">
                           <div class="sc__info-order-item">
                              <p>Tổng tiền</p>
                              <p>231.000 đ</p>
                           </div>
                        </div>

                        <Button
                           type="danger"
                           style={{
                              width: " 100%",
                              borderRadius: "4px",
                              fontWeight: "600",
                              marginTop: "8px",
                           }}
                        >
                           THANH TOÁN
                        </Button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};
