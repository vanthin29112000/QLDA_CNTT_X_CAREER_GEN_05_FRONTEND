import { Button, InputNumber } from "antd";
import React from "react";

export const HandleAmount = ({ max, value, setValue, disabled }) => {
   const handleQtyProduct = (key) => {
      switch (key) {
         case 0: {
            if (value > 1) {
               setValue(value - 1);
            }
            break;
         }

         case 1: {
            if (value < max) {
               setValue(value + 1);
            }
            break;
         }

         default: {
            break;
         }
      }
   };

   const onChangeValue = (e) => {
      const index = e;
      if (index < max) {
         setValue(index);
      } else {
         setValue(max);
      }

      if (index === 0) {
         setValue(1);
      }
   };

   return (
      <>
         {disabled ? (
            <div style={{ display: "flex", alignItem: "center" }}>
               <Button class="product-detail__right-amount-button" disabled>
                  {" "}
                  -{" "}
               </Button>
               <InputNumber
                  controls={false}
                  max={max}
                  value={value}
                  onChange={onChangeValue}
                  style={{
                     height: "32px",
                     width: "50px",
                     borderLeft: "none",
                     borderRight: "none",
                     textAlignLast: "center",
                     fontSize: "1.2em",
                  }}
                  disabled={disabled}
               />
               <Button class="product-detail__right-amount-button" disabled>
                  {" "}
                  +{" "}
               </Button>
            </div>
         ) : (
            <div style={{ display: "flex", alignItem: "center" }}>
               {value > 1 ? (
                  <Button
                     class="product-detail__right-amount-button"
                     onClick={() => {
                        handleQtyProduct(0);
                     }}
                  >
                     {" "}
                     -{" "}
                  </Button>
               ) : (
                  <Button class="product-detail__right-amount-button" disabled>
                     {" "}
                     -{" "}
                  </Button>
               )}

               <InputNumber
                  controls={false}
                  max={max}
                  value={value}
                  onChange={onChangeValue}
                  style={{
                     height: "32px",
                     width: "50px",
                     borderLeft: "none",
                     borderRight: "none",
                     textAlignLast: "center",
                     fontSize: "1.2em",
                  }}
                  disabled={disabled}
               />
               {value < max ? (
                  <Button
                     class="product-detail__right-amount-button"
                     onClick={() => {
                        handleQtyProduct(1);
                     }}
                  >
                     {" "}
                     +{" "}
                  </Button>
               ) : (
                  <Button class="product-detail__right-amount-button" disabled>
                     {" "}
                     +{" "}
                  </Button>
               )}
            </div>
         )}
      </>
   );
};
