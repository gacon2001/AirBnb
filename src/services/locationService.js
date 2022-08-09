import axios from "axios";
import { BASE_URL, TOKEN_CYBERSOFT } from "./configURL";

export const locationService = {
  getLocation: (dataLocation) => {
    return axios({
      method: "GET",
      url: `${BASE_URL}/api/locations?limit=5&location=${dataLocation}`,
      headers: {
        tokenByClass: TOKEN_CYBERSOFT,
      },
    });
  },
};
