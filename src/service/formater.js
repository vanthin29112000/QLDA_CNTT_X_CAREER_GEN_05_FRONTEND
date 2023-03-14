export const formatVND = (value) => {
   return value.toLocaleString("it-IT", { style: "currency", currency: "VND" });
};

export const formatDate = (date) => {
   let tempDate = new Date(date);

   let year = tempDate.getFullYear().toString();
   let month = (tempDate.getMonth() + 101).toString().substring(1);
   let day = (tempDate.getDate() + 100).toString().substring(1);
   return day + "/" + month + "/" + year;
};

export const formatTimeStamp = (date) => {
   return Math.round(Date.parse(date) / 1000);
};
