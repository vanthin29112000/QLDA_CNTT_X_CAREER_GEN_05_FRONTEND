import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { news } from "../../reduxToolkit/selector/newsSelector";
import { NewDetail } from "../../Component/newDetail/NewDetail";

import { GetViewNewByID } from "../../reduxToolkit/thunk/newsThunk";

export const NewsContent = () => {
   const { id } = useParams();
   const dispatch = useDispatch();
   const newsItem = useSelector(news);

   useEffect(() => {
      if (id !== "") {
         dispatch(GetViewNewByID(id));
      }

      console.log("id", id);
   }, [id]);

   return (
      <div class="container">
         <div style={{ width: "70%" }}>
            {console.log("new", newsItem)}
            {newsItem !== 0 && <NewDetail newItem={newsItem}></NewDetail>}
         </div>
      </div>
   );
};
