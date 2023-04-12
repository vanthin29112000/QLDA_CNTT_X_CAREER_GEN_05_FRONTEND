import { Button, Drawer, Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { UploadImage } from "../../Layout/uploadImage/UploadImage";
import { WarningNotify } from "../../Layout/warningNotify/WarningNotify";
import { TextEditor } from "../../Layout/textEditor/TextEditor";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { addNew, updateNew } from "../../reduxToolkit/thunk/newsThunk";
import { newsEditItem } from "../../reduxToolkit/selector/newsSelector";

const { Option } = Select;

export const AddNews = ({ onCloseAdd, openAdd, isEdit }) => {
   const [form] = Form.useForm();
   const formRef = React.useRef(null);
   const newItemEdit = useSelector(newsEditItem);
   const [newItem, setNewItem] = useState({
      imgThumbnail: "",
      title: "",
      status: "",
      type: "",
      content: "",
   });

   const dispatch = useDispatch();
   //    const [newItem, setNewItem] = useState({});

   // value warning
   const [warning, setWarning] = useState({
      imgThumbnail: {
         isShowWarning: false,
         textWarning: "",
      },
      content: {
         isShowWarning: false,
         textWarning: "",
      },
   });

   // value content
   const [objNews, setObjNews] = useState({
      imgThumbnail: "",
      content: "",
   });

   useEffect(() => {
      let temp = { ...warning };

      if (objNews.imgThumbnail !== "") {
         temp.imgThumbnail.isShowWarning = false;
         temp.imgThumbnail.textWarning = "";
      }

      if (objNews.content !== "") {
         temp.content.isShowWarning = false;
         temp.content.textWarning = "";
      }

      setWarning(temp);
   }, [objNews]);

   useEffect(() => {
      if (isEdit) {
         setNewItem(newItemEdit);
         setObjNews({
            imgThumbnail: newItemEdit.imgThumbnail,
            content: newItemEdit.content,
         });
         // console.log("newItem", newItemEdit);
         formRef.current?.setFieldsValue({
            title: newItemEdit.title,
            type: newItemEdit.type,
            status: newItemEdit.status,
         });
      }
   }, [newItemEdit, isEdit]);

   const onChangeImg = (url) => {
      setObjNews({ ...objNews, imgThumbnail: url });
   };

   const onCheckWarning = (name, text) => {
      let temp = { ...warning };
      if (objNews[name] === "") {
         temp[name].isShowWarning = true;

         temp[name].textWarning = text;
         setWarning(temp);
         return false;
      } else {
         temp[name].isShowWarning = false;
         temp[name].textWarning = "";
         setWarning(temp);
         return true;
      }
   };

   const onHandleWarning = () => {
      const textWarning = {
         imgThumbnail: "Vui lòng chọn hình ảnh !",
         content: "Vui lòng nhập nội dung bài viết !",
      };

      let flagImg = onCheckWarning("imgThumbnail", textWarning.imgThumbnail);
      let flagContent = onCheckWarning("content", textWarning.content);

      if (flagImg && flagContent) {
         return true;
      } else {
         return false;
      }
   };

   const onFinish = (e) => {
      const flag = onHandleWarning();
      if (flag) {
         const temp = { ...objNews, ...e };
         if (!isEdit) {
            dispatch(addNew(temp));
         } else {
            temp.id = newItemEdit._id;
            dispatch(updateNew(temp));
         }
         setObjNews({ imgThumbnail: "", content: "" });
         form.resetFields();
         onCloseAdd();
      }
   };
   return (
      <>
         <Drawer
            placement={"right"}
            width={500}
            onClose={onCloseAdd}
            open={openAdd}
            closable={false}
            title={isEdit ? "Chỉnh sửa tin tức" : "Thêm tin tức mới"}
            extra={
               <CloseCircleOutlined
                  style={{ fontSize: "1.2em", color: "#e1e1e1" }}
                  onClick={onCloseAdd}
               />
            }
         >
            <div class="drawer__content">
               <div class="drawer__content-item">
                  <div class="drawer__content-item-title">Ảnh Thumbnail :</div>
                  <UploadImage
                     nameFolder={"imgThumbnail"}
                     title={"Ảnh thumbnail"}
                     onChange={onChangeImg}
                     value={objNews.imgThumbnail}
                  ></UploadImage>

                  <WarningNotify
                     isShow={warning.imgThumbnail.isShowWarning}
                     text={warning.imgThumbnail.textWarning}
                  ></WarningNotify>
               </div>
               <Form
                  name="normal_login"
                  ref={formRef}
                  form={form}
                  onFinish={onFinish}
               >
                  <div class="drawer__content-item">
                     <div class="drawer__content-item-title">Tiêu đề :</div>
                     <Form.Item
                        name="title"
                        rules={[
                           {
                              required: true,
                              message: "Vui lòng nhập tiêu đề !",
                           },
                        ]}
                        style={{ marginBottom: "16px" }}
                     >
                        <Input />
                     </Form.Item>
                  </div>

                  <div class="drawer__content-item">
                     <div class="drawer__content-item-title">Thể loại :</div>
                     <Form.Item
                        name="type"
                        rules={[
                           {
                              required: true,
                              message: "Vui lòng chọn thể loại !",
                           },
                        ]}
                        style={{ marginBottom: "16px" }}
                        initialValue={newItem.status}
                     >
                        <Select
                           placeholder="Chọn thể loại bên dưới"
                           // onChange={onGenderChange}
                           options={[
                              {
                                 value: "technology",
                                 label: "Công nghệ",
                              },
                              {
                                 value: "appliances",
                                 label: "Gia dụng",
                              },
                              {
                                 value: "life",
                                 label: "Đời sống",
                              },
                              {
                                 value: "entertainment",
                                 label: "Giải trí",
                              },
                              {
                                 value: "promotion",
                                 label: "Khuyến mãi",
                              },
                           ]}
                        >
                           {/* <Option value="technology">Công nghệ</Option>
                           <Option value="appliances">Gia dụng</Option>
                           <Option value="life">Đời sống</Option>
                           <Option value="entertainment">Giải trí</Option> */}
                        </Select>
                     </Form.Item>
                  </div>

                  <div class="drawer__content-item">
                     <div class="drawer__content-item-title">Trạng thái :</div>
                     <Form.Item
                        name="status"
                        rules={[
                           {
                              required: true,
                              message: "Vui lòng chọn trạng thái !",
                           },
                        ]}
                        initialValue={newItem.status}
                     >
                        <Select
                           placeholder="Chọn trạng thái bên dưới"
                           // onChange={onGenderChange}
                           allowClear
                           //    defaultValue={newItem.status}
                        >
                           <Option value="highlights">Tin nổi bật</Option>
                           <Option value="new">Tin mới</Option>
                           <Option value="other">Khác</Option>
                        </Select>
                     </Form.Item>
                  </div>

                  <div class="drawer__content-item">
                     <div class="drawer__content-item-title">
                        Nội dung bài viết :
                     </div>

                     <TextEditor
                        onChange={(e) => {
                           setObjNews({ ...objNews, content: e });
                        }}
                        value={objNews.content}
                     ></TextEditor>
                     <WarningNotify
                        isShow={warning.content.isShowWarning}
                        text={warning.content.textWarning}
                     ></WarningNotify>
                  </div>
                  <Form.Item>
                     <div
                        style={{
                           width: "100%",
                           padding: "16px 0px",
                        }}
                     >
                        {isEdit ? (
                           <Button
                              type="primary"
                              class="btn-add-news"
                              htmlType="submit"
                              onClick={onHandleWarning}
                              style={{ width: "100%", float: "bottom" }}
                           >
                              Lưu thay đổi
                           </Button>
                        ) : (
                           <Button
                              type="primary"
                              class="btn-add-news"
                              htmlType="submit"
                              onClick={onHandleWarning}
                              style={{ width: "100%", float: "bottom" }}
                           >
                              Thêm tin tức
                           </Button>
                        )}
                     </div>
                  </Form.Item>
               </Form>
            </div>
         </Drawer>
      </>
   );
};
