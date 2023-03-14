import React, { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Modal, Spin, Tooltip } from "antd";
import "./UploadImages.css";
import { uploadFirebase } from "../../service/upload";
import { openNotificationWithIcon } from "../notification/Notification";

export const UploadImage = ({ nameFolder, title, onChange, value }) => {
   const [previewOpen, setPreviewOpen] = useState(false);
   const [previewTitle, setPreviewTitle] = useState(title);

   const [urlImg, setUrlImg] = useState(value);
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      if (value === "") {
         onChange("");
      }
      console.log("url", value);
   }, []);

   const onChangeImg = async (e) => {
      const files = e.target.files;
      try {
         setLoading(true);
         const link = await uploadFirebase(files[0], nameFolder);
         onChange(link);
      } catch (error) {
         openNotificationWithIcon("error", error.message);
      }
      setLoading(false);
   };

   // useEffect(() => {
   //    onChange(urlImg);
   // }, [urlImg]);
   //
   const handleCancel = () => {
      setPreviewOpen(false);
   };

   const openPreview = () => {
      setPreviewOpen(true);
   };

   return (
      <>
         <Spin
            tip="Loading..."
            spinning={loading}
            style={{ fontSize: "1.2em" }}
         >
            <div
               class="upload-img"
               style={{
                  width: "100%",
                  height: "200px",
                  borderRadius: "8px",
               }}
            >
               {value !== "" ? (
                  <div class="upload-success">
                     <img
                        src={value}
                        alt=".png"
                        style={{ borderRadius: "8px" }}
                     ></img>
                     <div class="btn-handle-img">
                        <div class="btn-handle__button">
                           {/* <Tooltip placement="bottom" title={"Xem hình ảnh"}>
                              <button
                                 style={{
                                    backgroundColor: "inherit",
                                    border: "none",
                                 }}
                                 onClick={() => setPreviewOpen(true)}
                              >
                                 
                              </button>
                           </Tooltip> */}
                           <Tooltip placement="bottom" title={"Xem hình ảnh"}>
                              <button
                                 style={{
                                    backgroundColor: "inherit",
                                    border: "none",
                                 }}
                              >
                                 <i
                                    class="fa-regular fa-eye"
                                    onClick={() => {
                                       openPreview();
                                    }}
                                 ></i>
                              </button>
                           </Tooltip>
                           <Tooltip placement="bottom" title={"Xóa hình ảnh"}>
                              <button
                                 style={{
                                    backgroundColor: "inherit",
                                    border: "none",
                                 }}
                              >
                                 <i
                                    class="fa-regular fa-trash-can"
                                    onClick={() => {
                                       onChange("");
                                    }}
                                 ></i>
                              </button>
                           </Tooltip>
                        </div>
                     </div>
                  </div>
               ) : (
                  loading !== true && (
                     <label htmlFor="edit-upload" class="edit_upload">
                        <div class="none-upload">
                           <UploadOutlined style={{ fontSize: "1.5em" }} />
                           <p style={{ margin: "0", marginTop: "8px" }}>
                              Upload hình ảnh
                           </p>

                           <input
                              type="file"
                              id="edit-upload"
                              onChange={onChangeImg}
                              style={{ display: "none" }}
                              accept=".jpg, .png"
                           ></input>
                        </div>
                     </label>
                  )
               )}
            </div>
            <Modal
               open={previewOpen}
               title={previewTitle}
               footer={null}
               onCancel={handleCancel}
            >
               <img
                  alt="example"
                  style={{
                     width: "100%",
                  }}
                  src={value}
               />
            </Modal>
         </Spin>
      </>
   );
};
