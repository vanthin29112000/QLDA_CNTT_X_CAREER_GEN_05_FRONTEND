import React, { useEffect, useState } from "react";
import { child, onValue, push, query, ref, update } from "firebase/database";

import { database } from "../../firebase/config";
import "./Chat.css";
import TextArea from "antd/lib/input/TextArea";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Form, Popover, Tooltip } from "antd";
import { formatDateAndTime } from "../../service/formater";
export const Chat = ({ userName, id }) => {
   const [text, setText] = useState("");
   const [list, setList] = useState([]);
   const db = database;

   // listen event
   useEffect(() => {
      const starCountRef = query(ref(db, "chat/" + id));
      onValue(starCountRef, (snapshot) => {
         const data = snapshot.val();
         setList(onPrepareRender(Object.values(data)));
      });
   }, [id]);

   useEffect(() => {
      document.querySelector(".chat-box__list-mess").scrollBy(0, 100000);
   }, [list]);

   const onPrepareRender = (arr) => {
      const temp = [];
      for (let i = 0; i < arr.length; i++) {
         if (i === 0 || arr[i - 1].userName !== arr[i].userName) {
            let tempEle = { ...arr[i] };
            delete tempEle.message;
            tempEle.listMessage = [
               {
                  content: arr[i].message,
                  timestamp: arr[i].timestamp,
               },
            ];
            temp.push(tempEle);
         } else {
            temp[temp.length - 1].listMessage.push({
               content: arr[i].message,
               timestamp: arr[i].timestamp,
            });
         }
      }
      return temp;
   };

   const submit = () => {
      if (text.trim() !== "" && text !== "") {
         const newPostKey = push(child(ref(db), "chat/" + id)).key;
         const updates = {};
         updates[`/chat/${id}/` + newPostKey] = {
            userName: userName,
            message: text.trim(),
            timestamp: Date.now(),
         };

         let seen = {};
         if (userName !== "CSKH") {
            seen = {
               client: true,
               admin: false,
            };
         } else {
            seen = {
               client: false,
               admin: true,
            };
         }

         updates[`/group/${id}`] = {
            lastMessage: text.trim(),
            isSeen: { client: seen.client, admin: seen.admin },
            timestamp: Date.now(),
         };

         update(ref(db), updates);
      }
      setText("");
   };

   const onChangeText = (e) => {
      const temp = e.target.value;
      setText(temp);
   };

   const onAddIcon = (icon) => {
      let temp = text + icon;
      setText(temp);
   };

   const icon =
      "🙂 😀 😄 😆 😅 😂 🤣 😊 ☺️ 😌 😉 😏 😍 😘 😗 😙 😚 🤗 😳 🙃 😇 😈 😛 😝 😜 😋 🤤 🤓 😎 🤑 😒 🙁 ☹️ 😞 😔 😖 😓 😢 😢 😭 😟 😣 😩 😫 😕 🤔 🙄 😤 😠 😡 😶 🤐 😐 😑 😯 😲 😧 😨 😰 😱 😪 😴 😬 🤥 🤧 🤒 😷 🤕 😵 🤢 🤠 🤡 👿 👹 👺 👻 💀 👽 👾 🤖 💩 🎃";

   return (
      <div class="chat-box__container">
         <div class="chat-box__list-mess">
            {list.length > 0 &&
               list.map((ele, index) =>
                  ele.userName !== userName ? (
                     <div class="chat-box__mess-item mess-item-send">
                        <div class="mess-item__avatar">
                           <Avatar
                              style={{ backgroundColor: "#87d068" }}
                              icon={<UserOutlined />}
                           />
                        </div>

                        <div>
                           {ele.listMessage.length > 0 &&
                              ele.listMessage.map((item) => (
                                 <div class="mess-item__content">
                                    <Tooltip
                                       placement="right"
                                       title={formatDateAndTime(item.timestamp)}
                                       arrow={"Hide"}
                                       style={{ fontSize: "14px" }}
                                    >
                                       <div>{item.content}</div>
                                    </Tooltip>
                                 </div>
                              ))}
                        </div>
                     </div>
                  ) : (
                     <div class="chat-box__mess-item mess-item-receive">
                        <div class="mess-item__avatar">
                           <Avatar
                              style={{ backgroundColor: "#87d068" }}
                              icon={<UserOutlined />}
                           />
                        </div>
                        <div
                           style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-end",
                           }}
                        >
                           {ele.listMessage.length > 0 &&
                              ele.listMessage.map((item) => (
                                 <div class="mess-item__content">
                                    <Tooltip
                                       placement="left"
                                       title={formatDateAndTime(item.timestamp)}
                                       arrow={"Hide"}
                                    >
                                       <div>{item.content}</div>
                                    </Tooltip>
                                 </div>
                              ))}
                        </div>
                     </div>
                  )
               )}
         </div>
         <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={submit}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
         >
            <div class="chat-box__mess-content">
               {/* <label for="upload-img">
               <i class="fa-regular fa-image"></i>
            </label>

            <input
               type="file"
               accept=".jpg, .png"
               id="upload-img"
               style={{ display: "none" }}

               onChange = {}
               multiple
            /> */}
               <i class="fa-solid fa-circle-plus"></i>
               <div class="chat-box__mess-icon">
                  <Form.Item
                     style={{
                        width: "100%",
                        marginRight: "8px",
                        marginBottom: "0px",
                     }}
                  >
                     <TextArea
                        placeholder="Tin nhắn"
                        autoSize={{ minRows: 1, maxRows: 4 }}
                        onChange={onChangeText}
                        value={text}
                        bordered={false}
                     />
                  </Form.Item>

                  <Popover
                     placement="top"
                     content={
                        <div class="icon-box">
                           {icon.split(" ").length > 0 &&
                              icon.split(" ").map((ele) => (
                                 <span class="icon-box__item">
                                    <span
                                       onClick={() => {
                                          onAddIcon(ele);
                                       }}
                                    >
                                       {ele}
                                    </span>
                                 </span>
                              ))}
                        </div>
                     }
                     trigger="click"
                  >
                     <i class="fa-regular fa-face-smile" type="submit"></i>{" "}
                  </Popover>
               </div>
               <Form.Item
                  style={{
                     marginBottom: "0px",
                  }}
               >
                  <Button
                     type="text"
                     style={{ width: "fit-content", padding: "0" }}
                     htmlType="submit"
                  >
                     <i class="fa-solid fa-paper-plane"></i>
                  </Button>
               </Form.Item>
            </div>
         </Form>
      </div>
   );
};
