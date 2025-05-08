import Axios from "axios";

export const axios = Axios.create({
  baseURL: "https://spoo.me",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded"
  }
});
