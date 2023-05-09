import { createAsyncThunk } from "@reduxjs/toolkit";
import { callAPI } from "../../service/callApi";

export const loginStaff = createAsyncThunk(
   "staff/login",
   async ({ username, password }) => {
      try {
         const res = await callAPI("/staff/login", "POST", {
            username,
            password,
         });
         return res;
      } catch (error) {
         return error.response;
      }
   }
);

export const getProfileStaff = createAsyncThunk(
   "staff/getProfileStaff",
   async () => {
      const token = localStorage.getItem("tokenAdmin");
      try {
         const res = await callAPI("/staff", "GET", {}, token);
         return res;
      } catch (error) {
         return error.response;
      }
   }
);

export const getAllUsers = createAsyncThunk("staff/getAllUsers", async () => {
   const token = localStorage.getItem("tokenAdmin");
   try {
      const res = await callAPI("/auth/all", "GET", {}, token);
      return res;
   } catch (error) {
      return error.response;
   }
});

export const blockingUser = createAsyncThunk(
   "staff/blockingUser",
   async (data) => {
      const token = localStorage.getItem("tokenAdmin");
      try {
         const res = await callAPI(`/auth/blocking/${data}`, "POST", {}, token);
         return res;
      } catch (error) {
         return error.response;
      }
   }
);
