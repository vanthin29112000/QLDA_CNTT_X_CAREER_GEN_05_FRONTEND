import { createSlice } from "@reduxjs/toolkit";
import { isError } from "../../service/callApi";
import {
   addNew,
   deleteNew,
   getAllNews,
   getLatestNews,
   GetNewByID,
   GetViewNewByID,
   updateNew,
} from "../thunk/newsThunk";

const initialState = {
   isLoading: false,
   status: "idle",
   notification: {
      type: "",
      isShow: false,
      message: "",
   },
   listNews: [],
   newsEdit: { imgThumbnail: "", content: "", title: "" },
   filter: {
      type: [],
      status: [],
      dateSubmit: null,
   },
   sort: "",
   newsDetail: 0,
   latestNews: [],
};

const newsSlice = createSlice({
   name: "news",
   initialState,
   reducers: {
      handleEndNotification: (state) => {
         state.notification = {
            type: "",
            isShow: false,
            message: "",
         };
      },
      handleFilter: (state, action) => {
         state.filter[action.payload.name] = action.payload.value;
      },
      handleSort: (state, action) => {
         state.sort = action.payload;
      },
      deleteFilter: (state, action) => {
         state.filter = { type: [], status: [], dateSubmit: null };
         state.sort = "";
      },
   },

   extraReducers: (builder) => {
      builder
         .addCase(addNew.pending, (state, action) => {
            state.isLoading = true;
            state.status = "pending";
         })
         .addCase(addNew.fulfilled, (state, action) => {
            state.isLoading = false;
            state.status = "idle";
            if (!isError(action.payload)) {
               state.listNews = action.payload.data;

               state.notification.isShow = true;
               state.notification.message = "Thêm bài viết thành công !";
               state.notification.type = "success";
            } else {
               state.notification.isShow = true;
               state.notification.message = action.payload.message;
               state.notification.type = "error";
            }
         })
         .addCase(getAllNews.pending, (state, action) => {
            state.isLoading = true;
            state.status = "pending";
         })
         .addCase(getAllNews.fulfilled, (state, action) => {
            state.isLoading = false;
            state.status = "idle";
            if (!isError(action.payload)) {
               state.listNews = action.payload.data;
            } else {
               state.notification.isShow = true;
               state.notification.message = action.payload.message;
               state.notification.type = "error";
            }
         })
         .addCase(getLatestNews.pending, (state, action) => {
            state.isLoading = true;
            state.status = "pending";
         })
         .addCase(getLatestNews.fulfilled, (state, action) => {
            state.isLoading = false;
            state.status = "idle";
            if (!isError(action.payload)) {
               state.latestNews = action.payload.data;
            } else {
               state.notification.isShow = true;
               state.notification.message = action.payload.message;
               state.notification.type = "error";
            }
         })
         .addCase(GetNewByID.pending, (state, action) => {
            state.isLoading = true;
            state.status = "pending";
         })
         .addCase(GetNewByID.fulfilled, (state, action) => {
            state.isLoading = false;
            state.status = "idle";
            if (!isError(action.payload)) {
               state.newsEdit = { ...action.payload.data };
            } else {
               state.notification.isShow = true;
               state.notification.message = action.payload.message;
               state.notification.type = "error";
            }
         })

         .addCase(GetViewNewByID.pending, (state, action) => {
            state.isLoading = true;
            state.status = "pending";
         })
         .addCase(GetViewNewByID.fulfilled, (state, action) => {
            state.isLoading = false;
            state.status = "idle";
            if (!isError(action.payload)) {
               state.newsDetail = { ...action.payload.data };
            } else {
               state.notification.isShow = true;
               state.notification.message = action.payload.message;
               state.notification.type = "error";
            }
         })
         .addCase(updateNew.pending, (state, action) => {
            state.isLoading = true;
            state.status = "pending";
         })
         .addCase(updateNew.fulfilled, (state, action) => {
            state.isLoading = false;
            state.status = "idle";
            if (!isError(action.payload)) {
               state.listNews = action.payload.data;

               state.notification.isShow = true;
               state.notification.message = "Chỉnh sửa bài viết thành công !";
               state.notification.type = "success";
            } else {
               state.notification.isShow = true;
               state.notification.message = action.payload.message;
               state.notification.type = "error";
            }
         })
         .addCase(deleteNew.pending, (state, action) => {
            state.isLoading = true;
            state.status = "pending";
         })
         .addCase(deleteNew.fulfilled, (state, action) => {
            state.isLoading = false;
            state.status = "idle";
            if (!isError(action.payload)) {
               state.listNews = action.payload.data;

               state.notification.isShow = true;
               state.notification.message = "Xóa bài viết thành công !";
               state.notification.type = "success";
            } else {
               state.notification.isShow = true;
               state.notification.message = action.payload.message;
               state.notification.type = "error";
            }
         });
   },
});

export const {
   handleNewsEdit,
   handleEndNotification,
   handleFilter,
   handleSort,
   deleteFilter,
} = newsSlice.actions;
export default newsSlice.reducer;
