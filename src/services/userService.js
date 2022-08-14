import axios from "axios";
import { BASE_URL, TOKEN_CYBERSOFT } from "./configURL";

export const userService = {
  postLogin: (dataLogin) => {
    return axios({
      method: "POST",
      url: `${BASE_URL}/api/auth/login`,
      data: dataLogin,
      headers: {
        tokenByClass: TOKEN_CYBERSOFT,
      },
    });
  },
  postRegister: (dataUser) => {
    return axios({
      method: "POST",
      url: `${BASE_URL}/api/auth/register`,
      data: dataUser,
      headers: {
        tokenByClass: TOKEN_CYBERSOFT,
      },
    });
  },
  postAvatar: (token, pic) => {
    return axios({
      method: "POST",
      url: `${BASE_URL}/api/users/upload-avatar`,
      data: pic,
      headers: {
        token: token,
        tokenByClass: TOKEN_CYBERSOFT,
      },
    });
  },
  getUserInfo: (userId) => {
    return axios({
      method: "GET",
      url: `${BASE_URL}/api/users/${userId}`,
      headers: {
        tokenByClass: TOKEN_CYBERSOFT,
      },
    });
  },
};
