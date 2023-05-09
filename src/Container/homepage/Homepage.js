import React, { useEffect } from "react";
import "./Homepage.css";
import { SliderHomePage } from "../../Component/sliderHomePage/SliderHomePage";
import { FeaturedProduct } from "./FeaturedProduct";
import { Button, Carousel, Skeleton } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
   getProductSlider,
   getProductSpecial,
   getProductSpecialOffer,
} from "../../reduxToolkit/thunk/productThunk";
import { productSpecialOfferListFormat } from "../../reduxToolkit/selector/productsSelector";
import { formatDate } from "../../service/formater";
import { useNavigate } from "react-router-dom";
import { getLatestNews } from "../../reduxToolkit/thunk/newsThunk";
import { latestNewsList } from "../../reduxToolkit/selector/newsSelector";
export const Homepage = () => {
   const products = useSelector(productSpecialOfferListFormat);
   const news = useSelector(latestNewsList);

   const dispatch = useDispatch();
   const navigate = useNavigate();

   useEffect(() => {
      dispatch(getProductSlider());
      dispatch(getProductSpecial());
      dispatch(getProductSpecialOffer());
      dispatch(getLatestNews());
   }, []);

   return (
      <div style={{ paddingBottom: "32px" }}>
         <SliderHomePage></SliderHomePage>

         <div class="container">
            <FeaturedProduct></FeaturedProduct>
         </div>
         <div class="special-offer">
            <img
               src=".\images\a55f4e865ef275ca259fb01a5fd8215a.jpg"
               alt=".png"
            ></img>
            <div class="special-offer__container">
               <div style={{ width: "100%" }}>
                  <h2>Ưu đãi dành cho bạn</h2>
                  {/* <p style={{ color: "grey" }}>Nhanh tay dùng ngay kẻo hết </p> */}
                  <div class="special-offer__product">
                     <Carousel dotPosition={"bottom"} dot={false} autoplay>
                        {products.length > 0 &&
                           products.map((productsList) => (
                              <div>
                                 <div class="special-offer__product-list">
                                    {productsList.map((ele) => (
                                       <div class="special-offer__product-item">
                                          <div class="special-offer__brand">
                                             <img src={ele.brand.img}></img>
                                          </div>
                                          <div>
                                             <h6 class="special-offer__product-name">
                                                {ele.name}
                                             </h6>
                                             <p>
                                                HSD :{" "}
                                                {formatDate(ele.expirationDate)}
                                             </p>
                                             <Button
                                                type="danger"
                                                onClick={() => {
                                                   navigate(
                                                      `/product/${ele._id}`
                                                   );
                                                }}
                                             >
                                                Xem ngay
                                             </Button>
                                          </div>
                                       </div>
                                    ))}
                                 </div>
                              </div>
                           ))}
                     </Carousel>
                  </div>
               </div>
            </div>
         </div>

         <div class="container">
            <div class="home-latest-news">
               <h2>Tin tức mới nhất</h2>

               <div class="row home-latest-news__container g-2">
                  {news.length > 0 &&
                     news.map((ele, index) => (
                        <div class={index >= 3 ? "col-3" : "col-6"}>
                           <div class=" home-latest-news__item ">
                              <div class="home-latest-news__info">
                                 <img src={ele.imgThumbnail} alt=".png"></img>
                                 <div class="home-latest-news__info-item">
                                    <div class="home-latest-news__detail">
                                       <h4>{ele.title}</h4>
                                       <Button
                                          type="primary"
                                          style={{
                                             display: "flex",
                                             alignItems: "center",
                                          }}
                                          onClick={() => {
                                             navigate(`/news/${ele._id}`);
                                          }}
                                       >
                                          Xem chi tiết <RightOutlined />
                                       </Button>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     ))}
               </div>
            </div>
         </div>
      </div>
   );
};
