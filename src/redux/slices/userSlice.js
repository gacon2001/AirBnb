import { createSlice } from "@reduxjs/toolkit";
import { localStorageService } from "./../../services/localStorageService";

let initialState = {
  userInfo: localStorageService.getUserInfo(),
  userToken: localStorageService.getUserToken(),
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
  },
});

export default userSlice.reducer;
export const { setUserLogin, setUserToken } = userSlice.actions;
