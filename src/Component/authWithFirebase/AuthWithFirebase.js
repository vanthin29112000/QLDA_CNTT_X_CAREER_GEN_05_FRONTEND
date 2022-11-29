import { Button } from "antd";
import React from "react";
import {
   signInWithPopup,
   GoogleAuthProvider,
   FacebookAuthProvider,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { useDispatch } from "react-redux";
import { loginWithFirebase } from "../../reduxToolkit/thunk/userThunk";

export const AuthWithFirebase = () => {
   const dispatch = useDispatch();
   const handleLoginWithGoogle = () => {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
         .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);

            const token = credential.accessToken;
            const user = result.user;
            console.log(user);
            const tempUser = {
               email: user.email,
               phone: user.phoneNumber,
               avatar: user.photoURL,
               name: user.displayName,
               token: user.accessToken,
            };
            dispatch(loginWithFirebase(tempUser));
         })
         .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
         });
   };

   const handleLoginWithFacebook = () => {
      const provider = new FacebookAuthProvider();
      signInWithPopup(auth, provider)
         .then((result) => {
            const user = result.user;

            const credential =
               FacebookAuthProvider.credentialFromResult(result);
            const accessToken = credential.accessToken;
            // localStorage.setItem("firebaseToken", accessToken);

            console.log(user);
            const tempUser = {
               email: user.email,
               phone: user.phoneNumber,
               avatar: user.photoURL,
               name: user.displayName,
               token: user.accessToken,
            };
            dispatch(loginWithFirebase(tempUser));
         })
         .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = FacebookAuthProvider.credentialFromError(error);

            // ...
         });
   };

   return (
      <div class="auth__login-orther row g-1 ">
         <div class="col">
            <Button
               type="primary"
               icon={
                  <img
                     src="\images\google.png"
                     alt=".png"
                     style={{ padding: "0px 8px" }}
                  />
               }
               onClick={handleLoginWithGoogle}
               style={{
                  width: "100%",
                  backgroundColor: "white",
                  color: " black",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "500",
               }}
            >
               Google
            </Button>
         </div>
         <div class="col">
            <Button
               type="primary"
               icon={
                  <img
                     src="\images\facebook.png"
                     alt=".png"
                     style={{
                        padding: "0px 8px",
                        fontSize: "1em",
                     }}
                  />
               }
               onClick={handleLoginWithFacebook}
               style={{
                  width: "100%",
                  backgroundColor: "white",
                  color: " black",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "500",
               }}
            >
               Facebook
            </Button>
         </div>
      </div>
   );
};
