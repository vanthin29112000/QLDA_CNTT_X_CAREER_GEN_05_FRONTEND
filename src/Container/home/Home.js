import { UserOutlined } from "@ant-design/icons";
import { Avatar, Badge } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Chat } from "../../Component/Chat/Chat";
import { child, get, onValue, query, ref, update } from "firebase/database";
import { isLogin, userInfo } from "../../reduxToolkit/selector/userSelector";
import "./Home.css";
import { database } from "../../firebase/config";
import { Navigation } from "../../Component/navigation/Navigation";
import { Footer } from "../../Component/footer/Footer";
export const Home = () => {
   const infoUser = useSelector(userInfo);
   const db = database;

   const [isOpenChat, setIsOpenChat] = useState(false);
   const [isSeenChat, setIsSeenChat] = useState(false);

   const onHandleOpenChat = () => {
      setIsOpenChat(!isOpenChat);
   };

   const [user, setUser] = useState("");

   useEffect(() => {
      if (infoUser !== "") {
         let temp = {
            phone: infoUser.phone || "",
            email: infoUser.email,
            name: infoUser.name,
            avatar: infoUser.avatar || "",
         };

         // const newPostKey = push(child(ref(db), "group/" + infoUser._id)).key;
         const updates = {};
         updates[`/member/${infoUser._id}`] = {
            infoUser: temp,
         };

         update(ref(db), updates);
         setUser(temp);

         const starCountRef = query(ref(db, "group/" + infoUser._id));
         onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            //  updateStarCount(postElement, data);

            if (Object.values(data).length !== 0 && !isOpenChat) {
               setIsSeenChat(!data.isSeen.client);
            }
         });
      }
   }, [infoUser]);

   // Chat mess setting
   useEffect(() => {
      if (isSeenChat && !isOpenChat) {
         var snd = new Audio(
            "./Sound Effect/Ting sound Messenger Facebook 3s.mp3"
         ); // buffers automatically when created
         snd.play();
      }
   }, [isSeenChat]);

   useEffect(() => {
      if (isOpenChat && infoUser !== "") {
         get(child(ref(db), `group/${infoUser._id}`))
            .then((snapshot) => {
               if (snapshot.exists()) {
                  const data = snapshot.val();

                  if (data) {
                     data.isSeen = { client: true, admin: true };

                     const updates = {};

                     updates[`/group/${infoUser._id}`] = {
                        isSeen: data.isSeen,
                        lastMessage: data.lastMessage,
                        timestamp: data.timestamp,
                     };
                     update(ref(db), updates);
                  }
               } else {
                  console.log("No data available");
               }
            })
            .catch((error) => {
               console.error(error);
            });
      }
   }, [isOpenChat, infoUser]);

   return (
      <div>
         <Navigation></Navigation>

         {/* Render page component */}
         <div>
            <Outlet />
         </div>

         {/* Chat box */}
         <Footer></Footer>
         <div class="home-chat__container">
            <div
               class="box-chat"
               style={{ display: `${isOpenChat ? "block" : "none"}` }}
            >
               <div class="box-chat__title">
                  <div
                     class="box-chat__title-info"
                     style={{ display: "flex", alignItems: "center" }}
                  >
                     <Avatar
                        icon={<UserOutlined />}
                        style={{ marginRight: "8px" }}
                     />
                     <div>
                        <div class="box-chat__title-info-name">
                           Voucher hunter{" "}
                           <i
                              class="fa-solid fa-circle-check"
                              style={{ color: "#3e93ef" }}
                           ></i>
                        </div>
                        <div class="box-chat__title-info-type">
                           Tư vấn và CSKH
                        </div>
                     </div>
                  </div>

                  <div class="button-close" onClick={onHandleOpenChat}>
                     <i class="fa-solid fa-xmark"></i>
                  </div>
               </div>
               {infoUser !== "" && user !== "" ? (
                  <Chat userName={infoUser.name} id={infoUser._id}></Chat>
               ) : (
                  ""
               )}
            </div>

            <div class="home-icon-chat__popup" onClick={onHandleOpenChat}>
               <div class="home-icon-chat__popup-icon">
                  <Badge dot={isSeenChat}>
                     <i class="fa-brands fa-facebook-messenger"></i>
                  </Badge>
               </div>
            </div>
         </div>
         {/* <Chat userName={"CSKH"}></Chat> */}
      </div>
   );
};
