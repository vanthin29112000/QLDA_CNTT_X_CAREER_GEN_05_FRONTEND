export const formatVND = (value) => {
   return value.toLocaleString("it-IT", { style: "currency", currency: "VND" });
};

export const formatDate = (date) => {
   let tempDate = new Date(date);

   let year = tempDate.getFullYear().toString();
   let month = (tempDate.getMonth() + 101).toString().substring(1);
   let day = (tempDate.getDate() + 100).toString().substring(1);
   // console.log("timer", day + "/" + month + "/" + year);
   return day + "/" + month + "/" + year;
};

export const formatDateAndTime = (date) => {
   let tempDate = new Date(date);
   let nowDate = new Date();

   let year = tempDate.getFullYear().toString();
   let month = (tempDate.getMonth() + 101).toString().substring(1);
   let day = (tempDate.getDate() + 100).toString().substring(1);
   let hours = (tempDate.getHours() + 100).toString().substring(1);
   let minutes = (tempDate.getMinutes() + 100).toString().substring(1);

   let yearNow = nowDate.getFullYear().toString();
   let monthNow = (nowDate.getMonth() + 101).toString().substring(1);
   let dayNow = (nowDate.getDate() + 100).toString().substring(1);

   if (year === yearNow && month === monthNow && day === dayNow) {
      return hours + ":" + minutes;
   } else {
      return hours + ":" + minutes + " " + day + " tháng " + month + "," + year;
   }
};

export const formatTimeStamp = (date) => {
   return Math.round(Date.parse(date) / 1000);
};
