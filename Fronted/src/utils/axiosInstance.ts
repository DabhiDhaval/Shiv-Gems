import axios from 'axios';

// If VITE_API_URL exists → production
// If not → development (Vite proxy)
const API_URL = import.meta.env.VITE_API_URL;

const baseURL = API_URL
  ? `${API_URL}/api`
  : '/api';

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

// Attach Authorization token to every request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('shivgems_user');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;