import {
   CheckCircleOutlined,
   CloseOutlined,
   DownOutlined,
   MailOutlined,
   RightOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Divider, Input } from "antd";
import React, { useEffect, useState } from "react";
import { ProductInCart } from "../../Component/productInCart/ProductInCart";
import { Atm } from "../../Layout/payment/atm/Atm";
import { Visa } from "../../Layout/payment/visa/Visa";
import "./ShoppingCart.css";
import { useDispatch, useSelector } from "react-redux";
import {
   getAllProductInCart,
   paymentOrders,
} from "../../reduxToolkit/thunk/productThunk";
import { productInCart } from "../../reduxToolkit/selector/productsSelector";
import { userInfo } from "../../reduxToolkit/selector/userSelector";
import { formatVND } from "../../service/formater";
export const ShoppingCart = () => {
   const [isShowCard, setIsShowCard] = useState(true);
   const [cardType, setIsCardType] = useState(-1);
   const [totalCost, setTotalCost] = useState({
      count: 0,
      totalPrice: 0,
      ship: 15000,
      total: 0,
   });

   const dispatch = useDispatch();
   const userDetail = useSelector(userInfo);
   const productsList = useSelector(productInCart);
   const cardTypeList = [
      {
         id: 0,
         img: `./images/logo-payment/unnamed.png`,
         name: "zalopay",
      },
      {
         id: 1,
         img: `./images/logo-payment/momo_icon_square_pinkbg.svg`,
         name: "momo",
      },
      {
         id: 2,
         img: `./images/logo-payment/visa.png`,
         name: "visa",
      },
      {
         id: 3,
         img: `./images/logo-payment/icon-payment-method-atm.svg`,
         name: "atm",
      },
   ];

   useEffect(() => {
      let temp = {
         count: 0,
         totalPrice: 0,
         ship: 15000,
         total: 0,
      };
      productsList.forEach((ele) => {
         temp.count += ele.quantity;
         temp.totalPrice += ele.quantity * ele.infoProduct.price;
         temp.total = temp.totalPrice + temp.ship;
      });
      temp.ship = 15000;

      setTotalCost(temp);
   }, [productsList]);

   useEffect(() => {
      dispatch(getAllProductInCart());
   }, []);

   const onChangeCardType = (key) => {
      if (key >= 0 && key <= 3) {
         setIsCardType(key);
      }
   };

   const onPaymentOrder = () => {
      if (cardType !== -1) {
         const temp = productsList.map((ele) => {
            return {
               idP: ele.infoProduct._id,
               name: ele.infoProduct.name,
               qty: ele.quantity,
               img: ele.infoProduct.brand.img,
               price: ele.infoProduct.price,
               effectiveDate: ele.infoProduct.effectiveDate,
               expirationDate: ele.infoProduct.expirationDate,
            };
         });

         console.log("temp", temp);
         dispatch(
            paymentOrders({
               userID: userDetail._id,
               phone: userDetail.phone,
               email: userDetail.email,
               address: userDetail.address,
               statusOrder: "newOrder",
               orderItems: temp,
               paymentType: cardTypeList[cardType].name,
            })
         );
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
                                 {/* <Checkbox></Checkbox>{" "} */}
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
                        {productsList.length > 0 &&
                           productsList.map((ele) => (
                              <>
                                 <ProductInCart
                                    productItem={ele}
                                 ></ProductInCart>
                                 <Divider style={{ margin: " 0px" }} />
                              </>
                           ))}
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
                              href="/accountDetail"
                              style={{
                                 color: "rgb(11, 116, 229)",
                              }}
                           >
                              Thay đổi
                           </a>
                        </div>
                        <div class="sc__info-user-content">
                           <div class="sc__info-user-content-item">
                              <p>
                                 {userDetail !== ""
                                    ? userDetail.name
                                    : "Không có"}{" "}
                              </p>{" "}
                              <div
                                 style={{
                                    fontWeight: "300",
                                    margin: "0px 8px",
                                    color: "rgb(128, 128, 137)",
                                 }}
                              >
                                 |
                              </div>{" "}
                              <p>
                                 {" "}
                                 {userDetail !== ""
                                    ? userDetail.phone
                                    : "Không có"}
                              </p>
                           </div>
                           <div class="sc__info-user-content-email">
                              <MailOutlined style={{ marginRight: "4px" }} />
                              <p>
                                 {" "}
                                 {userDetail !== ""
                                    ? userDetail.email
                                    : "Không có"}
                              </p>
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

                        {/* <div class="sc__info-user-discount-content">
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
                        </div> */}
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
                                 ({totalCost.count} sản phẩm)
                              </p>
                           </p>
                        </div>

                        <div class="sc__info-order-content">
                           <div class="sc__info-order-item">
                              <p class="sc__info-order-item-title">Tạm tính</p>
                              <p>{formatVND(totalCost.totalPrice)}</p>
                           </div>
                           <div class="sc__info-order-item">
                              <p class="sc__info-order-item-title">
                                 Phí dịch vụ
                              </p>
                              <p>{formatVND(totalCost.ship)}</p>
                           </div>
                           <div class="sc__info-order-item">
                              <p class="sc__info-order-item-title">Giảm giá</p>
                              <p style={{ color: "rgb(0, 171, 86)" }}>0 VND</p>
                           </div>
                        </div>

                        <div class="sc__info-order-total-cost">
                           <div class="sc__info-order-item">
                              <p>Tổng tiền</p>
                              <p>{formatVND(totalCost.total)}</p>
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
                           onClick={onPaymentOrder}
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
