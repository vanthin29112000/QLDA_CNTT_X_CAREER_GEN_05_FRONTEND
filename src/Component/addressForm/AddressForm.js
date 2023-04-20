import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
   getCity,
   getDistrict,
   getWard,
} from "../../reduxToolkit/thunk/addressThunk";
import {
   cityInfo,
   districtInfo,
   listCityItem,
   listDistrictItem,
   listWardItem,
   wardInfo,
} from "../../reduxToolkit/selector/addressSelector";
import { handleOnChangeValue } from "../../reduxToolkit/slice/addressSlice";
import { Button, Form, Input, Select } from "antd";
import { updateInfoUser } from "../../reduxToolkit/thunk/userThunk";
export const AddressForm = ({ addressInfo, setIsShowChangeAddress }) => {
   const dispatch = useDispatch();
   const formAddress = React.useRef(null);

   // address variables
   const cities = useSelector(listCityItem);
   const city = useSelector(cityInfo);
   const districts = useSelector(listDistrictItem);
   const district = useSelector(districtInfo);
   const wards = useSelector(listWardItem);
   const ward = useSelector(wardInfo);

   useEffect(() => {
      if (
         addressInfo.mainAddress &&
         addressInfo.city.id &&
         addressInfo.district.id &&
         addressInfo.ward.id
      ) {
         dispatch(
            handleOnChangeValue({
               item: "city",
               id: addressInfo.city.id,
               name: addressInfo.city.name,
            })
         );
         dispatch(getDistrict(addressInfo.city.id));
         dispatch(
            handleOnChangeValue({
               item: "district",
               id: addressInfo.district.id,
               name: addressInfo.district.name,
            })
         );
         dispatch(getWard(addressInfo.district.id));
         dispatch(
            handleOnChangeValue({
               item: "ward",
               id: addressInfo.ward.id,
               name: addressInfo.ward.name,
            })
         );

         formAddress.current?.setFieldsValue({
            city: addressInfo.city.name,
            addressInfo: addressInfo.mainAddress,
         });
      }
   }, [addressInfo]);

   useEffect(() => {
      dispatch(getCity());
   }, []);

   useEffect(() => {
      if (city.id !== "" && city.name !== "") {
         dispatch(getDistrict(city.id));
         formAddress.current?.setFieldsValue({
            district: district.name,
            ward: ward.name,
         });
      }
   }, [city]);

   useEffect(() => {
      if (district.id !== "" && district.name !== "") {
         dispatch(getWard(district.id));
         formAddress.current?.setFieldsValue({
            ward: ward.name,
         });
      }
   }, [district]);

   const onChangeAddress = (key, value) => {
      let name = "";
      switch (key) {
         case "city": {
            let temp = cities.find((city) => city.code === value);
            name = temp.name;
            break;
         }
         case "district": {
            let temp = districts.find(
               (districtItem) => districtItem.code === value
            );
            name = temp.name;
            break;
         }
         case "ward": {
            let temp = wards.find((wardItem) => wardItem.code === value);
            name = temp.name;
            break;
         }
         default: {
            break;
         }
      }

      dispatch(handleOnChangeValue({ item: key, id: value, name }));
   };

   const onSubmitAddress = (e) => {
      dispatch(
         updateInfoUser({
            address: { city, district, ward, mainAddress: e.addressInfo },
         })
      );
      setIsShowChangeAddress(true);
   };

   return (
      <Form ref={formAddress} onFinish={onSubmitAddress}>
         <Form.Item
            name="city"
            label="Thành phố"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 19 }}
            rules={[
               {
                  required: true,
                  message: "Vui lòng tỉnh thành!",
               },
            ]}
            style={{ marginBottom: "8px" }}
         >
            <Select
               style={{ width: "100%" }}
               value={city.id}
               onChange={(value) => {
                  onChangeAddress("city", value);
               }}
               options={cities.map((cityItem) => ({
                  label: cityItem.name,
                  value: cityItem.code,
               }))}
            />
         </Form.Item>
         <Form.Item
            name="district"
            label="Quận/Huyện"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 19 }}
            rules={[
               {
                  required: true,
                  message: "Vui lòng chọn quận!",
               },
            ]}
            style={{ marginBottom: "8px" }}
         >
            <Select
               style={{ width: "100%" }}
               onChange={(value) => {
                  onChangeAddress("district", value);
               }}
               options={districts.map((districtItem) => ({
                  label: districtItem.name,
                  value: districtItem.code,
               }))}
            />
         </Form.Item>
         <Form.Item
            name="ward"
            label="Phường/Xã"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 19 }}
            rules={[
               {
                  required: true,
                  message: "Vui lòng chọn phường!",
               },
            ]}
            style={{ marginBottom: "8px" }}
         >
            <Select
               style={{ width: "100%" }}
               onChange={(value) => {
                  onChangeAddress("ward", value);
               }}
               options={wards.map((wardItem) => ({
                  label: wardItem.name,
                  value: wardItem.code,
               }))}
            />
         </Form.Item>
         <Form.Item
            name="addressInfo"
            label="Địa chỉ nhà"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 19 }}
            rules={[
               {
                  required: true,
                  message: "Vui lòng nhập địa chỉ nhà!",
               },
            ]}
            style={{ marginBottom: "8px" }}
         >
            <Input
               //    defaultValue={accountInfo.phone}
               placeholder="Nhập địa chỉ nhà (Bao gồm : số nhà, tên dường,...)"
               style={{ width: "100%" }}
            />
         </Form.Item>
         <div
            style={{
               width: "100%",
               display: "flex",
               justifyContent: "flex-end",
            }}
         >
            <Button
               style={{ marginRight: "8px" }}
               onClick={() => {
                  setIsShowChangeAddress(true);
               }}
            >
               Quay lại
            </Button>
            <Button type="primary" htmlType="submit">
               Cập nhật
            </Button>
         </div>
      </Form>
   );
};
