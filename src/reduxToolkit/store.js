import { configureStore } from "@reduxjs/toolkit";
import newsSlice from "./slice/newsSlice";
import productSlice from "./slice/productSlice";
import userReducer from "./slice/userSlice";
export const store = configureStore({
   reducer: {
      user: userReducer,
      products: productSlice,
      news: newsSlice,
   },
});
