import { FilterOutlined, SortAscendingOutlined } from "@ant-design/icons";
import {
   Button,
   ConfigProvider,
   DatePicker,
   Divider,
   Drawer,
   Input,
   Select,
} from "antd";
import React from "react";
import locale from "antd/es/locale/vi_VN";
import { useDispatch, useSelector } from "react-redux";
import {
   deleteFilter,
   handleFilter,
   handleSort,
} from "../../reduxToolkit/slice/newsSlice";
import { listFilter, sortItem } from "../../reduxToolkit/selector/newsSelector";

const { RangePicker } = DatePicker;

export const FilterNews = ({ openFilter, onCloseFilter, dataFilter }) => {
   const dispatch = useDispatch();
   const filter = useSelector(listFilter);
   const sort = useSelector(sortItem);

   const onChangeFilter = (value, name) => {
      //   console.log(value, name);

      dispatch(handleFilter({ value, name }));
   };

   const onChangeSort = (value) => {
      dispatch(handleSort(value));
   };

   return (
      <>
         <Drawer
            placement={"right"}
            width={350}
            onClose={onCloseFilter}
            open={openFilter}
            closable={false}
            footer={
               <div
                  style={{
                     display: "grid",
                     gridTemplateColumns: "49% 49%",
                     gridGap: "2%",
                  }}
               >
                  <Button
                     class="btn-add-news"
                     style={{ width: "100%", float: "bottom" }}
                     onClick={onCloseFilter}
                  >
                     Trở lại
                  </Button>
                  <Button
                     type="danger"
                     class="btn-add-news"
                     style={{ width: "100%", float: "bottom" }}
                     onClick={() => {
                        dispatch(deleteFilter());
                     }}
                  >
                     Xóa bộ lọc
                  </Button>
               </div>
            }
         >
            <Divider orientation="left">
               <div style={{ display: "flex", alignItems: "center" }}>
                  <FilterOutlined style={{ marginRight: "8px" }} /> Bộ lọc
               </div>
            </Divider>
            <div class="drawer__content">
               <div class="drawer__content-item">
                  <div class="drawer__content-item-title">Thể loại:</div>
                  <Select
                     mode="multiple"
                     placeholder="Vui lòng chọn thể loại"
                     onChange={(value) => {
                        onChangeFilter(value, "type");
                     }}
                     style={{ width: "100%" }}
                     options={dataFilter.type}
                     value={filter.type}
                  />
               </div>

               <div class="drawer__content-item">
                  <div class="drawer__content-item-title">Trạng thái:</div>
                  <Select
                     mode="multiple"
                     placeholder="Vui lòng chọn trạng thái"
                     onChange={(value) => {
                        onChangeFilter(value, "status");
                     }}
                     style={{ width: "100%" }}
                     options={dataFilter.status}
                     value={filter.status}
                  />
               </div>

               <div class="drawer__content-item">
                  <div class="drawer__content-item-title">Ngày đăng :</div>

                  <ConfigProvider locale={locale}>
                     <RangePicker
                        onChange={(value) => {
                           onChangeFilter(value, "dateSubmit");
                        }}
                        value={filter.dateSubmit}
                        style={{ width: "100%" }}
                     />
                  </ConfigProvider>
               </div>
            </div>

            <Divider orientation="left">
               <div style={{ display: "flex", alignItems: "center" }}>
                  <SortAscendingOutlined style={{ marginRight: "8px" }} /> Sắp
                  xếp
               </div>
            </Divider>
            <div class="drawer__content">
               <div class="drawer__content-item">
                  <div class="drawer__content-item-title">Ngày đăng :</div>
                  <Select
                     style={{
                        width: "100%",
                     }}
                     value={sort}
                     onChange={onChangeSort}
                     options={[
                        {
                           value: "latest",
                           label: "Ngày đăng mới nhất",
                        },
                        {
                           value: "oldest",
                           label: "Ngày đăng cũ nhất",
                        },
                     ]}
                  />
               </div>
            </div>
         </Drawer>
      </>
   );
};
