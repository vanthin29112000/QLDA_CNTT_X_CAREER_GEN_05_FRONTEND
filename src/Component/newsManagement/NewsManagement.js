import {
   DeleteOutlined,
   EyeOutlined,
   FilterOutlined,
   PlusCircleOutlined,
   ToolOutlined,
} from "@ant-design/icons";
import {
   Button,
   Modal,
   Pagination,
   Popconfirm,
   Space,
   Spin,
   Table,
   Tag,
   Tooltip,
} from "antd";
import React, { useState } from "react";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
   deleteNew,
   getAllNews,
   GetNewByID,
} from "../../reduxToolkit/thunk/newsThunk";
import {
   isLoading,
   newsEditItem,
   newsRemainingSelector,
   notification,
} from "../../reduxToolkit/selector/newsSelector";
import { handleEndNotification } from "../../reduxToolkit/slice/newsSlice";
import { openNotificationWithIcon } from "../../Layout/notification/Notification";
import { FilterNews } from "../filterNews/FilterNews";
import { AddNews } from "../addNews/AddNews";
import { formatDate } from "../../service/formater";
import { NewDetail } from "../newDetail/NewDetail";
export const NewsManagement = () => {
   const dispatch = useDispatch();
   const notify = useSelector(notification);
   const news = useSelector(newsRemainingSelector);
   const loading = useSelector(isLoading);
   const newItem = useSelector(newsEditItem);

   const [openFilter, setOpenFilter] = useState(false);
   const [openAdd, setOpenAdd] = useState(false);
   const [openEdit, setOpenEdit] = useState(false);
   const [openReviewNew, setOpenReviewNew] = useState(false);

   //pagination
   const [page, setPage] = useState(1);

   //list news
   const [listNew, setListNew] = useState([]);

   useEffect(() => {
      onHandleListNew();
   }, [page, news]);

   useEffect(() => {
      dispatch(getAllNews());
   }, []);

   const countSize = 4;

   const onHandlePagination = (page) => {
      setPage(page);
   };

   const onHandleListNew = () => {
      if (news.length > 0) {
         const list = news.filter((ele, index) => {
            if (index >= (page - 1) * countSize && index < page * countSize) {
               return ele;
            }
         });

         setListNew(list);
      } else {
         setListNew([]);
      }
   };

   const onEditNew = (id) => {
      dispatch(GetNewByID(id));
      setOpenEdit(true);
   };

   const onPreviewNew = (id) => {
      dispatch(GetNewByID(id));
      setOpenReviewNew(true);
   };

   const columns = [
      {
         title: "Ảnh Thumbnail",
         dataIndex: "imgThumbnail",
         key: "imgThumbnail",
         render: (text) => (
            <img
               src={text}
               alt=".png"
               style={{ width: "100px", objectFit: "cover" }}
            ></img>
         ),
      },
      {
         title: "Tiêu đề",
         dataIndex: "title",
         key: "title",
         render: (text) => (
            <p style={{ fontWeight: "600", maxWidth: "400px" }}>{text}</p>
         ),
         width: "30%",
      },
      {
         title: "Ngày đăng",
         dataIndex: "dateSubmit",
         key: "dateSubmit",
         render: (dateSubmit) => {
            return formatDate(dateSubmit);
         },
      },

      {
         title: "Thể loại",
         dataIndex: "type",
         key: "type",
         render: (type) => {
            let title = "";
            switch (type) {
               case "technology": {
                  title = "Công nghệ";
                  break;
               }
               case "appliances": {
                  title = "Gia dụng";
                  break;
               }
               case "life": {
                  title = "Đời sống";
                  break;
               }
               case "entertainment": {
                  title = "Giải trí";
                  break;
               }
               default: {
                  break;
               }
            }
            return title.toUpperCase();
         },
      },
      {
         title: "Trạng thái",
         key: "status",
         dataIndex: "status",
         render: (status) => {
            let color = "";
            let title = "";
            switch (status) {
               case "highlights": {
                  color = "geekblue";
                  title = "Tin nổi bật";
                  break;
               }
               case "new": {
                  color = "green";
                  title = "Tin mới";
                  break;
               }
               case "delete": {
                  color = "volcano";
                  title = "Đã xóa";
                  break;
               }
               case "orther": {
                  color = "grey";
                  title = "Khác";
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
      },

      {
         title: "Action",
         key: "action",
         dataIndex: "status",
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
                  <Tooltip placement="bottom" title={"Xem trước"}>
                     <Button
                        type="link"
                        style={{
                           border: "none",
                           backgroundColor: "unset",
                           boxShadow: "none",
                           width: "fit-content",
                           padding: "0 4px",
                           // gap: "0px",
                        }}
                        onClick={() => {
                           onPreviewNew(record._id);
                        }}
                     >
                        <EyeOutlined />
                     </Button>
                  </Tooltip>
                  {status !== "delete" ? (
                     <>
                        <Tooltip placement="bottom" title={"Chỉnh sửa"}>
                           <Button
                              type="text"
                              style={{
                                 border: "none",
                                 backgroundColor: "unset",
                                 boxShadow: "none",
                                 padding: "0 4px",
                                 // gap: "0px",
                                 width: "fit-content",
                              }}
                              onClick={() => onEditNew(record._id)}
                           >
                              <ToolOutlined />
                           </Button>
                        </Tooltip>
                        <Popconfirm
                           placement="bottom"
                           title={"Bạn có muốn xóa bài viết này"}
                           onConfirm={() => {
                              dispatch(deleteNew(record._id));
                           }}
                           okText="Có "
                           cancelText="Không"
                        >
                           <Tooltip placement="bottom" title={"Xóa"}>
                              <Button
                                 type="text"
                                 danger
                                 style={{
                                    border: "none",
                                    backgroundColor: "unset",
                                    boxShadow: "none",
                                    width: "fit-content",
                                    // gap: "0px",
                                    padding: "0 4px",
                                 }}
                              >
                                 <DeleteOutlined />
                              </Button>
                           </Tooltip>
                        </Popconfirm>
                     </>
                  ) : (
                     ""
                  )}
               </Space>
            );
         },
      },
   ];

   const dataFilter = {
      type: [
         {
            value: "technology",
            label: "Công nghệ",
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
            value: "appliances",
            label: "Gia dụng",
         },
      ],
      status: [
         {
            value: "highlights",
            label: "Tin nổi bật",
         },
         {
            value: "new",
            label: "Tin mới",
         },
         {
            value: "delete",
            label: "Đã xóa",
         },

         {
            value: "orther",
            label: "Khác",
         },
      ],
   };

   // handle notifycation
   useEffect(() => {
      if (notify.isShow) {
         openNotificationWithIcon(notify.type, notify.message);
         dispatch(handleEndNotification());
      }
   }, [notify]);

   return (
      <Spin tip="Loading..." spinning={loading} style={{ fontSize: "1.2em" }}>
         <div>
            <div class="admin-title">
               <p style={{ margin: "0" }}>Quản lý tin tức</p>
            </div>
            <div class="admin-item__content">
               <div class="admin-item__filter">
                  <p style={{ fontWeight: "500", margin: "0" }}>
                     Danh sách tin tức
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
                           setOpenAdd(true);
                        }}
                     >
                        Thêm tin tức mới
                     </Button>
                     <Button
                        icon={<FilterOutlined />}
                        style={{ display: "flex", alignItems: "center" }}
                        onClick={() => {
                           setOpenFilter(true);
                        }}
                     >
                        Lọc & Sắp xếp
                     </Button>
                  </div>
               </div>

               <div class="admin-item__list-news">
                  <Table
                     columns={columns}
                     dataSource={listNew}
                     style={{ textAlign: "center" }}
                     pagination={{
                        position: ["none", "none"],
                     }}
                  />
                  <div
                     style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "8px",
                     }}
                  >
                     {news.length > 0 && (
                        <Pagination
                           total={news.length}
                           defaultCurrent={1}
                           pageSize={countSize}
                           onChange={onHandlePagination}
                        />
                     )}
                  </div>
               </div>
            </div>

            <AddNews
               onCloseAdd={() => {
                  setOpenAdd(false);
               }}
               openAdd={openAdd}
            ></AddNews>

            <AddNews
               onCloseAdd={() => {
                  setOpenEdit(false);
               }}
               openAdd={openEdit}
               isEdit={true}
               // newItem={newItemEdit}
            ></AddNews>

            <FilterNews
               onCloseFilter={() => {
                  setOpenFilter(false);
               }}
               openFilter={openFilter}
               dataFilter={dataFilter}
            ></FilterNews>

            <Modal
               title="Bài viết"
               open={openReviewNew}
               onOk={() => {
                  setOpenReviewNew(false);
               }}
               onCancel={() => {
                  setOpenReviewNew(false);
               }}
               width={"60%"}
               style={{ top: 0, height: "100%" }}
            >
               <NewDetail newItem={newItem}></NewDetail>
            </Modal>
         </div>
      </Spin>
   );
};
