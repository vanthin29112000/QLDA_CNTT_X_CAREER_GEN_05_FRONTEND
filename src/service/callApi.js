import axios from "axios";

// const baseURLSever = " http://localhost:3003/";

// const baseURL = baseURLSever;
const baseURL = process.env.REACT_APP_URL_API;

const axiosConfig = axios.create({
   baseURL: baseURL,
});

export const callAPI = (url, method = "GET", body, token = "") => {
   return axiosConfig({
      url: url,
      method: method,
      data: body,
      // withCredentials: false,
      headers: {
         Authorization: "Bearer " + token,
      },
   });
};

export const isError = (data) => {
   // console.log("data", data);
   if (
      (data.statusCode !== 200 && data.statusCode) ||
      (data.status !== 200 && data.status !== 201)
   ) {
      // console.log("return true");
      return true;
   } else {
      return false;
   }
};
