import { createSlice } from "@reduxjs/toolkit";
import avatarPic from "../../assets/user/default-avatar-bpthumb.png";
import { localStorageService } from "./../../services/localStorageService";

let initialState = {
  userInfo: localStorageService.getUserInfo(),
  userToken: localStorageService.getUserToken(),
  userAvatar: avatarPic,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUserLogin: (state, { payload }) => {
      state.userInfo = payload;
    },
    setUserToken: (state, { payload }) => {
      state.userToken = payload;
    },
    setUserAvatar: (state, { payload }) => {
      state.userAvatar = payload;
    },
  },
});

export default userSlice.reducer;
export const { setUserLogin, setUserToken, setUserAvatar } = userSlice.actions;
