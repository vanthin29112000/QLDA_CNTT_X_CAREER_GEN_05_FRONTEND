import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { news, pageNews } from "../../reduxToolkit/selector/newsSelector";
import { NewDetail } from "../../Component/newDetail/NewDetail";
import parse from "html-react-parser";

import { getAllNews, GetViewNewByID } from "../../reduxToolkit/thunk/newsThunk";
import "./NewsContent.css";
export const NewsContent = () => {
   const { id } = useParams();
   const dispatch = useDispatch();
   const newsItem = useSelector(news);
   const renderPageNews = useSelector(pageNews);
   const navigate = useNavigate();

   useEffect(() => {
      if (id !== "") {
         dispatch(GetViewNewByID(id));
      }
   }, [id]);

   useEffect(() => {
      dispatch(getAllNews());
   }, []);

   return (
      <div class="container news-content">
         <div style={{ width: "70%", paddingRight: "16px" }}>
            {console.log("new", newsItem)}
            {newsItem !== 0 && <NewDetail newItem={newsItem}></NewDetail>}
         </div>

         <div style={{ width: "30%", paddingLeft: "16px" }}>
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
                              <a
                                 href={"/news/" + ele._id}
                                 class="promotion-infor__news-content"
                              >
                                 {ele.title}
                              </a>
                              <div class="promotion-infor__news-infor">
                                 {parse(ele.content)}
                              </div>
                           </div>
                        </div>
                     ))}

                  {/* <div class="promotion-infor__more">
                     <p style={{ margin: "0px" }}>Xem thêm khuyến mãi</p>
                     <i
                        class="fa-solid fa-right-long"
                        style={{ margin: "0px 8px" }}
                     ></i>
                  </div> */}
               </div>
            </div>
            <div class="promotion-infor" style={{ marginTop: "32px" }}>
               <div class="promotion-infor__title">
                  <p>Tin hot </p>
               </div>

               <div class="promotion-infor__list-news">
                  {renderPageNews.mostViewedNews.length > 0 &&
                     renderPageNews.mostViewedNews.map((ele, index) => (
                        <div class="promotion-infor__news-item">
                           <img src={ele.imgThumbnail} alt=".png"></img>
                           <div style={{ padding: "8px" }}>
                              <a
                                 href={"/news/" + ele._id}
                                 class="promotion-infor__news-content"
                              >
                                 {ele.title}
                              </a>
                              <div class="promotion-infor__news-infor">
                                 {parse(ele.content)}
                              </div>
                           </div>
                        </div>
                     ))}

                  {/* <div class="promotion-infor__more">
                     <p style={{ margin: "0px" }}>Xem thêm khuyến mãi</p>
                     <i
                        class="fa-solid fa-right-long"
                        style={{ margin: "0px 8px" }}
                     ></i>
                  </div> */}
               </div>
            </div>
         </div>
      </div>
   );
};
