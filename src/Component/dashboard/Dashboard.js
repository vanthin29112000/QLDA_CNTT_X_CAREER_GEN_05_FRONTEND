import React, { useEffect, useState } from "react";
import {
   ArrowDownOutlined,
   ArrowUpOutlined,
   UserOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Col, Row, Statistic } from "antd";
import { Line } from "@ant-design/charts";
import CountUp from "react-countup";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../reduxToolkit/thunk/staffThunk";
import { listUser } from "../../reduxToolkit/selector/staffSelector";
import { getAllOrderForAdmin } from "../../reduxToolkit/thunk/ortherThunk";
import { listOrther } from "../../reduxToolkit/selector/ortherSelector";
import { formatDate, formatVND } from "../../service/formater";
import moment from "moment";
const formatter = (value) => <CountUp end={value} separator="," />;
export const Dashboard = () => {
   const dispatch = useDispatch();
   const users = useSelector(listUser);
   const listOrder = useSelector(listOrther);
   const [statistic, setStatistic] = useState({
      revenue: 0,
      countVoucher: 0,
      countUser: 0,
   });

   const [listChart, setListChart] = useState([]);

   useEffect(() => {
      dispatch(getAllUsers());
      dispatch(getAllOrderForAdmin());
   }, []);

   useEffect(() => {
      if (users && listOrder) {
         let totalRevenue = 0;
         let count = 0;
         let tempData = [];
         const date = new Date();
         for (let i = 0; i < 30; i++) {
            let time = date.setDate(date.getDate() - 1);
            tempData.push({
               date: formatDate(time),
               value: 0,
            });
         }

         listOrder.forEach((ele) => {
            totalRevenue += ele.totalMoney;
            ele.orderItems.forEach((item) => {
               count += item.qty;
            });

            //list chart
            let index = tempData.findIndex((tempItem) => {
               return (
                  tempItem.date.split("/").join("") ===
                  formatDate(ele.createdAt).split("/").join("")
               );
            });

            if (index > 0) {
               tempData[index].value += ele.totalMoney;
            }
         });
         setListChart(tempData);
         console.log("temp", tempData);
         setStatistic({
            revenue: totalRevenue,
            countVoucher: count,
            countUser: users.length,
         });
      }
   }, [users, listOrder]);

   const data = [
      //   { year: "1991", value: 3 },
      //   { year: "1992", value: 4 },
      //   { year: "1993", value: 3.5 },
      //   { year: "1994", value: 5 },
      //   { year: "1995", value: 4.9 },
      //   { year: "1996", value: 6 },
      //   { year: "1997", value: 7 },
      //   { year: "1998", value: 9 },
      //   { year: "1999", value: 13 },
   ];
   const config = {
      data: listChart,
      height: 400,
      xField: "date",
      yField: "value",
      point: {
         size: 5,
         shape: "diamond | circule",
      },
      tooltip: {
         formatter: (data) => {
            console.log("data", data);
            return {
               name: "Ngày " + data.date + " : ",
               value: data.value,
            };
         },
         customContent: (name, data) =>
            `<div>${data?.map((item) => {
               return `<div class="tooltip-chart" >
                  <span class="tooltip-item-name">${item?.name}</span>
                  <span class="tooltip-item-value">${formatVND(
                     item?.value
                  )}</span>
                </div>`;
            })}</div>`,
         showMarkers: "boolean",
         showContent: "boolean",
         position: "right | left",
         showCrosshairs: "boolean",
      },
   };
   return (
      <div>
         <div class="admin-title">
            <p style={{ margin: "0" }}>Thống kê</p>
         </div>

         <Row gutter={16}>
            <Col span={8}>
               <Card bordered={false}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                     <Avatar
                        size={64}
                        icon={<i class="fa-solid fa-coins"></i>}
                        style={{
                           marginRight: "16px",
                           backgroundColor: "#e7e7e7",
                        }}
                     />
                     <Statistic
                        title="Doanh thu"
                        value={statistic.revenue}
                        formatter={formatter}
                        suffix="VND"
                     />
                  </div>
               </Card>
            </Col>

            <Col span={8}>
               <Card bordered={false}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                     <Avatar
                        size={64}
                        icon={<i class="fa-solid fa-rug"></i>}
                        style={{
                           marginRight: "16px",
                           backgroundColor: "#e7e7e7",
                        }}
                     />
                     <Statistic
                        title="Số voucher đã bán"
                        value={statistic.countVoucher}
                        formatter={formatter}
                        suffix="Voucher"
                     />
                  </div>
               </Card>
            </Col>

            <Col span={8}>
               <Card bordered={false}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                     <Avatar
                        size={64}
                        icon={<i class="fa-solid fa-users"></i>}
                        style={{
                           marginRight: "16px",
                           backgroundColor: "#e7e7e7",
                        }}
                     />
                     <Statistic
                        title="Người đăng kí"
                        value={statistic.countUser}
                        formatter={formatter}
                        suffix="Thành viên"
                     />
                  </div>
               </Card>
            </Col>
         </Row>
         <div
            class="admin-item__content"
            style={{ padding: "32px", marginTop: "32px" }}
         >
            <h5 style={{ marginBottom: "32px " }}>
               Doanh thu 30 ngày gần nhất
            </h5>
            <Line {...config} />
         </div>
      </div>
   );
};
