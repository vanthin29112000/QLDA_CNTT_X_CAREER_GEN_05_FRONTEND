import { createAsyncThunk } from "@reduxjs/toolkit";
import { callAPI } from "../../service/callApi";

export const getOrtherForCustomer = createAsyncThunk(
   "invoice/getOrtherForCustomer",
   async () => {
      try {
         const token = localStorage.getItem("token");
         const res = await callAPI("/invoice", "GET", {}, token);
         return res;
      } catch (error) {
         return error.response.data;
      }
   }
);

export const updateUsedVoucher = createAsyncThunk(
   "invoice/updateUsedVoucher",
   async (data) => {
      try {
         const token = localStorage.getItem("token");
         const res = await callAPI("/invoice", "PUT", data, token);
         return res;
      } catch (error) {
         return error.response.data;
      }
   }
);

export const getAllOrderForAdmin = createAsyncThunk(
   "invoice/getAllOrderForAdmin",
   async () => {
      try {
         const token = localStorage.getItem("tokenAdmin");
         const res = await callAPI("/invoice/all", "GET", {}, token);
         return res;
      } catch (error) {
         return error.response.data;
      }
   }
);
