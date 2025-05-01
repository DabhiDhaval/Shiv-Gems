import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Base URL from environment variables
});

// Add Authorization header for protected routes
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken'); // Replace with your token storage logic
  if (token) {
    if (!config.headers) {
      config.headers = {}; // Ensure headers object exists
    }
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;