import { createSlice } from "@reduxjs/toolkit";
import { getCity, getDistrict, getWard } from "../thunk/addressThunk";
import { listDistrictItem } from "../selector/addressSelector";

const initialState = {
   district: {
      id: "",
      name: "",
   },
   ward: {
      id: "",
      name: "",
   },
   city: {
      id: "",
      name: "",
   },
   listDistrict: [],
   listWard: [],
   listCity: [],

   isLoading: false,
   status: "idle",
   notification: {
      type: "",
      isShow: false,
      message: "",
   },
};

const addressSlice = createSlice({
   name: "address",
   initialState,
   reducers: {
      handleEndNotification: (state) => {
         state.notification = {
            type: "",
            isShow: false,
            message: "",
         };
      },

      handleOnChangeValue: (state, action) => {
         state[action.payload.item] = {
            id: action.payload.id,
            name: action.payload.name,
         };

         switch (action.payload.item) {
            case "city": {
               state.district = {
                  id: 1,
                  name: "",
               };
               state.ward = {
                  id: "",
                  name: "",
               };

               state.listDistrict = [];
               state.listWard = [];
               break;
            }
            case "district": {
               state.ward = {
                  id: "",
                  name: "",
               };
               state.listWard = [];

               break;
            }
            default: {
               break;
            }
         }
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(getCity.pending, (state, action) => {
            state.isLoading = true;
            state.status = "pending";
         })
         .addCase(getCity.fulfilled, (state, action) => {
            state.isLoading = false;
            state.status = "idle";
            state.listCity = action.payload.data;
         })
         .addCase(getDistrict.pending, (state, action) => {
            state.isLoading = true;
            state.status = "pending";
         })
         .addCase(getDistrict.fulfilled, (state, action) => {
            state.isLoading = false;
            state.status = "idle";
            state.listDistrict = action.payload.data.districts;
         })
         .addCase(getWard.pending, (state, action) => {
            state.isLoading = true;
            state.status = "pending";
         })
         .addCase(getWard.fulfilled, (state, action) => {
            state.isLoading = false;
            state.status = "idle";
            state.listWard = action.payload.data.wards;
         });
   },
});

export const { handleEndNotification, handleOnChangeValue } =
   addressSlice.actions;
export default addressSlice.reducer;
