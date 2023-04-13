import React, { useEffect } from "react";
import "./Homepage.css";
import { SliderHomePage } from "../../Component/sliderHomePage/SliderHomePage";
import { FeaturedProduct } from "./FeaturedProduct";
import { Button, Carousel } from "antd";
import { RightOutlined } from "@ant-design/icons";
export const Homepage = () => {
   const contentStyle = {
      height: "228px",
      color: "#fff",
      lineHeight: "228px",
      textAlign: "center",
      background: "#364d79",
   };

   return (
      <div>
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
                     <Carousel dotPosition={"bottom"} dot={false}>
                        <div>
                           <div class="special-offer__product-list">
                              <div class="special-offer__product-item">
                                 <div class="special-offer__brand">
                                    <img src=".\images\brand-item\ma-giam-gia-shopee.webp"></img>
                                 </div>
                                 <div>
                                    <h6 class="special-offer__product-name">
                                       Voucher giảm 50% cho đơn hàng 30k
                                    </h6>
                                    <p>HSD : 30/04/2023</p>
                                    <Button type="danger">Xem ngay</Button>
                                 </div>
                              </div>
                              <div class="special-offer__product-item">
                                 <div class="special-offer__brand">
                                    <img src=".\images\brand-item\ma-giam-gia-shopee.webp"></img>
                                 </div>
                                 <div>
                                    <h6>Voucher giảm 50% cho đơn hàng 30k</h6>
                                    <p>HSD : 30/04/2023</p>
                                    <Button type="danger">Xem ngay</Button>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div>
                           <div class="special-offer__product-list">
                              <div class="special-offer__product-item">
                                 <div class="special-offer__brand">
                                    <img src=".\images\brand-item\ma-giam-gia-shopee.webp"></img>
                                 </div>
                                 <div>
                                    <h6>Voucher giảm 50% cho đơn hàng 30k</h6>
                                    <p>HSD : 30/04/2023</p>
                                    <Button type="danger">Xem ngay</Button>
                                 </div>
                              </div>
                              <div class="special-offer__product-item">
                                 <div class="special-offer__brand">
                                    <img src=".\images\brand-item\ma-giam-gia-shopee.webp"></img>
                                 </div>
                                 <div>
                                    <h6>Voucher giảm 50% cho đơn hàng 30k</h6>
                                    <p>HSD : 30/04/2023</p>
                                    <Button type="danger">Xem ngay</Button>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </Carousel>
                  </div>
               </div>
            </div>
         </div>

         <div class="container">
            <div class="home-latest-news">
               <h2>Tin tức mới nhất</h2>

               <div class="row home-latest-news__container g-2">
                  <div class=" col-6">
                     <div class=" home-latest-news__item ">
                        <div class="home-latest-news__info">
                           <img
                              src="https://firebasestorage.googleapis.com/v0/b/x-career-05-project-final.appspot.com/o/imgThumbnail%2Fhjghj.jpg?alt=media&token=23940cde-751b-455b-9d8b-96c434ac5369"
                              alt=".png"
                           ></img>
                           <div class="home-latest-news__info-item">
                              <div class="home-latest-news__detail">
                                 <h4>
                                    Xóa bỏ rào cản ngôn ngữ với mẹo dịch bất kỳ
                                    ngôn ngữ nào xuất hiện trên 1 tấm hình bằng
                                    Google Dịch.
                                 </h4>
                                 <Button
                                    type="primary"
                                    style={{
                                       display: "flex",
                                       alignItems: "center",
                                    }}
                                 >
                                    Xem chi tiết <RightOutlined />
                                 </Button>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div class=" col-6">
                     <div class=" home-latest-news__item ">
                        <div class="home-latest-news__info">
                           <img
                              src="https://firebasestorage.googleapis.com/v0/b/x-career-05-project-final.appspot.com/o/imgThumbnail%2Fhjghj.jpg?alt=media&token=23940cde-751b-455b-9d8b-96c434ac5369"
                              alt=".png"
                           ></img>
                           <div class="home-latest-news__info-item">
                              <div class="home-latest-news__detail">
                                 <h4>
                                    Xóa bỏ rào cản ngôn ngữ với mẹo dịch bất kỳ
                                    ngôn ngữ nào xuất hiện trên 1 tấm hình bằng
                                    Google Dịch.
                                 </h4>
                                 <Button
                                    type="primary"
                                    style={{
                                       display: "flex",
                                       alignItems: "center",
                                    }}
                                 >
                                    Xem chi tiết <RightOutlined />
                                 </Button>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class=" col-6">
                     <div class=" home-latest-news__item ">
                        <div class="home-latest-news__info">
                           <img
                              src="https://firebasestorage.googleapis.com/v0/b/x-career-05-project-final.appspot.com/o/imgThumbnail%2Fhjghj.jpg?alt=media&token=23940cde-751b-455b-9d8b-96c434ac5369"
                              alt=".png"
                           ></img>
                           <div class="home-latest-news__info-item">
                              <div class="home-latest-news__detail">
                                 <h4>
                                    Xóa bỏ rào cản ngôn ngữ với mẹo dịch bất kỳ
                                    ngôn ngữ nào xuất hiện trên 1 tấm hình bằng
                                    Google Dịch.
                                 </h4>
                                 <Button
                                    type="primary"
                                    style={{
                                       display: "flex",
                                       alignItems: "center",
                                    }}
                                 >
                                    Xem chi tiết <RightOutlined />
                                 </Button>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div class=" col-3">
                     <div class=" home-latest-news__item ">
                        <div class="home-latest-news__info">
                           <img
                              src="https://firebasestorage.googleapis.com/v0/b/x-career-05-project-final.appspot.com/o/imgThumbnail%2Fhjghj.jpg?alt=media&token=23940cde-751b-455b-9d8b-96c434ac5369"
                              alt=".png"
                           ></img>
                           <div class="home-latest-news__info-item">
                              <div class="home-latest-news__detail">
                                 <h4>
                                    Xóa bỏ rào cản ngôn ngữ với mẹo dịch bất kỳ
                                    ngôn ngữ nào xuất hiện trên 1 tấm hình bằng
                                    Google Dịch.
                                 </h4>
                                 <Button
                                    type="primary"
                                    style={{
                                       display: "flex",
                                       alignItems: "center",
                                    }}
                                 >
                                    Xem chi tiết <RightOutlined />
                                 </Button>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class=" col-3">
                     <div class=" home-latest-news__item ">
                        <div class="home-latest-news__info">
                           <img
                              src="https://firebasestorage.googleapis.com/v0/b/x-career-05-project-final.appspot.com/o/imgThumbnail%2Fhjghj.jpg?alt=media&token=23940cde-751b-455b-9d8b-96c434ac5369"
                              alt=".png"
                           ></img>
                           <div class="home-latest-news__info-item">
                              <div class="home-latest-news__detail">
                                 <h4>
                                    Xóa bỏ rào cản ngôn ngữ với mẹo dịch bất kỳ
                                    ngôn ngữ nào xuất hiện trên 1 tấm hình bằng
                                    Google Dịch.
                                 </h4>
                                 <Button
                                    type="primary"
                                    style={{
                                       display: "flex",
                                       alignItems: "center",
                                    }}
                                 >
                                    Xem chi tiết <RightOutlined />
                                 </Button>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};
