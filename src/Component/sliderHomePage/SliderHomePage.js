import React, { useEffect, useRef, useState } from "react";

import { Button, Carousel } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
export const SliderHomePage = () => {
   const [sliderIndex, setSliderIndex] = useState(0);
   const refSlider = useRef();

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

   const arrayTemp = [0, 1, 2, 3, 4];
   return (
      <div class="homepage-slider">
         <Carousel
            dots={false}
            ref={refSlider}
            dotPosition="left"
            afterChange={onGotoSlider}
            autoplay
         >
            <div>
               <div class="homepage-slider__item">
                  <div class="homepage-slider__item-left">
                     <div class="homepage-product">
                        <div class="homepage-product_container">
                           <h1 class="homepage-product__name">Hallo</h1>
                           <p>
                              Với slogan "Có data, Tết đâu cũng là nhà", Viettel
                              triển khai chương trình tặng quà data cho 100%
                              khách hàng di động. Chỉ cần nhắn tin "TET" gửi
                              191, người dùng mạng Viettel sẽ được tặng lưu
                              lượng data 4G. Khách hàng có thể nhận lưu lượng
                              data là 7GB/7 ngày, 3GB/3 ngày hoặc 1 GB/1 ngày.
                           </p>
                           <div class="homepage-product__info">
                              <span style={{ fontWeight: "600" }}>
                                 Ngành hàng áp dụng:{" "}
                              </span>
                              dasdkjkasjdkajsd
                           </div>
                           <div class="homepage-product__info">
                              <span style={{ fontWeight: "600" }}>
                                 Thời gian hiệu lực :{" "}
                              </span>
                              dasdkjkasjdkajsd
                           </div>
                           <Button type="primary" style={{ marginTop: "16px" }}>
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

            <div>
               <div class="homepage-slider__item">
                  <div class="homepage-slider__item-left">
                     <div class="homepage-product">
                        <div class="homepage-product_container">
                           <h1 class="homepage-product__name">Hallo</h1>
                           <p>
                              Với slogan "Có data, Tết đâu cũng là nhà", Viettel
                              triển khai chương trình tặng quà data cho 100%
                              khách hàng di động. Chỉ cần nhắn tin "TET" gửi
                              191, người dùng mạng Viettel sẽ được tặng lưu
                              lượng data 4G. Khách hàng có thể nhận lưu lượng
                              data là 7GB/7 ngày, 3GB/3 ngày hoặc 1 GB/1 ngày.
                           </p>
                           <div class="homepage-product__info">
                              <span style={{ fontWeight: "600" }}>
                                 Ngành hàng áp dụng:{" "}
                              </span>
                              dasdkjkasjdkajsd
                           </div>
                           <div class="homepage-product__info">
                              <span style={{ fontWeight: "600" }}>
                                 Thời gian hiệu lực :{" "}
                              </span>
                              dasdkjkasjdkajsd
                           </div>
                           <Button type="primary" style={{ marginTop: "16px" }}>
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
            <div>
               <div class="homepage-slider__item">
                  <div class="homepage-slider__item-left">
                     <div class="homepage-product">
                        <div class="homepage-product_container">
                           <h1 class="homepage-product__name">Hallo</h1>
                           <p>
                              Với slogan "Có data, Tết đâu cũng là nhà", Viettel
                              triển khai chương trình tặng quà data cho 100%
                              khách hàng di động. Chỉ cần nhắn tin "TET" gửi
                              191, người dùng mạng Viettel sẽ được tặng lưu
                              lượng data 4G. Khách hàng có thể nhận lưu lượng
                              data là 7GB/7 ngày, 3GB/3 ngày hoặc 1 GB/1 ngày.
                           </p>
                           <div class="homepage-product__info">
                              <span style={{ fontWeight: "600" }}>
                                 Ngành hàng áp dụng:{" "}
                              </span>
                              dasdkjkasjdkajsd
                           </div>
                           <div class="homepage-product__info">
                              <span style={{ fontWeight: "600" }}>
                                 Thời gian hiệu lực :{" "}
                              </span>
                              dasdkjkasjdkajsd
                           </div>
                           <Button type="primary" style={{ marginTop: "16px" }}>
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
            <div>
               <div class="homepage-slider__item">
                  <div class="homepage-slider__item-left">
                     <div class="homepage-product">
                        <div class="homepage-product_container">
                           <h1 class="homepage-product__name">Hallo</h1>
                           <p>
                              Với slogan "Có data, Tết đâu cũng là nhà", Viettel
                              triển khai chương trình tặng quà data cho 100%
                              khách hàng di động. Chỉ cần nhắn tin "TET" gửi
                              191, người dùng mạng Viettel sẽ được tặng lưu
                              lượng data 4G. Khách hàng có thể nhận lưu lượng
                              data là 7GB/7 ngày, 3GB/3 ngày hoặc 1 GB/1 ngày.
                           </p>
                           <div class="homepage-product__info">
                              <span style={{ fontWeight: "600" }}>
                                 Ngành hàng áp dụng:{" "}
                              </span>
                              dasdkjkasjdkajsd
                           </div>
                           <div class="homepage-product__info">
                              <span style={{ fontWeight: "600" }}>
                                 Thời gian hiệu lực :{" "}
                              </span>
                              dasdkjkasjdkajsd
                           </div>
                           <Button type="primary" style={{ marginTop: "16px" }}>
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
            <div>
               <div class="homepage-slider__item">
                  <div class="homepage-slider__item-left">
                     <div class="homepage-product">
                        <div class="homepage-product_container">
                           <h1 class="homepage-product__name">Hallo</h1>
                           <p>
                              Với slogan "Có data, Tết đâu cũng là nhà", Viettel
                              triển khai chương trình tặng quà data cho 100%
                              khách hàng di động. Chỉ cần nhắn tin "TET" gửi
                              191, người dùng mạng Viettel sẽ được tặng lưu
                              lượng data 4G. Khách hàng có thể nhận lưu lượng
                              data là 7GB/7 ngày, 3GB/3 ngày hoặc 1 GB/1 ngày.
                           </p>
                           <div class="homepage-product__info">
                              <span style={{ fontWeight: "600" }}>
                                 Ngành hàng áp dụng:{" "}
                              </span>
                              dasdkjkasjdkajsd
                           </div>
                           <div class="homepage-product__info">
                              <span style={{ fontWeight: "600" }}>
                                 Thời gian hiệu lực :{" "}
                              </span>
                              dasdkjkasjdkajsd
                           </div>
                           <Button type="primary" style={{ marginTop: "16px" }}>
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
            <div>
               <div class="homepage-slider__item">
                  <div class="homepage-slider__item-left">
                     <div class="homepage-product">
                        <div class="homepage-product_container">
                           <h1 class="homepage-product__name">Hallo</h1>
                           <p>
                              Với slogan "Có data, Tết đâu cũng là nhà", Viettel
                              triển khai chương trình tặng quà data cho 100%
                              khách hàng di động. Chỉ cần nhắn tin "TET" gửi
                              191, người dùng mạng Viettel sẽ được tặng lưu
                              lượng data 4G. Khách hàng có thể nhận lưu lượng
                              data là 7GB/7 ngày, 3GB/3 ngày hoặc 1 GB/1 ngày.
                           </p>
                           <div class="homepage-product__info">
                              <span style={{ fontWeight: "600" }}>
                                 Ngành hàng áp dụng:{" "}
                              </span>
                              dasdkjkasjdkajsd
                           </div>
                           <div class="homepage-product__info">
                              <span style={{ fontWeight: "600" }}>
                                 Thời gian hiệu lực :{" "}
                              </span>
                              dasdkjkasjdkajsd
                           </div>
                           <Button type="primary" style={{ marginTop: "16px" }}>
                              Xem chi tiết
                           </Button>
                        </div>
                     </div>
                  </div>
                  <div class="homepage-slider__item-right">
                     <img
                        src="./images/1bbe9d84909f68214f5853c740e24e06.jpg"
                        alt="banner-voucher.png"
                     ></img>
                  </div>
               </div>
            </div>
         </Carousel>

         {/* style dot carousel */}
         <div class="homepage-carousel__dot-style">
            <div class="homepage-carousel__dot-btn" onClick={onPrevSlider}>
               <UpOutlined />
            </div>
            <div class="homepage-carousel__dot-item">
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
            <div class="homepage-carousel__dot-btn" onClick={onNextSlider}>
               <DownOutlined />
            </div>
         </div>
      </div>
   );
};
