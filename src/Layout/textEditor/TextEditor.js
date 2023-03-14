import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export const TextEditor = ({ onChange, value }) => {
   // const [contentNews, setContentNews] = useState("");

   const formats = [
      "header",
      "bold",
      "italic",
      "underline",
      "strike",
      "blockquote",
      "list",
      "bullet",
      "indent",
      "link",
      "image",
      "video",
   ];

   const onHandleContent = (e) => {
      onChange(e);
   };

   return (
      <>
         <ReactQuill
            theme="snow"
            value={value}
            onChange={onHandleContent}
            formats={formats}
            modules={{
               toolbar: [
                  [{ header: [1, 2, false] }],
                  ["bold", "italic", "underline", "strike", "blockquote"],
                  [
                     { list: "ordered" },
                     { list: "bullet" },
                     { indent: "-1" },
                     { indent: "+1" },
                  ],
                  ["link", "image", "video"],
                  ["clean"],
               ],
            }}
         />
      </>
   );
};
