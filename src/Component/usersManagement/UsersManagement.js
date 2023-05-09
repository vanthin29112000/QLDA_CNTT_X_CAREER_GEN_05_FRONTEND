import {
   DeleteOutlined,
   FilterOutlined,
   LockOutlined,
   PlusCircleOutlined,
   RollbackOutlined,
} from "@ant-design/icons";
import {
   Button,
   Modal,
   Popconfirm,
   Space,
   Spin,
   Table,
   Tag,
   Tooltip,
} from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { blockingUser, getAllUsers } from "../../reduxToolkit/thunk/staffThunk";
import { isLoading, listUser } from "../../reduxToolkit/selector/staffSelector";
import { formatVND } from "../../service/formater";

export const UsersManagement = () => {
   const dispatch = useDispatch();
   const loading = useSelector(isLoading);

   const users = useSelector(listUser);
   useEffect(() => {
      dispatch(getAllUsers());
   }, []);

   const columns = [
      {
         title: "Avatar",
         dataIndex: "avatar",
         render: (text) => (
            <img
               src={text}
               alt=".png"
               style={{ width: "32px", objectFit: "cover" }}
            ></img>
         ),
         width: "fit-content",
      },
      {
         title: "Họ và tên",
         dataIndex: "name",
      },
      {
         title: "Email",
         dataIndex: "email",
         key: "email",
         render: (text) => (
            <p style={{ fontWeight: "600", maxWidth: "400px" }}>{text}</p>
         ),
      },
      {
         title: "Số điện thoại",
         dataIndex: "phone",
         key: "phone",
         render: (text) => (
            <p style={{ fontWeight: "600", maxWidth: "400px" }}>
               {text ? text : "Không có"}
            </p>
         ),
      },

      {
         title: "Số tiền đã thanh toán",
         dataIndex: "totalCost",
         key: "totalCost",
         render: (text) => (
            <p style={{ fontWeight: "600", maxWidth: "400px", color: "red" }}>
               {formatVND(text)}
            </p>
         ),
         sorter: (a, b) => a.totalCost - b.totalCost,
      },
      {
         title: "Số voucher đã mua",
         dataIndex: "qtyPurchased",
         key: "qtyPurchased",
         render: (text) => (
            <p style={{ fontWeight: "600", maxWidth: "400px" }}>{text}</p>
         ),
         sorter: (a, b) => a.qtyPurchased - b.qtyPurchased,
      },

      {
         title: "Trạng thái",
         key: "block",
         dataIndex: "block",
         render: (status) => {
            let color = "";
            let title = "";

            switch (status.isBLocking) {
               case false: {
                  color = "green";
                  title = "Hoạt động";
                  break;
               }

               case true: {
                  color = "volcano";
                  title = "Đã xóa";
                  break;
               }

               default: {
                  break;
               }
            }
            return (
               <Tag color={color} key={status}>
                  {title.toUpperCase()}
               </Tag>
            );
         },
         filters: [
            { text: "Hoạt động", value: false },
            { text: "Đã xóa", value: true },
         ],
         onFilter: (value, record) => {
            console.log("hello", record.block.isBLocking, value);
            return record.block.isBLocking === value;
         },
      },
      {
         title: "",
         key: "action",
         dataIndex: "block",
         render: (status, record) => {
            // console.log("record", record);

            return (
               <Space
                  style={{
                     width: "100%",
                     display: "flex",
                     justifyContent: "center",
                     // gap: "0px",
                  }}
               >
                  {!status.isBLocking ? (
                     <>
                        <Popconfirm
                           placement="bottom"
                           title={"Bạn thực sự muốn khóa tài khoản này ?"}
                           onConfirm={() => {
                              dispatch(blockingUser(record._id));
                           }}
                           okText="Có "
                           cancelText="Không"
                        >
                           <Tooltip placement="bottom" title={"Khóa tài khoản"}>
                              <Button
                                 type="text"
                                 danger
                                 style={{
                                    border: "none",
                                    backgroundColor: "unset",
                                    boxShadow: "none",
                                    padding: "0 4px",
                                    // gap: "0px",
                                    width: "fit-content",
                                 }}
                              >
                                 <LockOutlined />
                              </Button>
                           </Tooltip>
                        </Popconfirm>
                     </>
                  ) : (
                     <>
                        <Popconfirm
                           placement="bottom"
                           title={"Bạn thực sự muốn mở lại tài khoản này ?"}
                           onConfirm={() => {
                              // dispatch(deleteNew(record._id));
                              dispatch(blockingUser(record._id));
                           }}
                           okText="Có "
                           cancelText="Không"
                        >
                           <Tooltip
                              placement="bottom"
                              title={"Mở lại tài khoản"}
                           >
                              <Button
                                 type="text"
                                 primary
                                 style={{
                                    border: "none",
                                    backgroundColor: "unset",
                                    boxShadow: "none",
                                    padding: "0 4px",
                                    // gap: "0px",
                                    width: "fit-content",
                                 }}
                                 // onClick={() => onEditNew(record._id)}
                              >
                                 <RollbackOutlined />
                              </Button>
                           </Tooltip>
                        </Popconfirm>
                     </>
                  )}
               </Space>
            );
         },
      },
   ];
   const data = users;

   return (
      <Spin tip="Loading..." spinning={loading} style={{ fontSize: "1.2em" }}>
         <div>
            <div class="admin-title">
               <p style={{ margin: "0" }}>Quản lý người dùng</p>
            </div>
            <div class="admin-item__content">
               <div class="admin-item__filter">
                  <p style={{ fontWeight: "500", margin: "0" }}>
                     Danh sách người dùng
                  </p>
                  {/* <div class="ai__filter-item">
                     <Button
                        type="primary"
                        style={{
                           marginRight: "8px",
                           display: "flex",
                           alignItems: "center",
                        }}
                        icon={<PlusCircleOutlined />}
                        onClick={() => {
                           // setOpenAdd(true);
                        }}
                     >
                        Thêm tin tức mới
                     </Button>
                     <Button
                        icon={<FilterOutlined />}
                        style={{ display: "flex", alignItems: "center" }}
                        onClick={() => {
                           // setOpenFilter(true);
                        }}
                     >
                        Lọc & Sắp xếp
                     </Button>
                  </div> */}
               </div>

               <div class="admin-item__list-news">
                  <Table
                     columns={columns}
                     dataSource={data}
                     column={{ align: "center" }}
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
