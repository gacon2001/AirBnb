import { createSlice } from "@reduxjs/toolkit";
import { localStorageService } from "./../../services/localStorageService";

let initialState = {
  userInfo: localStorageService.getUserInfo(),
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUserLogin: (state, { payload }) => {
      state.userInfo = payload;
    },
  },
});

export default userSlice.reducer;
export const { setUserLogin } = userSlice.actions;
