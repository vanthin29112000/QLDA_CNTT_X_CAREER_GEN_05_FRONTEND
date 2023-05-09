import { Badge, Drawer, Menu, Popover } from "antd";
import React, { useEffect, useState } from "react";
import { Logo } from "../logo/Logo";
import "./Navigation.css";
import {
   HomeOutlined,
   IdcardOutlined,
   InboxOutlined,
   MenuOutlined,
   NotificationOutlined,
   ShoppingOutlined,
   UserOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { isLogin } from "../../reduxToolkit/selector/userSelector";
import { productInCart } from "../../reduxToolkit/selector/productsSelector";
export const Navigation = () => {
   const [scrollState, setSrcollState] = useState(false);
   const [menuState, setMenuState] = useState(false);
   const [menuMobileSate, setMenuMobileSate] = useState(false);
   const [selectNav, setSelectNav] = useState("");
   const [countProduct, setCountProduct] = useState(0);
   const location = useLocation();
   const isAuth = useSelector(isLogin);
   const products = useSelector(productInCart);
   const navigate = useNavigate();

   const items = [
      {
         label: <a href="/">Trang chủ</a>,
         key: "/",
      },
      {
         label: <a href="/product">Sản phẩm</a>,
         key: "/product",
      },
      {
         label: <a href="/news">Tin tức</a>,
         key: "/news",
      },
      {
         label: "Giới thiệu",
         key: "/about",
      },
   ];

   const itemsMobile = [
      getItem(<a href="/">Trang chủ</a>, "/", <HomeOutlined />),
      getItem(<a href="/product">Sản phẩm</a>, "/product", <InboxOutlined />),
      getItem(<a href="/news">Tin tức</a>, "/news", <NotificationOutlined />),
      getItem("Giới thiệu", "/about", <IdcardOutlined />),
   ];

   function getItem(label, key, icon, children, type) {
      return {
         key,
         icon,
         children,
         label,
         type,
      };
   }

   useEffect(() => {
      if (products.length > 0) {
         let count = 0;
         products.forEach((ele) => {
            count += ele.quantity;
         });
         setCountProduct(count);
      }
   }, [products]);

   const content = (
      <>
         {isAuth ? (
            <div>
               <a href="/accountDetail">
                  {" "}
                  <div class="popover-user">Thông tin tài khoản</div>
               </a>
               <a href="/order-list">
                  {" "}
                  <div class="popover-user">Voucher đã mua</div>
               </a>
               <a
                  href="/"
                  onClick={() => {
                     localStorage.setItem("token", "");
                  }}
               >
                  <div class="popover-user">Đăng xuất</div>
               </a>
            </div>
         ) : (
            <div>
               <a href="/auth/login">
                  <div class="popover-user">Đăng nhập</div>
               </a>

               <a href="/auth/register">
                  {" "}
                  <div class="popover-user">Đăng kí</div>
               </a>
            </div>
         )}
      </>
   );

   useEffect(() => {
      window.addEventListener("scroll", function (event) {
         let scroll_y = this.scrollY;
         if (scroll_y > 0) {
            setSrcollState(true);
         } else {
            setSrcollState(false);
         }
      });

      window.onresize = () => {
         const width = window.innerWidth;
         // console.log("width , height ", width, height);
         if (width <= 768) {
            setMenuState(true);
         } else {
            setMenuState(false);
         }
      };
   }, []);

   useEffect(() => {
      //set width
      const width = window.innerWidth;
      // console.log("width , height ", width, height);
      if (width <= 768) {
         setMenuState(true);
      } else {
         setMenuState(false);
      }

      // set nav link
      const pathName = location.pathname;
      setSelectNav(pathName);
      console.log(selectNav, pathName, "on");
   }, []);

   return (
      <div
         class={
            scrollState
               ? "navigation-container-active"
               : "navigation-container-non "
         }
      >
         <div class="container ">
            <div class="navigation-bar">
               {menuState && (
                  <div
                     class="btn-menu-mobile"
                     onClick={() => {
                        setMenuMobileSate(true);
                     }}
                  >
                     <MenuOutlined />
                  </div>
               )}

               <Logo></Logo>

               <div class=" navigation-menu">
                  {menuState ? (
                     <div>
                        <Drawer
                           closable={false}
                           placement={"left"}
                           onClose={() => {
                              setMenuMobileSate(false);
                           }}
                           width={225}
                           open={menuMobileSate}
                        >
                           <div class="menu-mobile">
                              <div
                                 class="btn-close"
                                 style={{ cursor: "pointer" }}
                                 onClick={() => {
                                    setMenuMobileSate(false);
                                 }}
                              ></div>
                              <Menu
                                 // onClick={onClick}
                                 selectedKeys={selectNav}
                                 style={{ width: 200, fontSize: "1em" }}
                                 mode="inline"
                                 items={itemsMobile}
                              />
                           </div>
                        </Drawer>
                     </div>
                  ) : (
                     <Menu
                        // selectedKeys={[current]}
                        mode="horizontal"
                        items={items}
                        selectedKeys={selectNav}
                        style={{
                           width: "400px",
                           border: "none",
                           fontWeight: "600",
                           backgroundColor: "transparent",
                        }}
                     />
                  )}

                  <div class="navigation-menu_list-icon ">
                     <div
                        onClick={() => {
                           navigate("/cart");
                        }}
                        class="navigation-menu_icon "
                     >
                        <Badge count={countProduct}>
                           <ShoppingOutlined style={{ fontSize: "1.2em" }} />
                        </Badge>
                     </div>

                     <div class="navigation-menu_icon ">
                        <Popover
                           placement="bottomRight"
                           // title={text}
                           content={content}
                           trigger="click"
                        >
                           <UserOutlined />
                        </Popover>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};
