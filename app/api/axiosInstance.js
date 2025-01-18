import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'https://curiousflip.com/suitecrm', // Base URL for your API
  timeout: 10000, // Optional: Timeout for requests in milliseconds
  headers: {
    'Content-Type': 'multipart/form-data',
    'Cookie': 'sugar_user_theme=SuiteP; PHPSESSID=8bb3bbaccf7c96c29bf77f761370cfd9',
  },
});

// Optional: Add interceptors for global error or request handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Axios Error:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;