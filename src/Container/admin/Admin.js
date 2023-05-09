import { UserOutlined } from "@ant-design/icons";
import { Avatar, Badge } from "antd";
import { child, get, onValue, query, ref, update } from "firebase/database";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Chat } from "../../Component/Chat/Chat";
import { MenuAdmin } from "../../Component/menuAdmin/MenuAdmin";
import { database } from "../../firebase/config";
import "./admin.css";
import { useDispatch, useSelector } from "react-redux";
import { isLogin } from "../../reduxToolkit/selector/staffSelector";
import { getProfileStaff } from "../../reduxToolkit/thunk/staffThunk";
export const Admin = () => {
   const [userIdChat, setUserIdChat] = useState("");
   const [userListGroup, setUserListGroup] = useState("");
   const [listMember, setListMember] = useState("");
   const [listMess, setListMess] = useState([]);
   const [isOpenChat, setIsOpenChat] = useState(false);
   const [countChat, setCountChat] = useState(0);
   const dispatch = useDispatch();
   const isAuth = useSelector(isLogin);
   const navigate = useNavigate();

   const db = database;

   useEffect(() => {
      const token = localStorage.getItem("tokenAdmin");
      console.log("check", token, isAuth);
      if (token || isAuth) {
         dispatch(getProfileStaff());
      } else {
         navigate("/loginAdmin");
      }
   }, [isAuth]);

   useEffect(() => {
      const starCountRef = query(ref(db, "group/"));
      onValue(starCountRef, (snapshot) => {
         const data = snapshot.val();
         //  updateStarCount(postElement, data);

         if (Object.values(data).length !== 0) {
            setUserListGroup(data);
         }
      });

      const memberRef = query(ref(db, "member/"));
      onValue(memberRef, (snapshot) => {
         const data = snapshot.val();
         //  updateStarCount(postElement, data);
         if (Object.values(data).length !== 0) {
            setListMember(data);
         }
      });
   }, []);

   useEffect(() => {
      if (countChat > 0) {
         var snd = new Audio(
            "./Sound Effect/Ting sound Messenger Facebook 3s.mp3"
         ); // buffers automatically when created
         snd.play();
      }
   }, [countChat]);

   // Handle is seen message
   useEffect(() => {
      if (isOpenChat && userIdChat !== "") {
         get(child(ref(db), `group/${userIdChat}`))
            .then((snapshot) => {
               if (snapshot.exists()) {
                  const data = snapshot.val();

                  if (data) {
                     data.isSeen = { client: true, admin: true };

                     const updates = {};

                     updates[`/group/${userIdChat}`] = {
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
   }, [isOpenChat, userIdChat]);

   useEffect(() => {
      if (userListGroup !== "" && listMember !== "") {
         let tempID = Object.keys(userListGroup);
         console.log("key", tempID, userListGroup);
         let tempArr = [];
         for (let ele of tempID) {
            let tempObject = {
               id: ele,
               messStatus: userListGroup[ele],
               infoUser: listMember[ele].infoUser,
            };

            // console.log("temp", tempObject);
            tempArr.push(tempObject);
         }
         setListMess(tempArr);
      }
   }, [userListGroup, listMember]);

   useEffect(() => {
      if (listMess.length > 0 && isOpenChat) {
         setUserIdChat(listMess[0].id);
      }
   }, []);

   useEffect(() => {
      let tempCount = 0;
      if (listMess.length > 0) {
         listMess.forEach((ele) => {
            !ele.messStatus.isSeen.admin && tempCount++;
         });
      }

      setCountChat(tempCount);
   }, [listMess]);

   return (
      <div class="admin-container">
         <div class="admin__menu-container">
            <MenuAdmin></MenuAdmin>
         </div>
         <div class="admin__content" style={{ paddingLeft: "80px" }}>
            <div class="container">
               <Outlet></Outlet>
            </div>
         </div>

         <div class="chat-box-admin">
            {!isOpenChat ? (
               <Badge count={countChat}>
                  <div
                     class="chat-box-admin__icon"
                     onClick={() => {
                        setIsOpenChat(!isOpenChat);
                     }}
                  >
                     <i class="fa-brands fa-facebook-messenger"></i>
                     <div class="chat-box-admin__icon-title">Chat</div>
                  </div>
               </Badge>
            ) : (
               <div class="chat-box-admin__content">
                  <div class="chat-box-admin__title">
                     <p
                        style={{
                           margin: "0px",
                           fontWeight: "700",
                           fontSize: "1.3em",
                        }}
                     >
                        Tin nhắn tư vấn khách hàng
                     </p>
                     <div
                        class="button-close"
                        onClick={() => {
                           setIsOpenChat(!isOpenChat);
                        }}
                     >
                        <i class="fa-solid fa-xmark"></i>
                     </div>
                  </div>
                  <div class="chat-box-admin__box">
                     <div class="chat-box-admin__box-mess">
                        {userIdChat !== "" && (
                           <Chat userName={"CSKH"} id={userIdChat}></Chat>
                        )}
                     </div>
                     <div class="chat-box-admin__list-user">
                        {listMess.length > 0 &&
                           listMess.map((ele) => (
                              <div
                                 class={
                                    ele.id === userIdChat
                                       ? `chat-box-admin__list-user-item-active `
                                       : `chat-box-admin__list-user-item-non-active `
                                 }
                                 onClick={() => {
                                    setUserIdChat(ele.id);
                                 }}
                              >
                                 <Avatar
                                    icon={<UserOutlined />}
                                    style={{ marginRight: "8px" }}
                                 />
                                 <div class="chat-box-admin__list-user-info">
                                    <div class="chat-box-admin__list-user-info-name">
                                       {ele.infoUser.name}
                                    </div>
                                    {ele.messStatus.isSeen.admin ? (
                                       <p class="chat-box-admin__list-user-mess">
                                          {ele.messStatus.lastMessage}
                                       </p>
                                    ) : (
                                       <p
                                          class="chat-box-admin__list-user-mess"
                                          style={{
                                             color: "black",
                                             fontWeight: "700",
                                          }}
                                       >
                                          {ele.messStatus.lastMessage}
                                       </p>
                                    )}
                                 </div>
                              </div>
                           ))}
                     </div>
                  </div>
               </div>
            )}
         </div>
      </div>
   );
};
