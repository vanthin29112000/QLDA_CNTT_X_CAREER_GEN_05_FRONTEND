import { createSlice } from "@reduxjs/toolkit";
import { isError } from "../../service/callApi";
import {
   addProductInCart,
   deleteProductInCart,
   getAllProductInCart,
   getAllProducts,
   getProductByID,
   getProductSlider,
   getProductSpecial,
   getProductSpecialOffer,
   paymentOrders,
   updateProductInCart,
} from "../thunk/productThunk";

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
   productDetail: "",
   sort: "",
   productSlider: [],
   productSpecial: [],
   productSpecialOffer: [],
   productInCart: [],
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
            // console.log(action.payload);
            if (!isError(action.payload)) {
               state.productDetail = action.payload.data;
            } else {
               state.notification.isShow = true;
               state.notification.message = action.payload.message;
               state.notification.type = "error";
            }
         })
         .addCase(getProductSlider.pending, (state, action) => {
            state.isLoading = true;
            state.status = "pending";
         })
         .addCase(getProductSlider.fulfilled, (state, action) => {
            state.isLoading = false;
            state.status = "idle";
            // console.log(action.payload);
            if (!isError(action.payload)) {
               state.productSlider = [...action.payload.data];
            } else {
               state.notification.isShow = true;
               state.notification.message = action.payload.message;
               state.notification.type = "error";
            }
         })
         .addCase(getProductSpecial.pending, (state, action) => {
            state.isLoading = true;
            state.status = "pending";
         })
         .addCase(getProductSpecial.fulfilled, (state, action) => {
            state.isLoading = false;
            state.status = "idle";
            // console.log(action.payload);
            if (!isError(action.payload)) {
               state.productSpecial = [...action.payload.data];
            } else {
               state.notification.isShow = true;
               state.notification.message = action.payload.message;
               state.notification.type = "error";
            }
         })
         .addCase(getProductSpecialOffer.pending, (state, action) => {
            state.isLoading = true;
            state.status = "pending";
         })
         .addCase(getProductSpecialOffer.fulfilled, (state, action) => {
            state.isLoading = false;
            state.status = "idle";
            // console.log(action.payload);
            if (!isError(action.payload)) {
               state.productSpecialOffer = [...action.payload.data];
               // console.log("true");
            } else {
               state.notification.isShow = true;
               state.notification.message = action.payload.message;
               state.notification.type = "error";
            }
         })
         .addCase(updateProductInCart.pending, (state, action) => {
            state.isLoading = true;
            state.status = "pending";
         })
         .addCase(updateProductInCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.status = "idle";
            // console.log(action.payload);
            if (!isError(action.payload)) {
               state.productInCart = action.payload.data.products;

               // state.productSpecialOffer = [...action.payload.data];
               // console.log("true");
            } else {
               state.notification.isShow = true;
               state.notification.message = action.payload.message;
               state.notification.type = "error";
            }
         })
         .addCase(getAllProductInCart.pending, (state, action) => {
            state.isLoading = true;
            state.status = "pending";
         })
         .addCase(getAllProductInCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.status = "idle";
            // console.log(action.payload);
            if (!isError(action.payload)) {
               state.productInCart = action.payload.data.products;
               // console.log("true");
            } else {
               state.notification.isShow = true;
               state.notification.message = action.payload.message;
               state.notification.type = "error";
            }
         })
         .addCase(addProductInCart.pending, (state, action) => {
            state.isLoading = true;
            state.status = "pending";
         })
         .addCase(addProductInCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.status = "idle";
            // console.log(action.payload);
            if (!isError(action.payload)) {
               state.notification.message = "Thêm giỏ hàng thành công";
               state.notification.type = "success";
               state.notification.isShow = true;
               state.productInCart = action.payload.data.products;
               // console.log("true");
            } else {
               state.notification.isShow = true;
               state.notification.message = action.payload.message;
               state.notification.type = "error";
            }
         })
         .addCase(deleteProductInCart.pending, (state, action) => {
            state.isLoading = true;
            state.status = "pending";
         })
         .addCase(deleteProductInCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.status = "idle";
            // console.log(action.payload);
            if (!isError(action.payload)) {
               state.productInCart = action.payload.data.products;
               // console.log("true");
            } else {
               state.notification.isShow = true;
               state.notification.message = action.payload.message;
               state.notification.type = "error";
            }
         })
         .addCase(paymentOrders.pending, (state, action) => {
            state.isLoading = true;
            state.status = "pending";
         })
         .addCase(paymentOrders.fulfilled, (state, action) => {
            state.isLoading = false;
            state.status = "idle";
            // console.log(action.payload);
            if (!isError(action.payload)) {
               state.productInCart = [];
               state.notification.message =
                  "Đơn hàng của bạn đã hoàn thành vui lòng xem chi tết trong danh sách đơn hàng !";
               state.notification.type = "success";
               state.notification.isShow = true;
               // console.log("true");
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
