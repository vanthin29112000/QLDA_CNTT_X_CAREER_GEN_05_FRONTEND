import {
   DeleteOutlined,
   FilterOutlined,
   LockOutlined,
   PlusCircleOutlined,
   RollbackOutlined,
   SearchOutlined,
} from "@ant-design/icons";
import {
   Button,
   Input,
   Popconfirm,
   Space,
   Spin,
   Table,
   Tag,
   Tooltip,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { blockingUser, getAllUsers } from "../../reduxToolkit/thunk/staffThunk";
import { isLoading, listUser } from "../../reduxToolkit/selector/staffSelector";
import { formatVND } from "../../service/formater";
import Highlighter from "react-highlight-words";

export const UsersManagement = () => {
   const dispatch = useDispatch();
   const loading = useSelector(isLoading);
   const users = useSelector(listUser);

   const [searchText, setSearchText] = useState("");
   const [searchedColumn, setSearchedColumn] = useState("");
   const searchInput = useRef(null);
   const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
   };
   const handleReset = (clearFilters) => {
      clearFilters();
      setSearchText("");
   };
   const getColumnSearchProps = (dataIndex) => ({
      filterDropdown: ({
         setSelectedKeys,
         selectedKeys,
         confirm,
         clearFilters,
         close,
      }) => (
         <div
            style={{
               padding: 8,
            }}
            onKeyDown={(e) => e.stopPropagation()}
         >
            <Input
               ref={searchInput}
               placeholder={`Tìm kiếm`}
               value={selectedKeys[0]}
               onChange={(e) =>
                  setSelectedKeys(e.target.value ? [e.target.value] : [])
               }
               onPressEnter={() =>
                  handleSearch(selectedKeys, confirm, dataIndex)
               }
               style={{
                  marginBottom: 8,
                  display: "block",
               }}
            />
            <Space>
               <Button
                  type="primary"
                  onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                  icon={<SearchOutlined />}
                  size="small"
                  style={{
                     width: 90,
                  }}
               >
                  Tìm
               </Button>
               <Button
                  onClick={() => clearFilters && handleReset(clearFilters)}
                  size="small"
                  style={{
                     width: 90,
                  }}
               >
                  Đặt lại
               </Button>
            </Space>
         </div>
      ),
      filterIcon: (filtered) => (
         <SearchOutlined
            style={{
               color: filtered ? "#1890ff" : undefined,
            }}
         />
      ),
      onFilter: (value, record) =>
         record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
      onFilterDropdownOpenChange: (visible) => {
         if (visible) {
            setTimeout(() => searchInput.current?.select(), 100);
         }
      },
      render: (text) =>
         searchedColumn === dataIndex ? (
            <Highlighter
               highlightStyle={{
                  backgroundColor: "#ffc069",
                  padding: 0,
               }}
               searchWords={[searchText]}
               autoEscape
               textToHighlight={text ? text.toString() : ""}
            />
         ) : (
            text
         ),
   });

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
         ...getColumnSearchProps("name"),
      },
      {
         title: "Email",
         dataIndex: "email",
         key: "email",
         render: (text) => (
            <p style={{ fontWeight: "600", maxWidth: "400px" }}>{text}</p>
         ),
         ...getColumnSearchProps("email"),
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
         ...getColumnSearchProps("phone"),
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
         sortDirections: ["descend", "ascend"],
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
                  title = "Đã khóa";
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
            { text: "Đã khóa", value: true },
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

                  <div
                     style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "8px",
                     }}
                  ></div>
               </div>
            </div>
         </div>
      </Spin>
   );
};
