import { createSelector } from "@reduxjs/toolkit";
import { formatTimeStamp } from "../../service/formater";

const listNews = (state) => state.news.listNews;
export const newsEditItem = (state) => state.news.newsEdit;
export const listFilter = (state) => state.news.filter;
export const notification = (state) => state.news.notification;
export const isLoading = (state) => state.news.isLoading;
export const sortItem = (state) => state.news.sort;
export const news = (state) => state.news.newsDetail;

export const type = {
   technology: "Công nghệ",
   life: "Đời sống",
   entertainment: "Giải trí",
   appliances: "Gia dụng",
   promotion: "Khuyến mãi",
};

const splitPageSlideShow = (arr) => {
   let i = 0;
   let listRender = [];
   let tempArr = [];
   for (let index = 0; index <= arr.length; index++) {
      if (i === 3 || index === arr.length) {
         listRender.push(tempArr);
         tempArr = [];
         i = 0;
      } else {
         i++;
      }
      tempArr.push(arr[index]);
   }
   return listRender;
};

export const pageNews = createSelector(listNews, (news) => {
   let temp = [...news];
   let renderPageNews = [];

   let tempArr = [...temp];
   tempArr.sort((a, b) => b.views - a.views);
   renderPageNews.mostViewedNews = tempArr.filter((ele, index) => index < 3);

   renderPageNews.promotionNews = temp.filter(
      (ele) => ele.type === "promotion"
   );

   tempArr = temp.filter((ele) => ele.status === "highlights");
   renderPageNews.highlightsNews = splitPageSlideShow(tempArr);

   tempArr = temp.filter((ele) => ele.status === "new");
   renderPageNews.latestNews = splitPageSlideShow(tempArr);

   return renderPageNews;
});

export const newsRemainingSelector = createSelector(
   listNews,
   listFilter,
   sortItem,

   (news, filters, sort) => {
      // console.log(sortProduct);
      if (news.length === 0) return [];

      let tempNews = [...news];

      switch (sort) {
         case "latest": {
            tempNews = tempNews.sort((a, b) => {
               const tempA = formatTimeStamp(a.dateSubmit);
               const tempB = formatTimeStamp(b.dateSubmit);
               return tempB - tempA;
            });
            break;
         }

         case "oldest": {
            tempNews = tempNews.sort((a, b) => {
               const tempA = formatTimeStamp(a.dateSubmit);
               const tempB = formatTimeStamp(b.dateSubmit);
               return tempA - tempB;
            });
            break;
         }
         default: {
            break;
         }
      }

      if (
         filters.type.length === 0 &&
         filters.status.length === 0 &&
         filters.dateSubmit === ""
      ) {
         return tempNews;
      }

      if (filters.type.length !== 0) {
         tempNews = tempNews.filter((newItem) => {
            return filters.type.includes(newItem.type);
         });
      }

      if (filters.status.length !== 0) {
         tempNews = tempNews.filter((newItem) => {
            return filters.status.includes(newItem.status);
         });
      }

      if (filters.dateSubmit !== null) {
         let temp = filters.dateSubmit;
         let tempStart = formatTimeStamp(temp[0]);
         let tempEnd = formatTimeStamp(temp[1]);

         tempNews = tempNews.filter((newItem) => {
            const date = formatTimeStamp(newItem.dateSubmit);
            return date >= tempStart && date <= tempEnd;
         });
      }

      return tempNews;
   }
);
