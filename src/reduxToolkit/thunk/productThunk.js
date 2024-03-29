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

export const getProductForAdminByID = createAsyncThunk(
   "products/getProductForAdminByID",
   async (id) => {
      try {
         const token = localStorage.getItem("tokenAdmin");
         const res = await callAPI(`/product/admin/${id}`, "GET", {}, token);
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

export const updateProductInCart = createAsyncThunk(
   "products/updateProductInCart",

   async (data) => {
      // data : {id , quantity }
      try {
         const token = localStorage.getItem("token");
         const res = await callAPI(`/cart-item`, "PUT", data, token);
         return res;
      } catch (error) {
         return error.response.data;
      }
   }
);

export const addProductInCart = createAsyncThunk(
   "products/addProductInCart",

   async (data) => {
      // data : {id , quantity }
      try {
         const token = localStorage.getItem("token");
         const res = await callAPI(`/cart-item`, "POST", data, token);
         return res;
      } catch (error) {
         return error.response.data;
      }
   }
);

export const getAllProductInCart = createAsyncThunk(
   "products/getAllProductInCart",
   async () => {
      try {
         const token = localStorage.getItem("token");
         const res = await callAPI(`/cart-item`, "GET", {}, token);
         return res;
      } catch (error) {
         return error.response.data;
      }
   }
);

export const deleteProductInCart = createAsyncThunk(
   "products/deleteProductInCart",
   async (data) => {
      try {
         const token = localStorage.getItem("token");
         const res = await callAPI(`/cart-item`, "DELETE", data, token);
         return res;
      } catch (error) {
         return error.response.data;
      }
   }
);

export const paymentOrders = createAsyncThunk(
   "products/paymentOrders",
   async (data) => {
      try {
         const token = localStorage.getItem("token");
         const res = await callAPI(`/invoice`, "POST", data, token);
         return res;
      } catch (error) {
         return error.response.data;
      }
   }
);

export const updateSpecialProduct = createAsyncThunk(
   "products/updateSpecialProduct",
   async ({ id }) => {
      try {
         const token = localStorage.getItem("tokenAdmin");
         const res = await callAPI(`/product/special/${id}`, "PUT", {}, token);
         return res;
      } catch (error) {
         return error.response.data;
      }
   }
);

export const updateSliderProduct = createAsyncThunk(
   "products/updateSliderProduct",
   async ({ id }) => {
      try {
         const token = localStorage.getItem("tokenAdmin");
         const res = await callAPI(`/product/slider/${id}`, "PUT", {}, token);
         return res;
      } catch (error) {
         return error.response.data;
      }
   }
);

export const createNewProduct = createAsyncThunk(
   "products/createNewProduct",
   async (data) => {
      try {
         const token = localStorage.getItem("tokenAdmin");
         const res = await callAPI(`/product`, "POST", data, token);
         return res;
      } catch (error) {
         return error.response.data;
      }
   }
);

export const updateProduct = createAsyncThunk(
   "products/updateProduct",
   async (data) => {
      try {
         const token = localStorage.getItem("tokenAdmin");
         const res = await callAPI(`/product/${data.id}`, "PUT", data, token);
         return res;
      } catch (error) {
         return error.response.data;
      }
   }
);

export const deleteProduct = createAsyncThunk(
   "products/deleteProduct",
   async (id) => {
      try {
         const token = localStorage.getItem("tokenAdmin");
         const res = await callAPI(`/product/${id}`, "DELETE", {}, token);
         return res;
      } catch (error) {
         return error.response.data;
      }
   }
);
