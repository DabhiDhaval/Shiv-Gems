import axios from 'axios';

// Use relative URL so Vite proxy works in development,
// and set VITE_API_URL in production deployment
const baseURL = (import.meta as any).env?.VITE_API_URL || '/api';

const axiosInstance = axios.create({
  baseURL,
});

// Attach Authorization token to every request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 globally - clear stale tokens
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
