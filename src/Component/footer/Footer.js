import React from "react";
import "./Footer.css";
import { Button, Input, Menu } from "antd";
import { Logo } from "../logo/Logo";
export const Footer = () => {
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
   return (
      <div class="footer">
         <div class="newsletter">
            <div class="container newsletter-content">
               <div class="newsletter-item">
                  <span style={{ marginRight: "8px" }}>Đăng kí nhận tin :</span>
                  <div class="newsletter-item__content">
                     <Input placeholder="Nhập email"></Input>
                     <Button type="danger">Đăng kí</Button>
                  </div>
               </div>
            </div>
         </div>

         <div class="footer-content">
            <div class=" container">
               <div class="footer-content__container">
                  <div class="footer-content__item">
                     <div>
                        <Logo></Logo>
                        <div class="footer-content__item-content">
                           <h5 style={{ color: "white" }}>Đối tác liên kết</h5>
                           <div class="footer-content__brand-list">
                              <div class="footer-content__brand">
                                 <img
                                    src=".\images\brand-item\2560px-Lazada_(2019).svg.png"
                                    alt=".png"
                                 ></img>
                              </div>
                              <div class="footer-content__brand">
                                 <img src=".\images\brand-item\Logo_Tiki.png"></img>
                              </div>
                              <div class="footer-content__brand">
                                 <img src=".\images\brand-item\Shopee.svg.webp"></img>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="footer-content__item">
                     <div>
                        <div lass="footer-content__item-content">
                           <h5 style={{ color: "white" }}>Liên hệ</h5>
                           <div>
                              <span style={{ fontWeight: "600" }}>
                                 Số điện thoại :
                              </span>{" "}
                              (+84) 99.9999.9999
                           </div>
                           <div>
                              <span style={{ fontWeight: "600" }}>
                                 Địa chỉ văn phòng :
                              </span>{" "}
                              78, Bãi sau, TP.Vũng Tàu
                           </div>
                        </div>
                        <div class="footer-content__item-map">
                           <iframe
                              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125575.28025904733!2d107.0406486236206!3d10.403496924710259!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31756fd4554f0cf5%3A0xb24fd23bf641fa40!2zVsWpbmcgVMOgdSwgQsOgIFLhu4thIC0gVsWpbmcgVMOgdSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1681398204322!5m2!1svi!2s"
                              width="300"
                              height="200"
                              style={{ border: "0" }}
                              allowfullscreen=""
                              loading="lazy"
                              referrerpolicy="no-referrer-when-downgrade"
                           ></iframe>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <div class="footer-nav__container">
            <div class="container">
               <div class="nav-footer">
                  <div class="nav-footer__item">
                     <a href="/">Trang chủ</a>
                  </div>
                  <div class="nav-footer__item">
                     <a href="/product">Sản phẩm</a>
                  </div>
                  <div class="nav-footer__item">
                     <a href="/news">Tin tức</a>
                  </div>
                  <div class="nav-footer__item">
                     <a href="/about">Giới thiệu</a>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};
