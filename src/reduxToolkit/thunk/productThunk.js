import { createAsyncThunk } from "@reduxjs/toolkit";
import { callAPI } from "../../service/callApi";

export const getAllProducts = createAsyncThunk(
   "products/getAllProduct",
   async () => {
      try {
         const res = await callAPI("/product", "GET", {});

         return res.data;
      } catch (error) {
         return error.response.data;
      }
   }
);

export const getProductByID = createAsyncThunk(
   "products/getProductByID",
   async (id) => {
      try {
         const res = await callAPI(`/product/${id}`, "GET", {});
         return res;
      } catch (error) {
         return error.response.data;
      }
   }
);

export const getProductSlider = createAsyncThunk(
   "products/getProductSlider",
   async () => {
      try {
         const res = await callAPI(`/product/slider`, "GET", {});
         return res;
      } catch (error) {
         return error.response.data;
      }
   }
);

export const getProductSpecial = createAsyncThunk(
   "products/getProductSpecial",
   async () => {
      try {
         const res = await callAPI(`/product/special`, "GET", {});
         return res;
      } catch (error) {
         return error.response.data;
      }
   }
);

export const getProductSpecialOffer = createAsyncThunk(
   "products/getProductSpecialOffer",
   async () => {
      try {
         const res = await callAPI(`/product/special-offer`, "GET", {});
         return res;
      } catch (error) {
         return error.response.data;
      }
   }
);
