import axios from "axios";

const baseURLSever = " http://localhost:3000/";

const baseURL = baseURLSever;

const axiosConfig = axios.create({
   baseURL: baseURL,
});

export const callAPI = (url, method = "GET", body, token = "") => {
   return axiosConfig({
      url: url,
      method: method,
      data: body,
      headers: {
         Authorization: "Bearer " + token,
      },
   });
};

export const isError = (data) => {
   // console.log("data", data);
   if ((data.statusCode !== 200 && data.statusCode) || data.status !== 200) {
      // console.log("return true");
      return true;
   } else {
      return false;
   }
};
