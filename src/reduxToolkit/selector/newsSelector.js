import { createSelector } from "@reduxjs/toolkit";
import { formatTimeStamp } from "../../service/formater";

const listNews = (state) => state.news.listNews;
export const newsEditItem = (state) => state.news.newsEdit;
export const listFilter = (state) => state.news.filter;
export const notification = (state) => state.news.notification;
export const isLoading = (state) => state.news.isLoading;
export const sortItem = (state) => state.news.sort;
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
