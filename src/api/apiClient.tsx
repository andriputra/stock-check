import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:5000'; // Replace with your backend URL
// Create an Axios instance with the global base URL
const apiClient = axios.create({
  baseURL: API_BASE_URL, // Your Flask backend base URL
  headers: {
    'Content-Type': 'application/json', // Ensure JSON content-type
  },
  withCredentials: true, // Include credentials for session-based authentication
});

// Interceptor for error handling (optional)
apiClient.interceptors.response.use(
  (response) => response, // Pass through successful responses
  (error) => {
    if (error.response) {
      // Handle specific error codes or messages
      return Promise.reject(error.response.data.message || error.message);
    }
    return Promise.reject('An unexpected error occurred');
  }
);

export default apiClient;
