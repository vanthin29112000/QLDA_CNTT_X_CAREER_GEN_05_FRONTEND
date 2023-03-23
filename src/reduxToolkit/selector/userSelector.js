export const isLogin = (state) => state.user.isLogin;
export const notification = (state) => state.user.notification;

export const loading = (state) => {
   return state.user.isLoading || state.products.isLoading;
};

export const userInfo = (state) => {
   console.log("user", state.user.infoUser);
   return state.user.infoUser;
};
