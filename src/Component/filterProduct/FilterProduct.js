import React from "react";
import {
   Checkbox,
   Col,
   Collapse,
   ConfigProvider,
   DatePicker,
   Row,
   Slider,
} from "antd";
import locale from "antd/es/locale/vi_VN";
import { formatVND } from "../../service/formater";
import { useSelector, useDispatch } from "react-redux";
import "./filterProduct.css";
import { listFilter } from "../../reduxToolkit/selector/productsSelector";
import { brands, category } from "../../fakeData";
import { handleFilter } from "../../reduxToolkit/slice/productSlice";
export const FilterProduct = () => {
   const { Panel } = Collapse;
   const { RangePicker } = DatePicker;
   // const [rangerPrice, setRangerPrice] = useState([0, 2000000]);
   const filter = useSelector(listFilter);

   const dispatch = useDispatch();

   const CheckboxGroup = Checkbox.Group;
   const formatter = (value) => formatVND(value);

   const onChangeFilter = (value, name) => {
      // console.log(value, name);

      dispatch(handleFilter({ value, name }));
   };

   return (
      <>
         <div class="pagination__filter-bg">
            {/* <div class="pagination__filter-title-bg">
               
            </div> */}
            <div class="pagination__filter-item">
               <Collapse bordered={false} defaultActiveKey={["1"]}>
                  <Panel
                     header="Thương hiệu"
                     key="1"
                     style={{
                        border: "none",
                        backgroundColor: "white",
                        fontSize: "1.1em",
                        fontWeight: "600",
                        alignItems: "center",
                     }}
                  >
                     <div class="panel-item">
                        <CheckboxGroup
                           onChange={(value) => onChangeFilter(value, "brand")}
                           value={filter.brand}
                        >
                           <Row>
                              {brands.length > 0 &&
                                 brands.map((item) => (
                                    <Col span={12}>
                                       <Checkbox
                                          style={{
                                             margin: "2px 0px",
                                          }}
                                          value={item.name}
                                       >
                                          <img
                                             src={item.img}
                                             class="panel-item__img"
                                             alt="logo_brand.png"
                                          ></img>
                                       </Checkbox>
                                    </Col>
                                 ))}
                           </Row>
                        </CheckboxGroup>
                     </div>
                  </Panel>
               </Collapse>
            </div>
            <div class="pagination__filter-item">
               <Collapse bordered={false} defaultActiveKey={["1"]}>
                  <Panel
                     header="Ngành hàng"
                     key="1"
                     style={{
                        border: "none",
                        backgroundColor: "white",
                        fontSize: "1.1em",
                        fontWeight: "600",
                        alignItems: "center",
                     }}
                  >
                     <div class="panel-item">
                        <CheckboxGroup
                           onChange={(value) =>
                              onChangeFilter(value, "category")
                           }
                           value={filter.category}
                        >
                           <Row>
                              {category.length > 0 &&
                                 category.map((ele) => (
                                    <Col span={12}>
                                       <Checkbox
                                          style={{
                                             fontSize: "1em",
                                             fontWeight: "400",
                                             margin: "2px 0px",
                                          }}
                                          value={ele}
                                       >
                                          {ele}
                                       </Checkbox>
                                    </Col>
                                 ))}
                           </Row>
                        </CheckboxGroup>
                     </div>
                  </Panel>
               </Collapse>
            </div>
            <div class="pagination__filter-item">
               <Collapse bordered={false} defaultActiveKey={["1"]}>
                  <Panel
                     header="Thời hạn sử dụng"
                     key="1"
                     style={{
                        border: "none",
                        backgroundColor: "white",
                        fontSize: "1.1em",
                        fontWeight: "600",
                        alignItems: "center",
                     }}
                  >
                     <ConfigProvider locale={locale}>
                        <RangePicker
                           onChange={(value) => {
                              onChangeFilter(value, "applyDate");
                           }}
                           value={filter.applyDate}
                        />
                     </ConfigProvider>
                  </Panel>
               </Collapse>
            </div>
            <div class="pagination__filter-item">
               <Collapse bordered={false} defaultActiveKey={["1"]}>
                  <Panel
                     header="Khoảng giá"
                     key="1"
                     style={{
                        border: "none",
                        backgroundColor: "white",
                        fontSize: "1.1em",
                        fontWeight: "600",
                        alignItems: "center",
                     }}
                  >
                     <Slider
                        range
                        step={10000}
                        min={0}
                        max={200000}
                        defaultValue={[0, 0]}
                        tooltip={{ formatter }}
                        onChange={(value) => {
                           onChangeFilter(value, "price");
                        }}
                        value={filter.price}
                        //    value={
                        //       typeof inputValue === "number" ? inputValue : 0
                        //    }
                     />
                     <div class="panel-item__ranger-price">
                        <p>{formatVND(filter.price[0])}</p>
                        <p>{formatVND(filter.price[1])}</p>
                        {/* <p>{filter.price[0]}</p> */}
                     </div>
                  </Panel>
               </Collapse>
            </div>
         </div>
      </>
   );
};
