import { createSelector } from "@reduxjs/toolkit";
import { formatTimeStamp } from "../../service/formater";
export const productDetail = (state) => state.products.productDetail;

export const products = (state) => state.products.products;
export const listFilter = (state) => state.products.filter;
export const sortItem = (state) => state.products.sort;

export const productRemainingSelector = createSelector(
   products,
   listFilter,
   sortItem,

   (listProduct, filters, sortProduct) => {
      // console.log(sortProduct);
      if (listProduct.length === 0) return [];
      let tempProducts = [...listProduct];

      switch (sortProduct) {
         case "prices-increase": {
            tempProducts = tempProducts.sort((a, b) => a.price - b.price);
            break;
         }
         case "prices-decrease": {
            tempProducts = tempProducts.sort((a, b) => -a.price + b.price);
            break;
         }
         case "latest": {
            tempProducts = tempProducts.sort(
               (a, b) => a.effectiveDate - b.effectiveDate
            );
            break;
         }
         default: {
            break;
         }
      }

      if (
         filters.brand.length === 0 &&
         filters.category.length === 0 &&
         filters.price[0] === 0 &&
         filters.price[1] === 0 &&
         filters.applyDate === ""
      ) {
         return tempProducts;
      }

      if (filters.brand.length !== 0) {
         tempProducts = tempProducts.filter((product) => {
            console.log("filter", product.brand.name);
            return filters.brand.includes(product.brand.name);
         });
         console.log(tempProducts);
      }

      if (filters.category.length !== 0) {
         tempProducts = tempProducts.filter((product) => {
            return filters.category.includes(product.category.toString());
         });
      }

      if (filters.price[0] !== 0 || filters.price[1] !== 0) {
         tempProducts = tempProducts.filter((product) => {
            return (
               filters.price[0] <= product.price &&
               filters.price[1] >= product.price
            );
         });
      }

      if (filters.applyDate !== null) {
         let temp = filters.applyDate;
         let tempStart = formatTimeStamp(temp[0]);
         let tempEnd = formatTimeStamp(temp[1]);

         tempProducts = tempProducts.filter((product) => {
            return (
               product.effectiveDate >= tempStart &&
               product.expirationDate <= tempEnd
            );
         });
      }

      return tempProducts;
   }
);