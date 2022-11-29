import {
   LeftOutlined,
   RightOutlined,
   ShoppingCartOutlined,
} from "@ant-design/icons";
import { Button, Carousel, InputNumber, Tabs } from "antd";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { productDetail } from "../../reduxToolkit/selector/productsSelector";
import { getProductByID } from "../../reduxToolkit/thunk/productThunk";
import { formatDate, formatVND } from "../../service/formater";
import "./ProductDetail.css";
export const ProductDetail = () => {
   const [qtyProduct, setQtyProduct] = useState(1);
   const [imgActive, setImgActive] = useState(0);
   const [tempImg, setTempImg] = useState([]);
   const params = useParams();
   const dispatch = useDispatch();
   const productInfo = useSelector(productDetail);

   useEffect(() => {
      const id = params.id;
      console.log("id", id);
      dispatch(getProductByID(id));

      if (productInfo.length > 0) {
         setTempImg([
            productInfo[0].brand.img,
            // productInfo[0].image.main,
            // productInfo[0].image.more,
         ]);
      }
   }, []);

   const handleQtyProduct = (key) => {
      switch (key) {
         case 0: {
            if (qtyProduct > 1) {
               setQtyProduct(qtyProduct - 1);
            }
            break;
         }

         case 1: {
            if (qtyProduct < productInfo[0].countInStock) {
               setQtyProduct(qtyProduct + 1);
            }
            break;
         }

         default: {
            break;
         }
      }
   };

   return (
      <>
         {productInfo.length > 0 && (
            <div class="product-detail__container">
               <div class="product-detail__bg">
                  <div class="product-detail__top row g-0">
                     <div
                        class="col-12 col-md-5 col-lg-5 col-xl-4 product-detail__left"
                        style={{ padding: "16px" }}
                     >
                        <img
                           src={productInfo[0].brand.img}
                           class="product-detail__left-img"
                           alt="logo.png"
                        ></img>

                        <div
                           class="product-detail__left-carousel"
                           style={{ position: "relative" }}
                        >
                           <div class="product-detail__left-carousel-button product-detail__left-carousel-button-left">
                              <div class="product-detail__left-carousel-button-bg ">
                                 <LeftOutlined />
                              </div>
                           </div>
                           <div class="product-detail__left-carousel-button product-detail__left-carousel-button-right">
                              <div class="product-detail__left-carousel-button-bg ">
                                 <RightOutlined />
                              </div>
                           </div>
                           <div class="row g-2">
                              {tempImg.length > 0 &&
                                 tempImg.map((ele, index) =>
                                    index === imgActive ? (
                                       <div
                                          class="col-3 col-md-3 col-lg-3 col-xl-3 product-detail__left-img-item "
                                          key={index}
                                       >
                                          <img
                                             src={ele}
                                             alt=".png"
                                             style={{
                                                border: "2px solid #1890ff",
                                             }}
                                          ></img>
                                       </div>
                                    ) : (
                                       <div
                                          class="col-3 col-md-3 col-lg-3 col-xl-3 product-detail__left-img-item "
                                          key={ele.id}
                                          onClick={() => {
                                             setImgActive(index);
                                          }}
                                       >
                                          <img src={ele.img} alt=".png"></img>
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
                              {productInfo[0].brand.name}
                           </p>
                        </p>

                        <div class="product-detail__right-name-product-timeline">
                           <p class="product-detail__right-name-product">
                              {productInfo[0].name}
                           </p>
                        </div>

                        <div class="product-detail__right-price-bg">
                           <p class="product-detail__right-price">
                              {formatVND(productInfo[0].price)}
                           </p>
                        </div>

                        <div class="product-detail__right-content-bg">
                           <p class="">{productInfo[0].desc}</p>
                           <p class="product-detail__right-timeline">
                              Voucher áp dụng :{" "}
                              {formatDate(productInfo[0].effectiveDate)} -{" "}
                              {formatDate(productInfo[0].expirationDate)}
                           </p>
                        </div>

                        <div class="product-detail__right-amount-bg">
                           <p class="product-detail__right-amount-title">
                              Số lượng
                           </p>
                           <div class="product-detail__right-amount">
                              <button
                                 class="product-detail__right-amount-button"
                                 onClick={() => {
                                    handleQtyProduct(0);
                                 }}
                              >
                                 {" "}
                                 -{" "}
                              </button>
                              <InputNumber
                                 controls={false}
                                 max={productInfo[0].countInStock}
                                 value={qtyProduct}
                                 style={{
                                    height: "32px",
                                    width: "50px",
                                    borderLeft: "none",
                                    borderRight: "none",
                                    textAlignLast: "center",
                                    fontSize: "1.2em",
                                 }}
                              />
                              <button
                                 class="product-detail__right-amount-button"
                                 onClick={() => {
                                    handleQtyProduct(1);
                                 }}
                              >
                                 {" "}
                                 +{" "}
                              </button>

                              <p class="product-detail__right-qty">
                                 ( Còn {productInfo[0].countInStock} voucher )
                              </p>
                           </div>
                        </div>

                        <div class="product-detail__right-button">
                           <Button
                              type="primary"
                              danger
                              style={{
                                 height: "48px",
                                 backgroundColor: "rgba(241,180,187,.1628)",
                                 color: "#d0011b",
                                 display: "flex",
                                 alignItems: "center",
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
                           >
                              Mua ngay
                           </Button>
                        </div>
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
                           Content of Tab Pane 1
                        </Tabs.TabPane>
                        <Tabs.TabPane
                           tab="Điều khoản & điều kiện"
                           key="2"
                           style={{ fontWeight: "400" }}
                        >
                           Content of Tab Pane 2
                        </Tabs.TabPane>
                     </Tabs>
                  </div>
               </div>
            </div>
         )}
      </>
   );
};
