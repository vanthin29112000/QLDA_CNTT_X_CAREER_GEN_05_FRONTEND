import React, { useEffect, useRef, useState } from "react";

import { Button, Carousel } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { productSliderList } from "../../reduxToolkit/selector/productsSelector";
import { formatDate } from "../../service/formater";
export const SliderHomePage = () => {
   const [sliderIndex, setSliderIndex] = useState(0);
   const refSlider = useRef();

   const products = useSelector(productSliderList);

   useEffect(() => {
      console.log("products", products);
   }, [products]);

   const onNextSlider = () => {
      if (sliderIndex < 4) {
         setSliderIndex(sliderIndex + 1);
      } else {
         setSliderIndex(0);
      }
   };

   const onPrevSlider = () => {
      if (sliderIndex > 0) {
         setSliderIndex(sliderIndex - 1);
      } else {
         setSliderIndex(4);
      }
   };

   const onGotoSlider = (index) => {
      setSliderIndex(index);
   };

   useEffect(() => {
      refSlider.current.goTo(sliderIndex);
   }, [sliderIndex]);

   return (
      <>
         <div class="homepage-slider">
            <Carousel
               dots={false}
               ref={refSlider}
               dotPosition="left"
               afterChange={onGotoSlider}
               autoplay
            >
               {products.length > 0 &&
                  products.map((ele, index) => (
                     <div key={index}>
                        <div class="homepage-slider__item">
                           <div class="homepage-slider__item-left">
                              <div class="homepage-product">
                                 <div class="homepage-product_container">
                                    <h1 class="homepage-product__name">
                                       {ele.name}
                                    </h1>
                                    <p>{ele.desc}</p>
                                    <div class="homepage-product__info">
                                       <span style={{ fontWeight: "600" }}>
                                          Ngành hàng áp dụng:{" "}
                                       </span>
                                       {ele.category[0]}
                                    </div>
                                    <div class="homepage-product__info">
                                       <span style={{ fontWeight: "600" }}>
                                          Thời gian hiệu lực :{" "}
                                       </span>
                                       {formatDate(ele.expirationDate)}
                                    </div>
                                    <Button
                                       type="primary"
                                       style={{ marginTop: "16px" }}
                                    >
                                       Xem chi tiết
                                    </Button>
                                 </div>
                              </div>
                           </div>
                           <div class="homepage-slider__item-right">
                              <img
                                 src=".\images\1bbe9d84909f68214f5853c740e24e06.jpg"
                                 alt="banner-voucher.png"
                              ></img>
                           </div>
                        </div>
                     </div>
                  ))}
            </Carousel>

            {/* style dot carousel */}
            <div class="homepage-carousel__dot-style">
               <div class="homepage-carousel__dot-btn" onClick={onPrevSlider}>
                  <UpOutlined />
               </div>
               <div class="homepage-carousel__dot-item">
                  {products.length > 0 &&
                     products.map((ele, index) =>
                        index === sliderIndex ? (
                           <div
                              class="carousel__dot-style carousel__dot-active"
                              key={index}
                              onClick={() => {
                                 onGotoSlider(index);
                              }}
                           ></div>
                        ) : (
                           <div
                              class="carousel__dot-style "
                              key={index}
                              onClick={() => {
                                 onGotoSlider(index);
                              }}
                           ></div>
                        )
                     )}
               </div>
               <div class="homepage-carousel__dot-btn" onClick={onNextSlider}>
                  <DownOutlined />
               </div>
            </div>
         </div>
      </>
   );
};
