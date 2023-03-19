import { Avatar, Carousel } from "antd";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pageNews, type } from "../../reduxToolkit/selector/newsSelector";
import { getAllNews } from "../../reduxToolkit/thunk/newsThunk";
import parse from "html-react-parser";
// import { NewDetail } from "../../Component/newDetail/NewDetail";
import "./News.css";
import { useNavigate } from "react-router-dom";
export const News = () => {
   const refPopular = useRef();
   const refNews = useRef();

   const dispatch = useDispatch();
   const navigate = useNavigate();
   const renderPageNews = useSelector(pageNews);
   const typeNew = type;

   useEffect(() => {
      dispatch(getAllNews());
   }, []);

   return (
      <div class="container  px-0">
         <Carousel autoplay autoplaySpeed={5000}>
            {renderPageNews.mostViewedNews.length > 0 &&
               renderPageNews.mostViewedNews.map((ele, index) => (
                  <div key={index} class="carousel-item__news-box">
                     <div class="carousel-item__news">
                        <img src={ele.imgThumbnail} alt=".png"></img>
                        <div class="carousel-item__content">
                           <div class="carousel-item__news-tag">
                              {typeNew[ele.type]}
                           </div>

                           <div>
                              <div
                                 class="carousel-item__news-title"
                                 onClick={() => {
                                    navigate(`${ele._id}`);
                                 }}
                              >
                                 {ele.title}
                              </div>

                              <div class="carousel-item__news-info">
                                 {parse(ele.content)}
                              </div>
                           </div>
                           <div class="carousel-item__news-footer">
                              {/* <div class="carousel-item__news-footer-account">
                                        <Avatar
                                           src={"./images/brand-item/logo-fahasha.webp"}
                                        />
                                        <p
                                           style={{
                                              margin: "0px",
                                              marginLeft: "4px",
                                              fontWeight: "500",
                                           }}
                                        >
                                           Fahasha
                                        </p>
                                     </div> */}
                              {/* <div style={{ margin: "0px 8px" }}> - </div> */}
                              <div class="carousel-item__news-footer-date-submitted">
                                 <i
                                    class="fa-regular fa-clock"
                                    style={{ marginRight: "4px" }}
                                 ></i>
                                 <div>12/05/2023</div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               ))}
            {/* <div>
               <h3 style={contentStyle}>2</h3>
            </div>
            <div>
               <h3 style={contentStyle}>3</h3>
            </div>
            <div>
               <h3 style={contentStyle}>4</h3>
            </div> */}
         </Carousel>
         <div class="list-news">
            <div class="list-news__left">
               <div class="box-news">
                  <div class="box-news__title">
                     <div class="box-news__title-item">
                        <div class="box-news__title-line"></div>
                        <div class="box-news__title-content">Tin nổi bật</div>
                     </div>

                     <div class="btn-carousel">
                        <button
                           onClick={() => {
                              console.log("previous");

                              refPopular.current.prev();
                           }}
                        >
                           <i class="fa-solid fa-chevron-left"></i>
                        </button>
                        <button
                           onClick={() => {
                              console.log("next", refPopular.current);

                              refPopular.current.next();
                           }}
                        >
                           <i class="fa-solid fa-chevron-right"></i>
                        </button>
                     </div>
                  </div>

                  <div class="list-news__list-card-box">
                     <Carousel dots={false} ref={refPopular}>
                        {renderPageNews.highlightsNews.length > 0 &&
                           renderPageNews.highlightsNews.map((ele, index) => (
                              <div key={index}>
                                 <div class="list-news__list-card">
                                    {ele.map((newItem, indexItem) => (
                                       <div
                                          class="list-new__card-item"
                                          key={indexItem}
                                       >
                                          <img
                                             src={newItem.imgThumbnail}
                                             alt="news.png"
                                          ></img>
                                          <div class="list-new__card-item-content">
                                             <div
                                                class="list-new__card-item-title"
                                                onClick={() => {
                                                   navigate(`${newItem._id}`);
                                                }}
                                             >
                                                {newItem.title}
                                             </div>
                                             <div class="list-new__card-item-footer">
                                                <div class="list-new__card-item-type">
                                                   {typeNew[newItem.type]}
                                                </div>
                                                <div class="list-new__card-item-timer">
                                                   <i
                                                      class="fa-regular fa-clock"
                                                      style={{
                                                         margin: "0px 4px",
                                                      }}
                                                   ></i>
                                                   <div>29/03/2023</div>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                    ))}
                                 </div>
                              </div>
                           ))}
                     </Carousel>
                  </div>
               </div>

               <div class="box-news" style={{ marginTop: "16px" }}>
                  <div class="box-news__title">
                     <div class="box-news__title-item">
                        <div class="box-news__title-line"></div>
                        <div class="box-news__title-content">Tin mới</div>
                     </div>

                     <div class="btn-carousel">
                        <button
                           onClick={() => {
                              refNews.current.prev();
                           }}
                        >
                           <i class="fa-solid fa-chevron-left"></i>
                        </button>
                        <button
                           onClick={() => {
                              refNews.current.next();
                           }}
                        >
                           <i class="fa-solid fa-chevron-right"></i>
                        </button>
                     </div>
                  </div>

                  <div class="list-news__list-card-box">
                     <Carousel dots={false} ref={refNews}>
                        {renderPageNews.latestNews.length > 0 &&
                           renderPageNews.latestNews.map((ele, index) => (
                              <div key={index}>
                                 <div class="list-news__list-card">
                                    {ele.map((newItem) => (
                                       <div class="list-new__card-item">
                                          <img
                                             src={newItem.imgThumbnail}
                                             alt="news.png"
                                          ></img>
                                          <div class="list-new__card-item-content">
                                             <div
                                                class="list-new__card-item-title"
                                                onClick={() => {
                                                   navigate(`${newItem._id}`);
                                                }}
                                             >
                                                {newItem.title}
                                             </div>
                                             <div class="list-new__card-item-footer">
                                                <div class="list-new__card-item-type">
                                                   {typeNew[newItem.type]}
                                                </div>
                                                <div class="list-new__card-item-timer">
                                                   <i
                                                      class="fa-regular fa-clock"
                                                      style={{
                                                         margin: "0px 4px",
                                                      }}
                                                   ></i>
                                                   <div>29/03/2023</div>
                                                </div>
                                             </div>
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

            <div class="list-news__right">
               <div class="promotion-infor">
                  <div class="promotion-infor__title">
                     <p>Khuyến mãi</p>
                  </div>

                  <div class="promotion-infor__list-news">
                     {renderPageNews.promotionNews.length > 0 &&
                        renderPageNews.promotionNews.map((ele, index) => (
                           <div class="promotion-infor__news-item">
                              <img src={ele.imgThumbnail} alt=".png"></img>
                              <div style={{ padding: "8px" }}>
                                 <div
                                    class="promotion-infor__news-content"
                                    onClick={() => {
                                       navigate(`${ele._id}`);
                                    }}
                                 >
                                    {ele.title}
                                 </div>
                                 <div class="promotion-infor__news-infor">
                                    {parse(ele.content)}
                                 </div>
                              </div>
                           </div>
                        ))}

                     <div class="promotion-infor__more">
                        <p style={{ margin: "0px" }}>Xem thêm khuyến mãi</p>
                        <i
                           class="fa-solid fa-right-long"
                           style={{ margin: "0px 8px" }}
                        ></i>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};
