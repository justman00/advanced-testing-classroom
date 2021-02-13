import axios from "axios";

export const fetchMissions = () => {
  return axios
    .get("https://api.spacexdata.com/v3/missions")
    .then(res => {
      console.log(res);
      return res;
    })
};
