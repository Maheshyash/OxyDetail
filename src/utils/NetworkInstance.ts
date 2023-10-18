import axios,{AxiosError, AxiosResponse} from "axios";
import { baseURL } from "../environments";

const commonConfig = {
    headers:{
        Accept:'application/json',
        'Content-Type':'application/json'
    }
}
export const oxyDetailInstance = axios.create({
    baseURL: baseURL, // Replace with your API's base URL
});
export const OxyDetailInstaceWithToken = axios.create({
    baseURL: baseURL, // Replace with your API's base URL
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
});
OxyDetailInstaceWithToken.interceptors.request.use(
    (config) => {
      // Retrieve the access token from localStorage
      const accessToken = localStorage.getItem('token');
  
      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
  
      return config;
    },
    (error) => {
      // Handle request errors
      return Promise.reject(error);
    }
  );