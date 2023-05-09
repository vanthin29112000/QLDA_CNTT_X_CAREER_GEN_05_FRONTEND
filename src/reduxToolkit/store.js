import { configureStore } from "@reduxjs/toolkit";
import newsSlice from "./slice/newsSlice";
import productSlice from "./slice/productSlice";
import userReducer from "./slice/userSlice";
import addressSlice from "./slice/addressSlice";
import ortherSlice from "./slice/ortherSlice";
import staffSlice from "./slice/staffSlice";
export const store = configureStore({
   reducer: {
      user: userReducer,
      products: productSlice,
      news: newsSlice,
      address: addressSlice,
      orther: ortherSlice,
      staff: staffSlice,
   },
});
