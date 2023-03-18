import "./App.css";

import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Auth } from "./Container/auth/Auth";
import { Home } from "./Container/home/Home";
import { useDispatch, useSelector } from "react-redux";
import {
   error,
   loading,
   notification,
} from "./reduxToolkit/selector/userSelector";

import { Spin } from "antd";
import { openNotificationWithIcon } from "./Layout/notification/Notification";
import { useEffect } from "react";
import { handleEndNotification } from "./reduxToolkit/slice/userSlice";
import { getProfileUser } from "./reduxToolkit/thunk/userThunk";
import { PaginationProduct } from "./Container/pagination/Pagination";
import { ProductDetail } from "./Container/productDetail/ProductDetail";
import { Login } from "./Component/Login/Login";
import { Register } from "./Component/register/Register";
import { Product } from "./Container/product/Product";
import { ForgotPassword } from "./Component/forgotPassword/ForgotPassword";
import { ShoppingCart } from "./Container/shoppingCart/ShoppingCart";
import { AccountDetail } from "./Container/accountDetail/AccountDetail";
import { Admin } from "./Container/admin/Admin";
import { NewsManagement } from "./Component/newsManagement/NewsManagement";
import { News } from "./Container/news/News";
import { NewsContent } from "./Container/newsContent/NewsContent";
import { NewsRoute } from "./Container/newsRoute/NewsRoute";
function App() {
   const isLoading = useSelector(loading);
   const notify = useSelector(notification);
   const dispatch = useDispatch();

   useEffect(() => {
      const token = localStorage.getItem("token");
      if (token !== "") {
         dispatch(getProfileUser(token));
      }
   }, []);

   useEffect(() => {
      if (notify.isShow) {
         openNotificationWithIcon(notify.type, notify.message);
         dispatch(handleEndNotification());
      }
   }, [notify]);

   return (
      <div class="App">
         <Spin
            tip="Loading..."
            spinning={isLoading}
            style={{ fontSize: "1.2em" }}
         >
            <BrowserRouter>
               <Routes>
                  <Route path="/" element={<Home />}>
                     <Route path="product" element={<Product />}>
                        <Route index element={<PaginationProduct />} />
                        <Route path=":id" element={<ProductDetail />} />
                     </Route>
                     <Route path="cart" element={<ShoppingCart />}></Route>
                     <Route
                        path="accountDetail"
                        element={<AccountDetail />}
                     ></Route>

                     <Route path="news">
                        <Route path="" element={<News />} />
                        <Route path=":id" element={<NewsContent />} />
                     </Route>
                  </Route>

                  <Route path="auth" element={<Auth />}>
                     <Route path="login" element={<Login />} />
                     <Route path="register" element={<Register />} />
                     <Route
                        path="forgot_password"
                        element={<ForgotPassword />}
                     />
                  </Route>

                  <Route path="admin" element={<Admin />}>
                     <Route
                        path="news-management"
                        element={<NewsManagement />}
                     />
                  </Route>
               </Routes>
            </BrowserRouter>
         </Spin>
      </div>
   );
}

export default App;
