import { async } from "@firebase/util";
import {
   getStorage,
   ref,
   uploadBytes,
   getDownloadURL,
   uploadBytesResumable,
} from "firebase/storage";

// export const uploadImgFirebase = (loader) => {
//    return {
//       upload: () => {
//          loader.file.then((file) => {
//             return new Promise((resolve, reject) => {
//                const storage = getStorage();
//                uploadBytes(ref(storage, `images/${file.name}`), file)
//                   .then((snapshot) => {
//                      return getDownloadURL(snapshot.ref);
//                   })
//                   .then((downloadURL) => {
//                      resolve({
//                         default: downloadURL,
//                      });
//                   })
//                   .catch((error) => {
//                      reject(error.message);
//                   });
//             });
//          });
//       },
//    };
// };

export const uploadFirebase = (file, folder) => {
   return new Promise((resolve, reject) => {
      const storage = getStorage();
      const storageRef = ref(storage, `${folder}/${file.name}`);
      const metadata = {
         contentType: "image/jpeg",
      };
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);

      uploadTask.on(
         "state_changed",
         (snapshot) => {
            const progress =
               (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
               case "paused":
                  console.log("Upload is paused");
                  break;
               case "running":
                  console.log("Upload is running");
                  break;
               default:
                  break;
            }
         },
         (error) => {
            reject(error);
         },
         () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
               resolve(downloadURL);
            });
         }
      );
   });
};
