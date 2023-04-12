import React, { useEffect } from "react";
import "./Homepage.css";
import { SliderHomePage } from "../../Component/sliderHomePage/SliderHomePage";
import { FeaturedProduct } from "./FeaturedProduct";
export const Homepage = () => {
   return (
      <div>
         <SliderHomePage></SliderHomePage>

         <div class="container">
            <FeaturedProduct></FeaturedProduct>
         </div>
      </div>
   );
};
