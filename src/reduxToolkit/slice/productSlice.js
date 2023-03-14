import { createSlice } from "@reduxjs/toolkit";
import { isError } from "../../service/callApi";
import { getAllProducts, getProductByID } from "../thunk/productThunk";

const initialState = {
   isLoading: false,
   status: "idle",
   notification: {
      type: "",
      isShow: false,
      message: "",
   },
   products: [],
   page: {
      totalPage: 0,
      currentPage: 1,
      pageSize: 0,
   },
   filter: {
      category: [],
      brand: [],
      applyDate: null,
      price: [0, 0],
   },
   productDetail: [],
   sort: "",
};

const productsSlice = createSlice({
   name: "products",
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
      clearFilter: (state) => {
         state.filter = {
            category: [],
            brand: [],
            applyDate: null,
            price: [0, 0],
         };
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(getAllProducts.pending, (state, action) => {
            state.isLoading = true;
            state.status = "pending";
         })
         .addCase(getAllProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.status = "idle";
            if (!isError(action.payload)) {
               const data = action.payload.data;
               state.products = [...action.payload.data];
               state.page = {
                  totalPage: (data.totalProduct / data.pageSize).toFixed(),
                  currentPage: data.currentPage,
                  pageSize: data.pageSize,
               };
            } else {
               state.notification.isShow = true;
               state.notification.message = action.payload.message;
               state.notification.type = "error";
            }
         })

         .addCase(getProductByID.pending, (state, action) => {
            state.isLoading = true;
            state.status = "pending";
         })
         .addCase(getProductByID.fulfilled, (state, action) => {
            state.isLoading = false;
            state.status = "idle";
            console.log(action.payload);
            if (!isError(action.payload)) {
               state.productDetail = [action.payload.data];
               console.log("true");
            } else {
               state.notification.isShow = true;
               state.notification.message = action.payload.message;
               state.notification.type = "error";
            }
         });
   },
});

export const { handleEndNotification, handleFilter, handleSort, clearFilter } =
   productsSlice.actions;
export default productsSlice.reducer;
