import { Button, Checkbox, Input, Table } from "antd";
import React, { useEffect, useState } from "react";
import { formatDate, formatVND } from "../../service/formater";
import "./OrderList.css";
import { useDispatch, useSelector } from "react-redux";
import {
   getOrtherForCustomer,
   updateUsedVoucher,
} from "../../reduxToolkit/thunk/ortherThunk";
import {
   listOrther,
   notification,
} from "../../reduxToolkit/selector/ortherSelector";
import { openNotificationWithIcon } from "../../Layout/notification/Notification";
import {
   handleEndNotification,
   setNotification,
} from "../../reduxToolkit/slice/ortherSlice";
export const OrderList = () => {
   const dispatch = useDispatch();
   const orthers = useSelector(listOrther);
   const [data, setData] = useState([]);
   useEffect(() => {
      dispatch(getOrtherForCustomer());
   }, []);

   const notify = useSelector(notification);

   useEffect(() => {
      if (notify.isShow) {
         openNotificationWithIcon(notify.type, notify.message);
         dispatch(handleEndNotification());
      }
   }, [notify]);

   const columns = [
      {
         title: "Sản phẩm",
         dataIndex: "product",
         //  width: "30%",
         render: (text) => (
            <div style={{ display: "flex", alignItems: "center" }}>
               <img
                  src={text.img}
                  alt=".png"
                  style={{
                     width: "64px",
                     objectFit: "cover",
                     marginRight: "16px",
                  }}
               ></img>
               <h6>{text.name}</h6>
            </div>
         ),
      },
      {
         title: "Tình trạng",
         dataIndex: "status",

         // sorter: (a, b) => a.age - b.age,
         render: (text) => (
            <div>
               <p
                  style={{
                     marginBottom: "0",
                  }}
               >
                  Áp dụng : {formatDate(text.effectiveDate)}
               </p>
               <p
                  style={{
                     marginBottom: "0",
                  }}
               >
                  HSD : {formatDate(text.expirationDate)}
               </p>
            </div>
         ),
      },
      {
         title: "Mã đơn hàng",
         dataIndex: "invoiceID",
         render: (text) => (
            <p
               style={{
                  fontWeight: "600",
                  maxWidth: "400px",
                  marginBottom: "0",
               }}
            >
               {" "}
               #{text}
            </p>
         ),
         //  width: "40%",
      },

      {
         title: "Tổng tiền",
         dataIndex: "price",
         render: (text) => (
            <p
               style={{
                  fontWeight: "600",
                  maxWidth: "400px",
                  color: "red",
                  marginBottom: "0",
               }}
            >
               {formatVND(text)}
            </p>
         ),
         //  width: "40%",
      },
      {
         title: "Mã giảm giá",
         dataIndex: "code",
         render: (text) => (
            <>
               {text.map((ele) => (
                  <div class="code-voucher">
                     <Input
                        disabled
                        defaultValue={ele.name}
                        style={{ width: "150px", border: "none" }}
                     />
                     <Button
                        type="primary"
                        onClick={() => {
                           onCopyCode(ele.name);
                        }}
                     >
                        Sao chép
                     </Button>
                  </div>
               ))}
            </>
         ),
         //  width: "40%",
      },

      {
         title: "Đã sử dụng",
         dataIndex: "code",
         render: (text) => (
            <>
               {text.map((ele) => (
                  <div
                     style={{
                        height: "32px",
                        margin: "8px 0px",
                        textAlign: "center",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                     }}
                  >
                     <Checkbox
                        checked={ele.isUsed}
                        onChange={() => {
                           onUpdateUsedVoucher(ele.name);
                        }}
                     ></Checkbox>
                  </div>
               ))}
            </>
         ),
         //  width: "40%",
      },
   ];

   useEffect(() => {
      if (orthers.length > 0) {
         let listOrther = [];
         for (let item of orthers) {
            const temp = item.orderItems.map((ele) => {
               return { ...ele, invoiceID: item._id };
            });

            listOrther = [...listOrther, ...temp];
         }

         console.log("temp", listOrther);
         const temp = listOrther.map((ele) => {
            console.log("ele", ele);
            return {
               product: {
                  name: ele.name,
                  img: ele.img,
               },
               status: {
                  effectiveDate: ele.effectiveDate,
                  expirationDate: ele.expirationDate,
               },
               price: ele.price * ele.qty,
               code: ele.code,
               invoiceID: ele.invoiceID,
            };
         });

         setData(temp);
      }
   }, [orthers]);

   const onChange = (pagination, filters, sorter, extra) => {
      console.log("params", pagination, filters, sorter, extra);
   };

   const onCopyCode = (text) => {
      navigator.clipboard.writeText(text);
      dispatch(
         setNotification({
            type: "success",
            message: `Đã lưu mã "${text}" vào bộ nhớ`,
         })
      );
   };

   const onUpdateUsedVoucher = (code) => {
      console.log("code", code);

      for (let item of orthers) {
         item.orderItems.forEach((ele) => {
            const tempIndex = ele.code.findIndex((temp) => temp.name === code);
            if (tempIndex !== -1) {
               dispatch(
                  updateUsedVoucher({
                     invoiceId: item._id,
                     idP: ele.idP,
                     code: code,
                  })
               );
               return;
            }
         });
      }
   };

   return (
      <div style={{ backgroundColor: "#E5E9Eb", padding: "16px 0px" }}>
         <div class="container">
            <h3>Voucher đã mua</h3>
            <Table
               columns={columns}
               dataSource={data}
               onChange={onChange}
               pagination={{
                  pageSize: 5,
               }}
            />
         </div>
      </div>
   );
};
