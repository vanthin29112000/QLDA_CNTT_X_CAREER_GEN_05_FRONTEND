import { async } from "@firebase/util";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
   createUserWithEmailAndPassword,
   sendEmailVerification,
   sendPasswordResetEmail,
   signInWithEmailAndPassword,
} from "firebase/auth";
// import { Auth } from "../../Container/auth/Auth";
import { auth } from "../../firebase/config";
import { callAPI } from "../../service/callApi";

export const login = createAsyncThunk(
   "user/login",
   async ({ email, password }) => {
      const tempUser = {};
      try {
         tempUser = await signInWithEmailAndPassword(auth, email, password);
         // console.log(tempUser.user.emailVerified);
      } catch (error) {
         const tempError = {
            message: "Tài khoàn hoặc mật khẩu không đúng ",
            statusCode: 400,
         };
         return tempError;
      }
      try {
         const res = await callAPI("/auth/login", "POST", {
            email,
            password,
            token: tempUser.user.accessToken,
         });
         // console.log("token", res.data.user.token);
         return res;
      } catch (error) {
         return error.response;
      }
   }
);

export const register = createAsyncThunk("user/register", async (data) => {
   let tempUser = {};

   try {
      tempUser = await createUserWithEmailAndPassword(
         auth,
         data.email,
         data.password
      );

      console.log(tempUser);
      sendEmailVerification(auth.currentUser);
   } catch (error) {
      const tempError = {
         message: "Email đã được đăng kí",
         statusCode: 400,
      };
      return tempError;
   }

   try {
      let tempData = { ...data, token: tempUser.user.accessToken };
      const res = await callAPI("/auth/register", "POST", tempData);
      return res;
   } catch (error) {
      return error.response;
   }
});

export const loginWithFirebase = createAsyncThunk(
   "user/loginWithFirebase",
   async (data) => {
      try {
         const res = await callAPI("auth/login/firebase", "POST", data);
         console.log("userFirebase", res);
         return res;
      } catch (error) {
         return error.response;
      }
   }
);

export const resetPasswordWithFirebase = createAsyncThunk(
   "user/resetPassword",
   async (email) => {
      try {
         await sendPasswordResetEmail(auth, email);
         return true;
      } catch (error) {
         const tempError = {
            message: "Email không tồn tại hoặc chưa được đăng kí",
            statusCode: 400,
         };
         console.log(tempError, error);
         return tempError;
      }
   }
);

export const getProfileUser = createAsyncThunk(
   "user/getProfileUser",
   async (token) => {
      try {
         const res = await callAPI("auth", "GET", {}, token);
         return res;
      } catch (error) {
         return error.response;
      }
   }
);

export const updateInfoUser = createAsyncThunk(
   "user/updateInfoUser",
   async (data) => {
      const token = localStorage.getItem("token");
      try {
         const res = await callAPI("auth", "PUT", data, token);
         return res;
      } catch (error) {
         return error.response;
      }
   }
);
