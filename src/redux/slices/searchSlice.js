import { createSlice } from "@reduxjs/toolkit";
import { localStorageService } from "./../../services/localStorageService";
let initialState = {
  locationInfo: localStorageService.getLocationInfo(),
  dateInfo: localStorageService.getDateInfo(),
  option: localStorageService.getOptionInfo(),
};

const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {
    setSearchLocation: (state, { payload }) => {
      state.locationInfo = payload;
    },
    setSearchDateInfo: (state, { payload }) => {
      state.dateInfo = payload;
    },
    setSearchOption: (state, { payload }) => {
      state.option = payload;
    },
  },
});

export default searchSlice.reducer;
export const { setSearchLocation, setSearchDateInfo, setSearchOption } =
  searchSlice.actions;
