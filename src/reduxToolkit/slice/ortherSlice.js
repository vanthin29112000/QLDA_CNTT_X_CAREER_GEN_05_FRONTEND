import { createSlice } from "@reduxjs/toolkit";
import { isError } from "../../service/callApi";
import { addNew } from "../thunk/newsThunk";
import { getOrtherForCustomer, updateUsedVoucher } from "../thunk/ortherThunk";

const initialState = {
   isLoading: false,
   status: "idle",
   notification: {
      type: "",
      isShow: false,
      message: "",
   },
   listOrther: [],
};

const ortherSlice = createSlice({
   name: "invoice",
   initialState,
   reducers: {
      handleEndNotification: (state) => {
         state.notification = {
            type: "",
            isShow: false,
            message: "",
         };
      },

      setNotification: (state, payload) => {
         console.log("payload", payload);
         state.notification = {
            type: payload.payload.type,
            isShow: true,
            message: payload.payload.message,
         };
      },
   },

   extraReducers: (builder) => {
      builder
         .addCase(getOrtherForCustomer.pending, (state, action) => {
            state.isLoading = true;
            state.status = "pending";
         })
         .addCase(getOrtherForCustomer.fulfilled, (state, action) => {
            state.isLoading = false;
            state.status = "idle";
            if (!isError(action.payload)) {
               state.listOrther = action.payload.data;

               //    state.notification.isShow = true;
               //    state.notification.message = "Thêm bài viết thành công !";
               //    state.notification.type = "success";
            } else {
               state.notification.isShow = true;
               state.notification.message = action.payload.message;
               state.notification.type = "error";
            }
         })
         .addCase(updateUsedVoucher.pending, (state, action) => {
            state.isLoading = true;
            state.status = "pending";
         })
         .addCase(updateUsedVoucher.fulfilled, (state, action) => {
            state.isLoading = false;
            state.status = "idle";
            if (!isError(action.payload)) {
               state.listOrther = action.payload.data;

               //    state.notification.isShow = true;
               //    state.notification.message = "Thêm bài viết thành công !";
               //    state.notification.type = "success";
            } else {
               state.notification.isShow = true;
               state.notification.message = action.payload.message;
               state.notification.type = "error";
            }
         });
   },
});

export const { handleEndNotification, setNotification } = ortherSlice.actions;
export default ortherSlice.reducer;
