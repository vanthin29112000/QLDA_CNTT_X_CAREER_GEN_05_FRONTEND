import { async } from "@firebase/util";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { callAPI } from "../../service/callApi";

export const addNew = createAsyncThunk(
   "news/addNew",
   async ({ imgThumbnail, title, status, type, content }) => {
      try {
         const res = await callAPI("/news", "PUT", {
            imgThumbnail,
            title,
            status,
            type,
            content,
         });
         return res;
      } catch (error) {
         return error.response.data;
      }
   }
);

export const getAllNews = createAsyncThunk("news/getAllNews", async () => {
   try {
      const res = await callAPI("/news", "GET", {});

      return res;
   } catch (error) {
      return error.response.data;
   }
});

export const getLatestNews = createAsyncThunk(
   "news/getLatestNews",
   async () => {
      try {
         const res = await callAPI("/news/latest", "GET", {});

         return res;
      } catch (error) {
         return error.response.data;
      }
   }
);

export const GetNewByID = createAsyncThunk("news/getNewByID", async (id) => {
   try {
      const res = await callAPI(`/news/${id}`, "GET", {});
      return res;
   } catch (error) {
      return error.response.data;
   }
});

export const GetViewNewByID = createAsyncThunk(
   "news/getViewNewByID",
   async (id) => {
      try {
         const res = await callAPI(`/news/view/${id}`, "GET", {});
         return res;
      } catch (error) {
         return error.response.data;
      }
   }
);

export const updateNew = createAsyncThunk(
   "news/updateNew",
   async ({ id, imgThumbnail, title, status, type, content }) => {
      try {
         const res = await callAPI(`/news/${id}`, "POST", {
            imgThumbnail,
            title,
            status,
            type,
            content,
         });
         return res;
      } catch (error) {
         return error.response.data;
      }
   }
);

export const deleteNew = createAsyncThunk("news/deleteNew", async (id) => {
   try {
      const res = await callAPI(`/news/${id}`, "DELETE", {});
      return res;
   } catch (error) {
      return error.response.data;
   }
});
