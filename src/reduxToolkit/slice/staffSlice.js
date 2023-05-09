import { createSlice } from "@reduxjs/toolkit";
import {
   blockingUser,
   getAllUsers,
   getProfileStaff,
   loginStaff,
} from "../thunk/staffThunk";
import { isError } from "../../service/callApi";

const initialState = {
   status: "idle",
   isLoading: false,
   isLoginStaff: false,
   notification: {
      type: "",
      isShow: false,
      message: "",
   },
   info: "",
   resetPass: {
      isSuccess: false,
      isWaiting: true,
   },
   listUser: [],
};
const staffSlice = createSlice({
   name: "staff",
   initialState,
   reducers: {
      handleEndNotification: (state) => {
         state.notification = {
            type: "",
            isShow: false,
            message: "",
         };
      },
      signOutStaff: (state) => {
         state.infoUser = "";
         state.isLoginStaff = false;
         localStorage.setItem("tokenAdmin", "");
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(loginStaff.pending, (state, action) => {
            state.status = "pending";
            state.isLoading = true;
         })
         .addCase(loginStaff.fulfilled, (state, action) => {
            state.status = "idle";
            state.isLoading = false;
            if (!isError(action.payload)) {
               state.isLoginStaff = true;
               localStorage.setItem(
                  "tokenAdmin",
                  action.payload.data.user.token
               );
               // console.log("user", action.payload.data);
               state.infoUser = {
                  ...action.payload.data.user.user,
                  token: action.payload.data.token,
               };
            } else {
               // console.log(action.payload.message);
               state.notification = {
                  isShow: true,
                  message: action.payload.data.message,
                  type: "error",
               };
            }
         })
         .addCase(getProfileStaff.pending, (state, action) => {
            state.status = "pending";
            state.isLoading = true;
         })
         .addCase(getProfileStaff.fulfilled, (state, action) => {
            state.status = "idle";
            state.isLoading = false;
            const token = localStorage.getItem("tokenAdmin");
            console.log("user", action.payload);
            if (!isError(action.payload) && token) {
               state.infoUser = { ...action.payload.data, token };
               state.isLoginStaff = true;
            } else {
               state.infoUser = {};
               state.isLogin = false;
               localStorage.setItem("tokenAdmin", "");
            }
         })
         .addCase(getAllUsers.pending, (state, action) => {
            state.status = "pending";
            state.isLoading = true;
         })
         .addCase(getAllUsers.fulfilled, (state, action) => {
            state.status = "idle";
            state.isLoading = false;
            if (!isError(action.payload)) {
               state.listUser = action.payload.data;
            } else {
               state.notification = {
                  isShow: true,
                  message: action.payload.data.message,
                  type: "error",
               };
            }
         })
         .addCase(blockingUser.pending, (state, action) => {
            state.status = "pending";
            state.isLoading = true;
         })
         .addCase(blockingUser.fulfilled, (state, action) => {
            state.status = "idle";
            state.isLoading = false;
            if (!isError(action.payload)) {
               state.listUser = action.payload.data;
            } else {
               state.notification = {
                  isShow: true,
                  message: action.payload.data.message,
                  type: "error",
               };
            }
         });
   },
});

export const { handleEndNotification, signOutStaff } = staffSlice.actions;
export default staffSlice.reducer;
