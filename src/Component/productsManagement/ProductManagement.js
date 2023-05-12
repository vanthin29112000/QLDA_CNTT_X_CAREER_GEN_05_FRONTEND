import {
   Button,
   Checkbox,
   Input,
   Modal,
   Popconfirm,
   Space,
   Spin,
   Table,
   Tag,
   Tooltip,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
   isLoading,
   notification,
   products,
} from "../../reduxToolkit/selector/productsSelector";
import {
   DeleteOutlined,
   FilterOutlined,
   PlusCircleOutlined,
   SearchOutlined,
   SettingOutlined,
} from "@ant-design/icons";
import {
   getAllProducts,
   getProductByID,
   getProductForAdminByID,
   updateSliderProduct,
   updateSpecialProduct,
} from "../../reduxToolkit/thunk/productThunk";
import { formatDate, formatVND } from "../../service/formater";
import Highlighter from "react-highlight-words";
import { HandleProduct } from "../handleProduct/HandleProduct";
import { openNotificationWithIcon } from "../../Layout/notification/Notification";
import { handleEndNotification } from "../../reduxToolkit/slice/productSlice";

export const ProductManagement = () => {
   const loading = useSelector(isLoading);
   const dispatch = useDispatch();
   const listProducts = useSelector(products);

   const [searchText, setSearchText] = useState("");
   const [searchedColumn, setSearchedColumn] = useState("");
   const searchInput = useRef(null);
   const [isShowDrawer, setIsShowDrawer] = useState(false);
   const [isShowDrawerEdit, setIsShowDrawerEdit] = useState(false);

   const notify = useSelector(notification);

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
      dispatch(getAllProducts());
   }, []);

   useEffect(() => {
      if (notify.isShow) {
         openNotificationWithIcon(notify.type, notify.message);
         dispatch(handleEndNotification());
      }
   }, [notify]);

   const columns = [
      {
         title: "Mã sản phẩm",
         dataIndex: "_id",
         key: "id",
         render: (text) => (
            <p style={{ fontWeight: "600", maxWidth: "400px", margin: 0 }}>
               #{text}
            </p>
         ),
         ...getColumnSearchProps("_id"),
      },
      {
         title: "Hình ảnh",
         dataIndex: "images",
         key: "images",
         render: (text) => (
            <img
               src={text[0]}
               alt=".png"
               style={{ width: "64px", objectFit: "cover" }}
            ></img>
         ),
         width: "72px",
      },
      {
         title: "Tên sản phẩm",
         dataIndex: "name",
         key: "name",
         render: (text) => (
            <p style={{ fontWeight: "600", maxWidth: "400px", margin: 0 }}>
               {text}
            </p>
         ),
         ...getColumnSearchProps("name"),
      },
      {
         title: "Giá",
         dataIndex: "price",
         key: "price",
         render: (text) => {
            return (
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
            );
         },
         sorter: (a, b) => a.price - b.price,
      },

      {
         title: "Số lượng tồn",
         dataIndex: "",
         key: "inventory",
         render: (text, record) => (
            <p style={{ fontWeight: "600", maxWidth: "400px", margin: 0 }}>
               {record.countInStock - record.countSold}
            </p>
         ),
         sorter: (a, b) => {
            let c = a.countInStock - a.countSold;
            let d = b.countInStock - b.countSold;
            return c - d;
         },
      },

      {
         title: "Số lượng bán",
         dataIndex: "countSold",
         key: "countSold",
         render: (text) => (
            <p style={{ fontWeight: "600", maxWidth: "400px", margin: 0 }}>
               {text}
            </p>
         ),
         sorter: (a, b) => a.countSold - b.countSold,
      },
      {
         title: "Trạng thái",
         dataIndex: "",
         key: "status",

         render: (text, record) => {
            let color = "";
            let title = "";
            //Deleted
            if (record.deleteInfo.isDelete) {
               color = "volcano";
               title = "Đã xóa";
            } else {
               // Sold out
               if (record.countSold === record.countInStock) {
                  color = "green";
                  title = "Đã bán hết";
               } else {
                  if (record.expirationDate < new Date()) {
                     color = "grey";
                     title = "Hết hạn";
                  } else {
                     // on Sale
                     color = "yellow";
                     title = "Đang bán";
                  }
               }
            }

            return (
               <Tag color={color} key={title}>
                  {title.toUpperCase()}
               </Tag>
            );
         },
         filters: [
            { text: "Đang bán", value: "onSale" },
            { text: "Bán hết", value: "soldOut" },
            { text: "Đã xóa", value: "deleted" },
            { text: "Hết hạn", value: "expired" },
         ],
         onFilter: (value, record) => {
            let title = "";
            if (record.deleteInfo.isDelete) {
               title = "deleted";
            } else {
               // Sold out
               if (record.countSold === record.countInStock) {
                  title = "soldOut";
               } else {
                  if (record.expirationDate < new Date()) {
                     title = "expired";
                  } else {
                     title = "onSale";
                  }
               }
            }
            return title === value;
         },
      },

      {
         title: "SP nổi bật",
         dataIndex: "isSpecial",
         key: "isSpecial",
         render: (text, record) =>
            record.deleteInfo.isDelete ? (
               <Checkbox
                  disabled
                  checked={text}
                  // onChange={onChange}
               ></Checkbox>
            ) : (
               <Checkbox
                  checked={text}
                  onClick={() => {
                     dispatch(updateSpecialProduct({ id: record._id }));
                  }}
                  // onChange={onChange}
               ></Checkbox>
            ),
         // sorter: (a, b) => a.countSold - b.countSold,
         width: "24px",
         filters: [
            { text: "Đã chọn", value: true },
            { text: "Chưa chọn", value: false },
         ],
         onFilter: (value, record) => {
            return record.isSpecial === value;
         },
      },
      {
         title: "SP đặc biệt",
         dataIndex: "isShowSlider",
         key: "isShowSlider",
         render: (text, record) =>
            record.deleteInfo.isDelete ? (
               <Checkbox
                  disabled
                  checked={text}
                  // onChange={onChange}
               ></Checkbox>
            ) : (
               <Checkbox
                  checked={text}
                  onClick={() => {
                     dispatch(updateSliderProduct({ id: record._id }));
                  }}
                  // onChange={onChange}
               ></Checkbox>
            ),

         // sorter: (a, b) => a.countSold - b.countSold,
         width: "24px",
         filters: [
            { text: "Đã chọn", value: true },
            { text: "Chưa chọn", value: false },
         ],
         onFilter: (value, record) => {
            return record.isShowSlider === value;
         },
      },
      {
         title: "",
         dataIndex: "",
         key: "action",
         render: (text, record) => (
            <>
               <Button
                  type="link"
                  onClick={() => {
                     setIsShowDrawerEdit(true);
                     dispatch(getProductForAdminByID(record._id));
                  }}
                  // style={{ fontWeight: "600", maxWidth: "400px", margin: 0 }}
               >
                  <SettingOutlined />
               </Button>
            </>
         ),
         width: "32px",
      },
   ];

   return (
      // <Spin tip="Loading..." spinning={loading} style={{ fontSize: "1.2em" }}>
      <>
         <div>
            <div class="admin-title">
               <p style={{ margin: "0" }}>Quản lý sản phẩm</p>
            </div>
            <div class="admin-item__content">
               <div class="admin-item__filter">
                  <p style={{ fontWeight: "500", margin: "0" }}>
                     Danh sách sản phẩm
                  </p>
                  <div class="ai__filter-item">
                     <Button
                        type="primary"
                        style={{
                           marginRight: "8px",
                           display: "flex",
                           alignItems: "center",
                        }}
                        icon={<PlusCircleOutlined />}
                        onClick={() => {
                           setIsShowDrawer(true);
                        }}
                     >
                        Thêm tin sản phẩm mới
                     </Button>
                  </div>
               </div>

               <div class="admin-item__list-news">
                  <Table
                     columns={columns}
                     dataSource={listProducts}
                     column={{ align: "center" }}
                     // expandable={{
                     //    expandedRowRender,
                     //    defaultExpandedRowKeys: ["0"],
                     // }}
                     bordered
                     pagination={{ position: ["bottomCenter "], pageSize: 4 }}
                     style={{ textAlign: "center" }}
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
         <HandleProduct
            isShow={isShowDrawer}
            setIsShow={setIsShowDrawer}
         ></HandleProduct>
         <HandleProduct
            isShow={isShowDrawerEdit}
            setIsShow={setIsShowDrawerEdit}
            isEdit={true}
         ></HandleProduct>
      </>
      // </Spin>
   );
};
