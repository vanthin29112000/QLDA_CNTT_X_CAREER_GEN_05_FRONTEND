import React, { useEffect, useRef, useState } from "react";
import { Carousel } from "antd";
import {
   DownOutlined,
   LeftOutlined,
   RightOutlined,
   UpOutlined,
} from "@ant-design/icons";
import { Product } from "../../Component/product/Product";
import { useDispatch, useSelector } from "react-redux";
import { getProductByID } from "../../reduxToolkit/thunk/productThunk";
import { productDetail } from "../../reduxToolkit/selector/productsSelector";
export const FeaturedProduct = () => {
   const dispatch = useDispatch();
   const productItem = useSelector(productDetail);
   const [sliderIndex, setSliderIndex] = useState(0);

   const refSlider = useRef();

   const onNextSlider = () => {
      if (sliderIndex < 1) {
         setSliderIndex(sliderIndex + 1);
      } else {
         setSliderIndex(0);
      }
   };

   const onPrevSlider = () => {
      if (sliderIndex > 0) {
         setSliderIndex(sliderIndex - 1);
      } else {
         setSliderIndex(1);
      }
   };

   const onGotoSlider = (index) => {
      setSliderIndex(index);
   };

   useEffect(() => {
      refSlider.current.goTo(sliderIndex);
   }, [sliderIndex]);

   useEffect(() => {
      dispatch(getProductByID("6425b85c6fc2dc2afc6db486"));
      console.log("homepage");
   }, []);

   const contentStyle = {
      height: "100%",
      color: "#fff",
      lineHeight: "160px",
      textAlign: "center",
      background: "#364d79",
   };

   const arrayTemp = [0, 1];

   return (
      <div>
         <div class="featured-product">
            <h3 style={{ marginLeft: "8px" }}>Sản phẩm nổi bật</h3>

            <div class="featured-product__container">
               <div
                  class="homepage-carousel__dot-btn "
                  onClick={() => {
                     onPrevSlider();
                  }}
               >
                  <LeftOutlined />
               </div>
               <div class="featured-product__carousel">
                  <Carousel dotPosition={"bottom"} dots={false} ref={refSlider}>
                     <div>
                        <div class="featured-product__carousel-item">
                           <div class="featured-product__carousel-product">
                              {productItem !== "" && (
                                 <Product product={productItem}></Product>
                              )}
                           </div>
                           <div class="featured-product__carousel-product">
                              {productItem !== "" && (
                                 <Product product={productItem}></Product>
                              )}
                           </div>
                           <div class="featured-product__carousel-product">
                              {productItem !== "" && (
                                 <Product product={productItem}></Product>
                              )}
                           </div>
                        </div>
                     </div>
                     <div>
                        <h3 style={contentStyle}>3</h3>
                     </div>
                  </Carousel>
               </div>
               <div
                  class="homepage-carousel__dot-btn "
                  onClick={() => {
                     onNextSlider();
                  }}
               >
                  <RightOutlined />
               </div>

               <div class="featured-carousel__dot-item">
                  {arrayTemp.length > 0 &&
                     arrayTemp.map((ele, index) =>
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
            </div>
         </div>
      </div>
   );
};
