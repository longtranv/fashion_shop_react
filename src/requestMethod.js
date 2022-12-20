import axios from "axios";

const BASE_URL = "https://mernappapi.onrender.com/v1";
const TOKEN = "";

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: {token: `Bearer ${TOKEN}`}
})