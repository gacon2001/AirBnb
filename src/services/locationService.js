import axios from "axios";
import { BASE_URL, TOKEN_CYBERSOFT } from "./configURL";

/* const params = {
  access_key: ACCESS_POSITION_STACK,
  query: "1600 Pennsylvania Ave NW",
}; */

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
  getRoomList: (locationInfo) => {
    return axios({
      method: "GET",
      url: `${BASE_URL}/api/rooms?locationId=${locationInfo}`,
      headers: {
        tokenByClass: TOKEN_CYBERSOFT,
      },
    });
  },
  getLocationLongLat: (params) => {
    return axios.get(`http://api.positionstack.com/v1/forward`, { params });
  },
  getRoomDetail: (roomId) => {
    return axios({
      method: "GET",
      url: `${BASE_URL}/api/rooms/${roomId}`,
      headers: {
        tokenByClass: TOKEN_CYBERSOFT,
      },
    });
  },
  getRoomReview: (roomId) => {
    return axios({
      method: "GET",
      url: `${BASE_URL}/api/reviews/byRoom?roomId=${roomId}`,
      headers: {
        tokenByClass: TOKEN_CYBERSOFT,
      },
    });
  },
};
