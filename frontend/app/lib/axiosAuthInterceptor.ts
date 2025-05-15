// Import Axios for HTTP requests
import axios from 'axios';

// Define the base API URL using environment variable
const API_URL = import.meta.env.VITE_API_URL + 'Auth';

// Create a reusable axios instance with predefined base URL
const axiosInstance = axios.create({
    baseURL: API_URL,
});

// Add a request interceptor to attach JWT token to outgoing requests
axiosInstance.interceptors.request.use(
    (config) => {
        // Retrieve token from localStorage
        const token = localStorage.getItem('token');
        // If token exists, set Authorization header
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // Forward request error
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
    (response) => response, // Simply return the response if successful
    async (error) => {
        // If response status is 401 Unauthorized, clear token and redirect to login page
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        // Forward any other errors
        return Promise.reject(error);
    }
);

// Export the configured axios instance for use across the app
export default axiosInstance;
