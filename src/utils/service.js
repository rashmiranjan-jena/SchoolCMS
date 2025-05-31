import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});


axiosInstance.interceptors.request.use(
  (config) => {
    
    const fullUrl = `${config.baseURL || ''}${config.url}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


axiosInstance.interceptors.response.use(
  (response) => {

    return response;
  },
  (error) => {
    
    console.error('Response Error:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;