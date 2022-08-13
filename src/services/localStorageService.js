let USER = "user_airbnbProject";
let USER_TOKEN = "user_token_airbnbProject";
let CHOICE_LOCATION = "choice_location_airbnbProject";
let CHOICE_DATE = "choice_date_airbnbProject";
let CHOICE_OPTION = "choice_option_airbnbProject";

export const localStorageService = {
  setUserInfo: (user) => {
    let dataJson = JSON.stringify(user);
    localStorage.setItem(USER, dataJson);
  },
  getUserInfo: () => {
    let dataJson = localStorage.getItem(USER);
    if (dataJson) {
      return JSON.parse(dataJson);
    }
    return null;
  },
  removeUserInfo: () => {
    localStorage.removeItem(USER);
  },
  setUserToken: (token) => {
    let dataJson = JSON.stringify(token);
    localStorage.setItem(USER_TOKEN, dataJson);
  },
  getUserToken: () => {
    let dataJson = localStorage.getItem(USER_TOKEN);
    if (dataJson) {
      return JSON.parse(dataJson);
    }
    return null;
  },
  removeUserToken: () => {
    localStorage.removeItem(USER_TOKEN);
  },
  setLocationInfo: (location) => {
    let dataJson = JSON.stringify(location);
    localStorage.setItem(CHOICE_LOCATION, dataJson);
  },
  getLocationInfo: () => {
    let dataJson = localStorage.getItem(CHOICE_LOCATION);
    if (dataJson) {
      return JSON.parse(dataJson);
    }
    return null;
  },
  setDateInfo: (date) => {
    let dataJson = JSON.stringify(date);
    localStorage.setItem(CHOICE_DATE, dataJson);
  },
  getDateInfo: () => {
    let dataJson = localStorage.getItem(CHOICE_DATE);
    if (dataJson) {
      return JSON.parse(dataJson);
    }
    return null;
  },
  setOptionInfo: (option) => {
    let dataJson = JSON.stringify(option);
    localStorage.setItem(CHOICE_OPTION, dataJson);
  },
  getOptionInfo: () => {
    let dataJson = localStorage.getItem(CHOICE_OPTION);
    if (dataJson) {
      return JSON.parse(dataJson);
    }
    return null;
  },
};
