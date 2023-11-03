import axios from "axios";

const BASE_URL = "https://api-fashionshop-aka.onrender.com/v1";

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.tokens.access.token;
const REFRESHTOKEN = currentUser?.tokens.refresh.token;

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: {'Authorization': `Bearer ${TOKEN}`}
  });

  export const refreshTokenRequest = axios.create({
    baseURL: BASE_URL,
    headers: {'Authorization': `Bearer ${REFRESHTOKEN}`}
  });