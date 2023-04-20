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

export const splitPageSlideShow = (arr, length) => {
   let i = -1;
   let listRender = [];
   let tempArr = [];
   for (let index = 0; index <= arr.length; index++) {
      if (i === length - 1 || index === arr.length) {
         listRender.push(tempArr);
         tempArr = [];
         i = 0;
      } else {
         i++;
      }
      tempArr.push(arr[index]);
   }

   return listRender;
};

export const formatAddress = (address) => {
   // console.log("address", address.mainAddress);
   if (address) {
      if (
         address.mainAddress &&
         address.city.id &&
         address.ward.id &&
         address.district.id
      ) {
         return `${address.mainAddress}, ${address.ward.name}, ${address.district.name}, ${address.city.name}`;
      } else {
         return "";
      }
   }
};
