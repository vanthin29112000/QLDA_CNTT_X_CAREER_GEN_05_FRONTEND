import { createSlice } from "@reduxjs/toolkit";
import { isError } from "../../service/callApi";
import {
   changePasswordUser,
   getProfileUser,
   login,
   loginWithFirebase,
   register,
   resetPasswordWithFirebase,
   updateInfoUser,
} from "../thunk/userThunk";

const initialState = {
   status: "idle",
   isLoading: false,
   isLogin: false,
   notification: {
      type: "",
      isShow: false,
      message: "",
   },
   infoUser: "",
   resetPass: {
      isSuccess: false,
      isWaiting: true,
   },
};
const userSlice = createSlice({
   name: "user",
   initialState,
   reducers: {
      handleEndNotification: (state) => {
         state.notification = {
            type: "",
            isShow: false,
            message: "",
         };
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(login.pending, (state, action) => {
            state.status = "pending";
            state.isLoading = true;
         })
         .addCase(login.fulfilled, (state, action) => {
            state.status = "idle";
            state.isLoading = false;
            if (!isError(action.payload)) {
               state.isLogin = true;
               localStorage.setItem("token", action.payload.data.user.token);
               console.log("user", action.payload.data);
               state.infoUser = {
                  ...action.payload.data.user.user,
                  token: action.payload.data.token,
               };
            } else {
               state.notification = {
                  isShow: true,
                  message: action.payload.message,
                  type: "error",
               };
            }
         })
         // register
         .addCase(register.pending, (state, action) => {
            state.status = "pending";
            state.isLoading = true;
         })
         .addCase(register.fulfilled, (state, action) => {
            state.status = "idle";
            state.isLoading = false;
            if (!isError(action.payload)) {
               // state.isLogin = true;
               // localStorage.setItem("token", action.payload.user.token);
               state.notification.isShow = false;
               state.notification.message = "Thành công";
               state.notification.type = "success";
            } else {
               state.notification.isShow = true;
               state.notification.message = action.payload.message;
               state.notification.type = "error";
            }
         })
         // getProfileUser
         .addCase(getProfileUser.pending, (state, action) => {
            state.status = "pending";
            state.isLoading = true;
         })
         .addCase(getProfileUser.fulfilled, (state, action) => {
            state.status = "idle";
            state.isLoading = false;
            const token = localStorage.getItem("token");

            if (!isError(action.payload) && token) {
               state.infoUser = { ...action.payload.data, token };
               state.isLogin = true;
            } else {
               state.infoUser = {};
               state.isLogin = false;
               localStorage.setItem("token", "");
            }
         })
         .addCase(loginWithFirebase.pending, (state, action) => {
            state.status = "pending";
            state.isLoading = true;
         })
         .addCase(loginWithFirebase.fulfilled, (state, action) => {
            state.status = "idle";
            state.isLoading = false;
            console.log("action", action.payload);
            if (!isError(action.payload)) {
               state.isLogin = true;
               localStorage.setItem("token", action.payload.data.token);
               state.infoUser = {
                  ...action.payload.data.user,
                  token: action.payload.data.token,
               };
            } else {
               state.notification.isShow = true;
               state.notification.message =
                  action.payload.message || action.payload.data.message;
               state.notification.type = "error";
            }
         })

         .addCase(resetPasswordWithFirebase.pending, (state, action) => {
            state.status = "pending";
            state.isLoading = true;
         })
         .addCase(resetPasswordWithFirebase.fulfilled, (state, action) => {
            state.status = "idle";
            state.isLoading = false;

            if (!isError(action.payload) && action.payload) {
               state.notification.isShow = false;
               state.notification.message = "Thành công";
               state.notification.type = "success";
               // state.isLogin = true;
               // localStorage.setItem("token", action.payload.token);
            } else {
               state.notification.isShow = true;
               state.notification.message = action.payload.message;
               state.notification.type = "error";
            }
         })
         .addCase(updateInfoUser.pending, (state, action) => {
            state.status = "pending";
            state.isLoading = true;
         })
         .addCase(updateInfoUser.fulfilled, (state, action) => {
            state.status = "idle";
            state.isLoading = false;
            const token = localStorage.getItem("token");

            if (!isError(action.payload)) {
               state.infoUser = { ...action.payload.data, token };
               state.notification.message = "Chỉnh sửa thành công";
               state.notification.type = "success";
               state.notification.isShow = true;
               // state.isLogin = true;
            } else {
               state.notification.isShow = true;
               state.notification.message = action.payload.data.message;
               state.notification.type = "error";
            }
         })
         .addCase(changePasswordUser.pending, (state, action) => {
            state.status = "pending";
            state.isLoading = true;
         })
         .addCase(changePasswordUser.fulfilled, (state, action) => {
            state.status = "idle";
            state.isLoading = false;

            if (!isError(action.payload)) {
               state.notification.message = "Chỉnh sửa thành công";
               state.notification.type = "success";
               state.notification.isShow = true;
               // state.isLogin = true;
            } else {
               state.notification.isShow = true;
               state.notification.message = action.payload.message;
               state.notification.type = "error";
            }
         });
   },
});

export const { handleEndNotification } = userSlice.actions;
export default userSlice.reducer;
