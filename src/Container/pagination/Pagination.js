import { FilterOutlined } from "@ant-design/icons";
import { Button, Drawer, Pagination, Select, Space } from "antd";
import React, { useState, useEffect } from "react";
import { FilterProduct } from "../../Component/filterProduct/FilterProduct";
import { Product } from "../../Component/product/Product";
import { useDispatch, useSelector } from "react-redux";
import "./pagination.css";
import { getAllProducts } from "../../reduxToolkit/thunk/productThunk";
import { productRemainingSelector } from "../../reduxToolkit/selector/productsSelector";
import { clearFilter, handleSort } from "../../reduxToolkit/slice/productSlice";

export const PaginationProduct = () => {
   const { Option } = Select;
   const [openFilter, setOpenFilter] = useState(false);
   const [currentPage, setCurrentPage] = useState(1);
   const dispatch = useDispatch();

   const listProduct = useSelector(productRemainingSelector);

   useEffect(() => {
      dispatch(getAllProducts());
   }, []);

   useEffect(() => {
      setCurrentPage(1);
      console.log("list", listProduct);
   }, [listProduct]);

   const onChangePage = (page) => {
      setCurrentPage(page);
   };

   const onHandleSort = (sort) => {
      // console.log(sort.value);
      dispatch(handleSort(sort.value));
   };

   const onClearFilter = () => {
      dispatch(clearFilter());
   };

   return (
      <div class="pagination-container row g-0">
         {/* <div class="col-md-0 col-lg-3 col-xl-3 pagination__filter-container"> */}
         <Drawer
            title={
               <>
                  <p class="pagination__filter-title">
                     <FilterOutlined style={{ margin: "0px 8px" }} /> Bộ lọc
                  </p>
                  {/* <p class="pagination__filter-reset">Xóa bộ lọc</p> */}
               </>
            }
            class="col-12 col-md-12 col-lg-3 col-xl-3"
            placement="left"
            closable={false}
            onClose={() => {
               setOpenFilter(false);
            }}
            open={openFilter}
            key="left"
            extra={
               <Space>
                  {/* <Button
                     onClick={() => {
                        setOpenFilter(false);
                     }}
                     style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "none",
                        boxShadow: "none",
                     }}
                  >
                     <CloseOutlined />
                  </Button> */}
                  <Button
                     type="primary"
                     danger
                     onClick={() => {
                        onClearFilter();
                        setOpenFilter(false);
                     }}
                  >
                     Xóa bộ lọc
                  </Button>
                  <Button
                     type="primary"
                     onClick={() => {
                        setOpenFilter(false);
                     }}
                  >
                     OK
                  </Button>
               </Space>
            }
         >
            <FilterProduct></FilterProduct>
         </Drawer>
         {/* </div> */}
         <div class="col-md-12 col-lg-12 col-xl-12 pagination__products-container">
            <div class="pagination__products-bg">
               <div class="pagination__products-sort-filter">
                  <p
                     class="pagination__filter-title filter-open"
                     onClick={() => {
                        setOpenFilter(true);
                     }}
                  >
                     <FilterOutlined style={{ margin: "0px 8px" }} /> Bộ lọc
                  </p>
                  <div class="pagination__sort">
                     <p>Sắp xếp : </p>
                     <div class="pagination__sort-item">
                        <Select
                           labelInValue
                           defaultValue={{
                              value: "most-view",
                              label: "Xem nhiều nhất",
                           }}
                           style={{ width: 150 }}
                           onChange={onHandleSort}
                        >
                           <Option value="prices-increase">Giá tăng dần</Option>
                           <Option value="prices-decrease">Giá giảm dần</Option>
                           <Option value="most-view">Xem nhiều nhất</Option>
                           <Option value="latest">Mới nhất</Option>
                        </Select>
                     </div>
                  </div>
               </div>

               <div class="pagination__list-product row g-12">
                  {listProduct.length > 0 &&
                     listProduct.map((item, index) =>
                        index < currentPage * 12 &&
                        index >= (currentPage - 1) * 12 ? (
                           <Product product={item} key={index}></Product>
                        ) : (
                           ""
                        )
                     )}
               </div>
               <div class="pagination__page">
                  <Pagination
                     current={currentPage}
                     onChange={onChangePage}
                     total={listProduct.length}
                     defaultPageSize={12}
                     showSizeChanger={false}
                  />
               </div>
            </div>
         </div>
      </div>
   );
};
