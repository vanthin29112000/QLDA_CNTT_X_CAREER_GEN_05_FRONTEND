import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const baseProvinces = "https://provinces.open-api.vn/api";
export const getCity = createAsyncThunk("address/getCity", () => {
   try {
      const res = axios.get(baseProvinces + "/p/");

      return res;
   } catch (error) {
      return error.response.data;
   }
});

export const getDistrict = createAsyncThunk("address/getDistrict", (idCity) => {
   try {
      const res = axios.get(baseProvinces + "/p/" + idCity + "/?depth=2");

      return res;
   } catch (error) {
      return error.response.data;
   }
});

export const getWard = createAsyncThunk("address/getWard", (idDistrict) => {
   try {
      const res = axios.get(baseProvinces + "/d/" + idDistrict + "/?depth=2");

      return res;
   } catch (error) {
      return error.response.data;
   }
});
