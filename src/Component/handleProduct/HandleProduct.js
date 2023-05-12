import {
   ExclamationCircleOutlined,
   SaveOutlined,
   UploadOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import "./HandleProduct.css";

import { PlusOutlined } from "@ant-design/icons";
import {
   Button,
   DatePicker,
   Form,
   Input,
   InputNumber,
   Select,
   Upload,
   Drawer,
   Space,
   Divider,
   message,
   Modal,
} from "antd";
import dayjs from "dayjs";

import { TextEditor } from "../../Layout/textEditor/TextEditor";
import { uploadFirebase } from "../../service/upload";
import { useDispatch, useSelector } from "react-redux";
import {
   createNewProduct,
   deleteProduct,
   getProductByID,
   updateProduct,
} from "../../reduxToolkit/thunk/productThunk";
import { productEdit } from "../../reduxToolkit/selector/productsSelector";
import moment from "moment";
import { formatDate } from "../../service/formater";
const { RangePicker } = DatePicker;
export const HandleProduct = ({ isShow, setIsShow, isEdit }) => {
   const [open, setOpen] = useState(false);
   const dispatch = useDispatch();
   const [form] = Form.useForm();
   const [modal, contextHolder] = Modal.useModal();
   const formRef = React.useRef(null);
   const [openModal, setOpenModal] = useState(false);

   const okComfirm = () => {
      setOpenModal(false);
      dispatch(deleteProduct(productItem.info._id));
   };

   const hideModal = () => {
      setOpenModal(false);
   };
   const onClose = () => {
      setIsShow(false);
      //   ref.isShow = false;
   };

   const productItem = useSelector(productEdit);
   const dateFormat = "DD/MM/YYYY";

   useEffect(() => {
      console.log("show", isShow);
      setOpen(isShow);
   }, [isShow, isEdit]);

   useEffect(() => {
      if (productItem !== "" && isEdit) {
         let indexBrand = brandsOption.findIndex(
            (ele) => ele.label.toLowerCase() === productItem.info.brand.name
         );

         let tempImg = productItem.info.images.map((ele, index) => {
            return {
               uid: index,
               name: "image.png",
               status: "done",
               url: ele,
            };
         });

         setFileList(tempImg);

         let tempEffectiveDate = formatDate(productItem.info.effectiveDate);
         let tempExpirationDate = formatDate(productItem.info.expirationDate);

         formRef.current?.setFieldsValue({
            name: productItem.info.name,
            img: tempImg,
            category: productItem.info.category,
            content: productItem.info.desc,
            brand: indexBrand,
            website: productItem.info.website,
            price: productItem.info.price,
            countInStock:
               productItem.info.countInStock - productItem.info.countSold,
            duration: [
               moment(tempEffectiveDate, dateFormat),
               moment(tempExpirationDate, dateFormat),
            ],
            userManual: productItem.info.userManual,
            rules: productItem.info.rules,
            listVoucher: productItem.code,
         });
      }
   }, [productItem, isEdit]);

   const optionCategory = [
      {
         value: "Gia dụng",
         label: "Gia dụng",
      },
      {
         value: "Điện máy",

         label: "Điện máy",
      },
      {
         value: "Điện thoại",
         label: "Điện thoại",
      },
      {
         value: "Mua sắm",
         label: "Mua sắm",
      },
      {
         value: "Giày / Dép",
         label: "Giày / Dép",
      },
   ];

   const brandsOption = [
      {
         label: "Tiki",
         value: 0,
      },
      {
         label: "Lazada",
         value: 1,
      },
      {
         label: "Shopee",
         value: 2,
      },
      {
         label: "Grab",
         value: 3,
      },
      {
         label: "Fahasa",
         value: 4,
      },
      {
         label: "Sendo",
         value: 5,
      },
   ];

   const brands = [
      {
         label: "Tiki",
         value: {
            name: "tiki",
            img: "https://firebasestorage.googleapis.com/v0/b/x-career-05-project-final.appspot.com/o/brand%2FLogo_Tiki.png?alt=media&token=fb3b27ea-65bc-4095-b9c2-d68ba6fc245b",
         },
      },
      {
         label: "lazada",
         value: {
            name: "lazada",
            img: "https://firebasestorage.googleapis.com/v0/b/x-career-05-project-final.appspot.com/o/brand%2Fma-giam-gia-lazada.webp?alt=media&token=140314c0-1f94-41b7-b800-b5dcb3a78aa9",
         },
      },
      {
         label: "shopee",
         value: {
            name: "shopee",
            img: "https://firebasestorage.googleapis.com/v0/b/x-career-05-project-final.appspot.com/o/brand%2Fma-giam-gia-shopee.webp?alt=media&token=5f7b1185-137f-466d-8596-17e5c1abc78a",
         },
      },
      {
         label: "grab",
         value: {
            name: "grab",
            img: "https://firebasestorage.googleapis.com/v0/b/x-career-05-project-final.appspot.com/o/brand%2Fgrab-logo.webp?alt=media&token=7d8b3ab8-406c-4b00-9fcd-5d0531b1210a",
         },
      },
      {
         label: "fahasa",
         value: {
            name: "fahasa",
            img: "https://firebasestorage.googleapis.com/v0/b/x-career-05-project-final.appspot.com/o/brand%2Flogo-fahasha.webp?alt=media&token=10e8d289-2a89-46f9-8c70-abac93bb9276",
         },
      },
      {
         label: "sendo",
         value: {
            name: "sendo",
            img: "https://firebasestorage.googleapis.com/v0/b/x-career-05-project-final.appspot.com/o/brand%2Fma-giam-gia-sendo.webp?alt=media&token=ab9dd141-bf16-4d92-a67f-9f071c55ed7a",
         },
      },
   ];

   // upload img product
   const [fileList, setFileList] = useState([]);

   const handleChange = async ({ fileList: newFileList }) => {
      console.log(newFileList);
      let tempListFile = [...fileList];
      if (newFileList.length > fileList.length) {
         for (let i = fileList.length; i < newFileList.length; i++) {
            console.log("i", i);
            const isJpgOrPng =
               newFileList[i].type === "image/jpeg" ||
               newFileList[i].type === "image/png" ||
               newFileList[i].type === "image/webp";
            if (!isJpgOrPng) {
               message.error("Vui lòng chỉ upload file hình ảnh!");
            } else {
               try {
                  const link = await uploadFirebase(
                     newFileList[i].originFileObj,
                     "/brand"
                  );
                  tempListFile.push({
                     uid: tempListFile.length,
                     name: "image.png",
                     status: "done",
                     url: link,
                  });
               } catch (error) {
                  message.error("Không thể tải tệp lên !");
               }
            }
         }

         setFileList(tempListFile);
      } else {
         setFileList(newFileList);
      }
   };

   // submit product
   const onSubmit = (e) => {
      if (!isEdit) {
         let tempImg = [];
         fileList.forEach((ele) => {
            tempImg.push(ele.url);
         });

         const data = {
            name: e.name,
            images: tempImg,
            brand: brands[e.brand].value,
            category: e.category,
            desc: e.content,
            website: e.website,
            price: Number(e.price),
            countInStock: Number(e.countInStock),
            effectiveDate: e.duration[0],
            expirationDate: e.duration[1],
            userManual: e.userManual,
            rules: e.rules,
            code: e.listVoucher,
         };

         setIsShow(false);
         setFileList([]);
         dispatch(createNewProduct(data));
         form.resetFields();
      } else {
         let tempImg = [];
         fileList.forEach((ele) => {
            tempImg.push(ele.url);
         });
         console.log(
            "countInStock",
            Number(e.countInStock),
            productItem.info.countInSold
         );
         const data = {
            name: e.name,
            images: tempImg,
            brand: brands[e.brand].value,
            category: e.category,
            desc: e.content,
            website: e.website,
            price: Number(e.price),
            countInStock: Number(e.countInStock) + productItem.info.countSold,
            effectiveDate: e.duration[0],
            expirationDate: e.duration[1],
            userManual: e.userManual,
            rules: e.rules,
            code: e.listVoucher,
         };
         dispatch(updateProduct({ ...data, id: productItem.info._id }));
      }
   };

   return (
      <Drawer
         title="Chi tiết sản phẩm"
         placement={"right"}
         width={800}
         onClose={onClose}
         open={open}
         extra={
            isEdit && productItem !== "" ? (
               !productItem.info.deleteInfo.isDelete ? (
                  <Space>
                     <Button
                        type="primary"
                        onClick={() => {
                           modal.confirm({
                              title: "Bạn có muốn xóa sản phẩm này ?",
                              icon: <ExclamationCircleOutlined />,
                              content: "",
                              okText: "Đồng ý",
                              cancelText: "Trở lại",
                              onOk: okComfirm,
                           });
                        }}
                        danger
                     >
                        Xóa sản phẩm
                     </Button>
                     {contextHolder}
                  </Space>
               ) : (
                  <Space>
                     <Button
                        type="primary"
                        onClick={() => {
                           modal.confirm({
                              title: "Bạn có muốn khôi phục lại sản phẩm này ?",
                              icon: <ExclamationCircleOutlined />,
                              content: "",
                              okText: "Đồng ý",
                              cancelText: "Trở lại",
                              onOk: okComfirm,
                           });
                        }}
                     >
                        Khôi phục sản phẩm
                     </Button>
                     {contextHolder}
                  </Space>
               )
            ) : (
               <></>
            )
         }
      >
         <Form
            layout="horizontal"
            onFinish={onSubmit}
            ref={formRef}
            form={form}
            disabled={
               productItem !== "" && productItem.info.deleteInfo.isDelete
            }
         >
            <div class="handle-product">
               <div class="handle-product__container">
                  <div class="handle-product__left">
                     <Divider orientation="left">Thêm sản phẩm mới</Divider>

                     <div class="handle-product__title">Tên sản phẩm :</div>
                     <Form.Item
                        name="name"
                        style={{ marginBottom: "0px" }}
                        rules={[
                           {
                              required: true,
                              message: "Vui lòng nhập tên sản phẩm !",
                           },
                        ]}
                     >
                        <Input />
                     </Form.Item>

                     <div class="handle-product__title">Thương hiệu :</div>
                     <Form.Item
                        name="brand"
                        style={{ marginBottom: "0px" }}
                        rules={[
                           {
                              required: true,
                              message: "Vui lòng nhập tên sản phẩm !",
                           },
                        ]}
                     >
                        <Select options={brandsOption} />
                     </Form.Item>

                     <div class="handle-product__title">Danh mục :</div>
                     <Form.Item
                        name="category"
                        style={{ marginBottom: "0px" }}
                        rules={[
                           {
                              required: true,
                              message: "Vui lòng chọn danh mục !",
                           },
                        ]}
                     >
                        <Select
                           mode="multiple"
                           allowClear
                           style={{ width: "100%" }}
                           // placeholder=""
                           // defaultValue={["a10", "c12"]}
                           // onChange={handleChange}
                           options={optionCategory}
                        />
                     </Form.Item>

                     <div class="handle-product__title">Giá sản phẩm :</div>
                     <Form.Item
                        name="price"
                        style={{ marginBottom: "0px" }}
                        rules={[
                           {
                              required: true,
                              message: "Vui lòng nhập giá tiền !",
                           },
                           {
                              validator: (_, value) => {
                                 if (!value || /^[0-9]*$/.test(value)) {
                                    return Promise.resolve();
                                 }
                                 return Promise.reject(
                                    new Error("Vui lòng nhập đúng định dạng số")
                                 );
                              },
                           },
                        ]}
                     >
                        <Input suffix="VND" />
                     </Form.Item>

                     <div class="handle-product__title">Số lượng bán :</div>
                     <Form.Item
                        name="countInStock"
                        style={{ marginBottom: "0px" }}
                        rules={[
                           {
                              required: true,
                              message: "Vui lòng nhập số lượng !",
                           },
                        ]}
                     >
                        <InputNumber style={{ width: "100%" }} />
                     </Form.Item>

                     <div class="handle-product__title">Thời hạn áp dụng :</div>
                     <Form.Item
                        name="duration"
                        style={{ marginBottom: "0px" }}
                        rules={[
                           {
                              required: true,
                              message: "Vui lòng chọn thời hạn áp dụng !",
                           },
                        ]}
                     >
                        <RangePicker
                           style={{ width: "100%" }}
                           format={dateFormat}
                        />
                     </Form.Item>
                     <div class="handle-product__title">Website :</div>
                     <Form.Item
                        name="website"
                        style={{ marginBottom: "0px" }}
                        rules={[
                           {
                              required: true,
                              message: "Vui lòng nhập website !",
                           },
                        ]}
                     >
                        <Input />
                     </Form.Item>
                     <div class="handle-product__title">
                        Danh sách voucher :
                     </div>
                     <Form.Item
                        name="listVoucher"
                        style={{ marginBottom: "0px" }}
                        rules={[
                           ({ getFieldValue }) => ({
                              validator(_, value) {
                                 console.log("value voucher", value);
                                 if (
                                    !value ||
                                    getFieldValue("countInStock") ===
                                       value.length
                                 ) {
                                    return Promise.resolve();
                                 }
                                 return Promise.reject(
                                    new Error("Số lượng voucher không khớp!")
                                 );
                              },
                           }),
                        ]}
                     >
                        <Select
                           mode="tags"
                           style={{ width: "100%" }}
                           placeholder="Tags Mode"
                           // onChange={handleChange}
                           // options={options}
                        />
                     </Form.Item>
                  </div>

                  <div class="handle-product__right">
                     <Divider orientation="left">Hình ảnh sản phẩm</Divider>
                     <Form.Item
                        name="img"
                        style={{ marginBottom: "0px" }}
                        rules={[
                           {
                              required: true,
                              message: "Vui lòng chọn hình ảnh cho sản phẩm!",
                           },
                        ]}
                     >
                        <Upload
                           listType="picture-card"
                           // beforeUpload={beforeUpload}
                           fileList={fileList}
                           onChange={handleChange}
                           multiple
                        >
                           <div>
                              <PlusOutlined />
                              <div style={{ marginTop: 8 }}>Upload</div>
                           </div>
                        </Upload>
                     </Form.Item>
                  </div>
               </div>
               <div class="handle-product__bottom">
                  <Divider orientation="left">Nội dung sản phẩm</Divider>
                  <Form.Item
                     name="content"
                     style={{ marginBottom: "0px" }}
                     rules={[
                        {
                           required: true,
                           message: "Vui lòng nhập nội dung cho sản phẩm!",
                        },
                     ]}
                  >
                     <TextEditor
                        onChange={(e) => {
                           // setObjNews({ ...objNews, content: e });
                        }}
                        //  value={objNews.content}
                     ></TextEditor>
                  </Form.Item>

                  <Divider orientation="left">
                     Hướng dẫn sử dụng voucher
                  </Divider>
                  <Form.Item
                     name="userManual"
                     style={{ marginBottom: "0px" }}
                     rules={[
                        {
                           required: true,
                           message: "Vui lòng nhập nội dung cho sản phẩm!",
                        },
                     ]}
                  >
                     <TextEditor
                        onChange={(e) => {
                           // setObjNews({ ...objNews, content: e });
                        }}
                        //  value={objNews.content}
                     ></TextEditor>
                  </Form.Item>

                  <Divider orientation="left">Điều khoản & điều kiện</Divider>
                  <Form.Item
                     name="rules"
                     style={{ marginBottom: "0px" }}
                     rules={[
                        {
                           required: true,
                           message: "Vui lòng nhập nội dung cho sản phẩm!",
                        },
                     ]}
                  >
                     <TextEditor
                        onChange={(e) => {
                           // setObjNews({ ...objNews, content: e });
                        }}
                        //  value={objNews.content}
                     ></TextEditor>
                  </Form.Item>
               </div>
            </div>
            <Form.Item>
               <div class="handle-product__submit">
                  <Button
                     type="primary"
                     class="btn-add-news"
                     htmlType="submit"
                     style={{ width: "100%" }}
                     // onClick={onHandleWarning}
                  >
                     Lưu sản phẩm
                  </Button>
               </div>
            </Form.Item>
         </Form>
      </Drawer>
   );
};
