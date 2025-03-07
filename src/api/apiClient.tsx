import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:5000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Include credentials for session-based authentication
});

// Interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response, // Pass through successful responses
  (error) => {
    if (error.response) {
      console.error("API Error Response:", error.response); // Log error untuk debugging
      return Promise.reject(error.response.data || { message: "Unknown error from server" });
    } else if (error.request) {
      console.error("API No Response Error:", error.request);
      return Promise.reject({ message: "No response from server. Please check your connection." });
    } else {
      console.error("API General Error:", error.message);
      return Promise.reject({ message: error.message || "An unexpected error occurred" });
    }
  }
);

export default apiClient;
