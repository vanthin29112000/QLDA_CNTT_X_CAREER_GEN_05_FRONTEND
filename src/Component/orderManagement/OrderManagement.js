import {
   Badge,
   Button,
   Popconfirm,
   Space,
   Spin,
   Table,
   Tag,
   Tooltip,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
   isLoading,
   listOrther,
} from "../../reduxToolkit/selector/ortherSelector";
import { formatDate, formatVND } from "../../service/formater";
import { LockOutlined, RollbackOutlined } from "@ant-design/icons";
import { getAllOrderForAdmin } from "../../reduxToolkit/thunk/ortherThunk";
import { HandleSearchDataTable } from "../../Layout/handleSearchDataTable/HandleSearchDataTable";

export const OrderManagement = () => {
   const loading = useSelector(isLoading);
   const dispatch = useDispatch();
   const listOrder = useSelector(listOrther);
   const [data, setData] = useState();

   useEffect(() => {
      dispatch(getAllOrderForAdmin());
   }, []);

   useEffect(() => {
      let temp = listOrder.map((ele, index) => {
         return {
            ...ele,
            key: index,
         };
      });
      setData(temp);
   }, [listOrder]);

   const expandedRowRender = (item) => {
      let count = 0;
      item.orderItems.forEach((ele) => {
         count += ele.qty;
      });

      const columnItem = [
         {
            title: "ID Sản phẩm",
            dataIndex: "idP",
            key: "idp",
         },
         {
            title: "Hình ảnh",
            dataIndex: "img",
            key: "img",
            render: (text) => (
               <img
                  src={text}
                  alt=".png"
                  style={{ width: "32px", objectFit: "cover" }}
               ></img>
            ),
         },
         {
            title: "Tên sản phẩm",
            dataIndex: "name",
            key: "name",
         },
         {
            title: "Tình trạng",
            render: (text, record) => (
               <div>
                  <p
                     style={{
                        marginBottom: "0",
                     }}
                  >
                     Áp dụng : {formatDate(record.effectiveDate)}
                  </p>
                  <p
                     style={{
                        marginBottom: "0",
                     }}
                  >
                     HSD : {formatDate(record.expirationDate)}
                  </p>
               </div>
            ),
         },
         {
            title: "Số lượng",
            dataIndex: "qty",

            key: "qty",
            render: (text) => (
               <p
                  style={{
                     marginBottom: "0",
                  }}
               >
                  {text}
               </p>
            ),
         },
         {
            title: "Tổng tiền",
            key: "totalCost",
            render: (text, record) => (
               <p
                  style={{
                     fontWeight: "600",
                     maxWidth: "400px",
                     color: "red",
                     marginBottom: "0",
                  }}
               >
                  {formatVND(record.qty * record.price)}
               </p>
            ),
         },
      ];

      const columnUser = [
         {
            title: "ID người dùng",
            dataIndex: "userID",
         },
         {
            title: "Email",
            dataIndex: "email",
            key: "email",
            render: (text) => (
               <p
                  style={{
                     fontWeight: "600",
                     maxWidth: "400px",
                     marginBottom: "0",
                  }}
               >
                  {text}
               </p>
            ),
         },
         {
            title: "Số điện thoại",
            dataIndex: "phone",
            key: "phone",
            render: (text) => (
               <p
                  style={{
                     fontWeight: "600",
                     maxWidth: "400px",
                     marginBottom: "0",
                  }}
               >
                  {text ? text : "Không có"}
               </p>
            ),
         },
         {
            title: "Địa chỉ",
            dataIndex: "address",
            key: "address",
            render: (text) => (
               <p style={{ fontWeight: "600", maxWidth: "400px" }}>
                  {`${text.mainAddress}, ${text.ward.name} , ${text.district.name}, ${text.city.name}`}
               </p>
            ),
         },
      ];
      console.log("item", item.orderItems.length);
      return (
         <>
            <HandleSearchDataTable></HandleSearchDataTable>
            <h6>Thông tin người đặt</h6>
            <Table
               columns={columnUser}
               dataSource={[item]}
               pagination={false}
            />
            <h6 style={{ marginTop: "8px" }}>Danh sách sản phẩm</h6>
            <Table
               columns={columnItem}
               dataSource={item.orderItems}
               pagination={false}
               bordered
               summary={() => (
                  <Table.Summary fixed>
                     <Table.Summary.Row>
                        <Table.Summary.Cell index={0} colSpan={4}>
                           <p
                              style={{
                                 fontWeight: "700",
                                 maxWidth: "400px",
                                 marginBottom: "0",
                              }}
                           >
                              Tổng cộng
                           </p>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={1}>
                           {count}
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={2}>
                           <p
                              style={{
                                 maxWidth: "400px",
                                 fontWeight: "700",
                                 marginBottom: "0",
                                 color: "red",
                              }}
                           >
                              {formatVND(item.totalMoney)}
                           </p>
                        </Table.Summary.Cell>
                     </Table.Summary.Row>
                  </Table.Summary>
               )}
            />
         </>
      );
   };

   const columns = [
      {
         title: "Mã đơn hàng",
         dataIndex: "_id",
         ket: "id",
         render: (text) => (
            <p style={{ fontWeight: "600", maxWidth: "400px", margin: 0 }}>
               #{text}
            </p>
         ),
      },
      {
         title: "Ngày đặt hàng",
         dataIndex: "createdAt",
         key: "createdAt",
         render: (text) => (
            <p style={{ fontWeight: "600", maxWidth: "400px", margin: 0 }}>
               {formatDate(text)}
            </p>
         ),
      },
      {
         title: "Email",
         dataIndex: "email",
         key: "userID",
         render: (text) => (
            <p style={{ fontWeight: "600", maxWidth: "400px", margin: 0 }}>
               {text}
            </p>
         ),
      },
      {
         title: "Số lượng voucher",
         dataIndex: "orderItems",
         key: "orderItems",
         render: (productList) => {
            let count = 0;
            productList.forEach((ele) => {
               count += ele.qty;
            });
            return (
               <p style={{ fontWeight: "600", maxWidth: "400px", margin: 0 }}>
                  {count}
               </p>
            );
         },
      },

      {
         title: "Tổng tiền",
         dataIndex: "totalMoney",
         key: "totalMoney",
         render: (text) => (
            <p
               style={{
                  fontWeight: "600",
                  maxWidth: "400px",
                  color: "red",
                  margin: 0,
               }}
            >
               {formatVND(text)}
            </p>
         ),
         sorter: (a, b) => a.totalCost - b.totalCost,
      },

      {
         title: "Hình thức thanh toán",
         dataIndex: "paymentType",
         key: "paymentType",

         render: (status) => {
            let img = "";
            switch (status) {
               case "zalopay": {
                  img = "./images/logo-payment/unnamed.png";
                  break;
               }

               case "momo": {
                  img = "/images/logo-payment/momo_icon_square_pinkbg.svg";
                  break;
               }
               case "visa": {
                  img = "/images/logo-payment/visa.png";
                  break;
               }
               case "atm": {
                  img = "/images/logo-payment/icon-payment-method-atm.svg";
                  break;
               }
               default: {
                  break;
               }
            }
            return (
               <img
                  src={img}
                  alt=".png"
                  style={{ width: "32px", objectFit: "cover" }}
               ></img>
            );
         },
         filters: [
            { text: "Momo", value: "momo" },
            { text: "ZaloPay", value: "zalopay" },
            { text: "Visa", value: "visa" },
            { text: "ATM", value: "atm" },
         ],
         onFilter: (value, record) => {
            return record.paymentType === value;
         },
      },

      Table.EXPAND_COLUMN,
   ];
   return (
      <Spin tip="Loading..." spinning={loading} style={{ fontSize: "1.2em" }}>
         <div>
            <div class="admin-title">
               <p style={{ margin: "0" }}>Quản lý đơn hàng</p>
            </div>
            <div class="admin-item__content">
               <div class="admin-item__filter">
                  <p style={{ fontWeight: "500", margin: "0" }}>
                     Danh sách đơn hàng
                  </p>
               </div>

               <div class="admin-item__list-news">
                  <Table
                     columns={columns}
                     dataSource={data}
                     column={{ align: "center" }}
                     expandable={{
                        expandedRowRender,
                        defaultExpandedRowKeys: ["0"],
                     }}
                     // onChange={onChange}
                     style={{ textAlign: "center" }}
                     pagination={{ position: ["bottomCenter "], pageSize: 5 }}
                  />
                  {/* <Table
                  columns={columns}
                  dataSource={listNew}
                  style={{ textAlign: "center" }}
                  pagination={{
                     position: ["none", "none"],
                  }}
               /> */}
                  <div
                     style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "8px",
                     }}
                  >
                     {/* {news.length > 0 && (
                     <Pagination
                        total={news.length}
                        defaultCurrent={1}
                        pageSize={countSize}
                        onChange={onHandlePagination}
                     />
                  )} */}
                  </div>
               </div>
            </div>
         </div>
      </Spin>
   );
};
