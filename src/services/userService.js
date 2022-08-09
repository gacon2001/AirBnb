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
};
