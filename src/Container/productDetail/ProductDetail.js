import {
   LeftOutlined,
   RightOutlined,
   ShoppingCartOutlined,
} from "@ant-design/icons";
import { Button, Carousel, InputNumber, Tabs } from "antd";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import parse from "html-react-parser";

import { HandleAmount } from "../../Layout/handleAmount/HandleAmount";
import { productDetailItem } from "../../reduxToolkit/selector/productsSelector";
import {
   addProductInCart,
   getProductByID,
   updateProductInCart,
} from "../../reduxToolkit/thunk/productThunk";
import { formatDate, formatVND } from "../../service/formater";
import "./ProductDetail.css";
export const ProductDetail = () => {
   const params = useParams();
   const dispatch = useDispatch();
   const productInfo = useSelector(productDetailItem);
   const navigate = useNavigate();
   const [qtyProduct, setQtyProduct] = useState(1);
   const [imgActive, setImgActive] = useState(0);
   const [tempImg, setTempImg] = useState([]);

   useEffect(() => {
      const id = params.id;
      dispatch(getProductByID(id));
   }, []);

   useEffect(() => {
      console.log("product ", productInfo);

      if (productInfo) {
         setTempImg([productInfo.brand.img, ...productInfo.images]);
         console.log("image", tempImg);
      }
   }, [productInfo]);

   const onAddProductInCart = (id) => {
      dispatch(addProductInCart({ id: id, quantity: qtyProduct }));
   };

   return (
      <>
         {!!productInfo && (
            <div class="product-detail__container">
               <div class="product-detail__bg">
                  <div class="product-detail__top row g-0">
                     <div
                        class="col-12 col-md-5 col-lg-5 col-xl-4 product-detail__left"
                        style={{ padding: "16px" }}
                     >
                        <div class="product-detail__left-img-contain">
                           <div class="product-detail__left-img-content">
                              <img
                                 src={tempImg[imgActive]}
                                 class="product-detail__left-img"
                                 alt="logo.png"
                              ></img>
                           </div>
                        </div>

                        <div
                           class="product-detail__left-carousel"
                           style={{ position: "relative" }}
                        >
                           <div class="product-detail__left-carousel-button product-detail__left-carousel-button-left">
                              <div
                                 class="product-detail__left-carousel-button-bg "
                                 // onClick={() => {
                                 //    handleSlideShow("down");
                                 // }}
                              >
                                 <LeftOutlined />
                              </div>
                           </div>
                           <div class="product-detail__left-carousel-button product-detail__left-carousel-button-right">
                              <div
                                 class="product-detail__left-carousel-button-bg "
                                 // onClick={() => {
                                 //    handleSlideShow("up");
                                 // }}
                              >
                                 <RightOutlined />
                              </div>
                           </div>
                           <div class="product-detail__left-carousel-list-img">
                              {tempImg.length > 0 &&
                                 tempImg.map((ele, index) =>
                                    index === imgActive ? (
                                       <div
                                          class="product-detail__left-img-item"
                                          key={index}
                                       >
                                          <div class="product-detail__left-img-item-content">
                                             <img
                                                src={ele}
                                                alt=".png"
                                                // style={{
                                                //    border: "2px solid #1890ff",
                                                // }}
                                             ></img>
                                          </div>
                                       </div>
                                    ) : (
                                       <div
                                          class="product-detail__left-img-item"
                                          key={index}
                                          onClick={() => {
                                             setImgActive(index);
                                          }}
                                       >
                                          <div class="product-detail__left-img-item-content">
                                             <img src={ele} alt=".png"></img>
                                          </div>
                                       </div>
                                    )
                                 )}
                           </div>
                        </div>
                     </div>
                     <div
                        class="col-12 col-md-7 col-lg-7 col-xl-8 product-detail__right"
                        style={{ padding: "16px" }}
                     >
                        <p class="product-detail__right-brand">
                           Thương hiệu :
                           <p class="product-detail__right-brand-item">
                              {productInfo.brand.name}
                           </p>
                        </p>

                        <div class="product-detail__right-name-product-timeline">
                           <p class="product-detail__right-name-product">
                              {productInfo.name}
                           </p>
                        </div>

                        <div class="product-detail__right-price-bg">
                           <p class="product-detail__right-price">
                              {formatVND(productInfo.price)}
                           </p>
                        </div>

                        <div class="product-detail__right-content-bg">
                           <p class="">{parse(productInfo.desc)}</p>
                           <p class="product-detail__right-timeline">
                              Voucher áp dụng :{" "}
                              {formatDate(productInfo.effectiveDate)} -{" "}
                              {formatDate(productInfo.expirationDate)}
                           </p>
                        </div>
                        {productInfo.countInStock - productInfo.countSold !==
                        0 ? (
                           <>
                              <div class="product-detail__right-amount-bg">
                                 <p class="product-detail__right-amount-title">
                                    Số lượng
                                 </p>
                                 <div class="product-detail__right-amount">
                                    <HandleAmount
                                       max={
                                          productInfo.countInStock -
                                          productInfo.countSold
                                       }
                                       value={qtyProduct}
                                       setValue={setQtyProduct}
                                    ></HandleAmount>

                                    <p class="product-detail__right-qty">
                                       ( Còn{" "}
                                       {productInfo.countInStock -
                                          productInfo.countSold}{" "}
                                       voucher )
                                    </p>
                                 </div>
                              </div>

                              <div class="product-detail__right-button">
                                 <Button
                                    type="primary"
                                    danger
                                    style={{
                                       height: "48px",
                                       backgroundColor:
                                          "rgba(241,180,187,.1628)",
                                       color: "#d0011b",
                                       display: "flex",
                                       alignItems: "center",
                                    }}
                                    onClick={() => {
                                       onAddProductInCart(productInfo._id);
                                    }}
                                 >
                                    <ShoppingCartOutlined />
                                    Thêm vào giỏ hàng
                                 </Button>
                                 <Button
                                    type="primary"
                                    danger
                                    style={{
                                       height: "48px",
                                       // backgroundColor: "rgba(241,180,187,.1628)",
                                       // color: "#d0011b",
                                       display: "flex",
                                       alignItems: "center",
                                       margin: "0px 8px",
                                    }}
                                    onClick={() => {
                                       onAddProductInCart(productInfo._id);
                                       navigate("/cart");
                                    }}
                                 >
                                    Mua ngay
                                 </Button>
                              </div>
                           </>
                        ) : (
                           <h3 style={{ color: "red", padding: "16px" }}>
                              Hết hàng
                           </h3>
                        )}
                     </div>
                  </div>

                  <div
                     class="product-detail__tab row g-0"
                     style={{ marginTop: "16px" }}
                  >
                     <Tabs defaultActiveKey="1" style={{ fontWeight: "500" }}>
                        <Tabs.TabPane
                           tab="Hướng dẫn"
                           key="1"
                           style={{ fontWeight: "400" }}
                        >
                           {parse(productInfo.userManual)}
                        </Tabs.TabPane>
                        <Tabs.TabPane
                           tab="Điều khoản & điều kiện"
                           key="2"
                           style={{ fontWeight: "400" }}
                        >
                           {parse(productInfo.rules)}
                        </Tabs.TabPane>
                     </Tabs>
                  </div>
               </div>
            </div>
         )}
      </>
   );
};
