import { createAsyncThunk } from "@reduxjs/toolkit";
import { callAPI } from "../../service/callApi";

export const getAllProducts = createAsyncThunk(
   "products/getAllProduct",
   async () => {
      try {
         const res = await callAPI("/vouchers", "GET", {});

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
         const res = await callAPI(`/vouchers/${id}`, "GET", {});
         return res.data;
      } catch (error) {
         return error.response.data;
      }
   }
);
