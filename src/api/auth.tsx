// src/api/auth.ts
import apiClient from './apiClient';
import { AxiosError } from 'axios'; // Import AxiosError for better type handling

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await apiClient.post('/api/login', { username, password });
    return response.data;
  } catch (error) {
    // Specify the error type as AxiosError
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'An unknown error occurred.');
    }
    throw new Error('An unexpected error occurred.');
  }
};

export const logoutUser = async () => {
  try {
    const response = await apiClient.post('/logout');
    return response.data;
  } catch (error) {
    // Specify the error type as AxiosError
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'An unknown error occurred.');
    }
    throw new Error('An unexpected error occurred.');
  }
};

// Checking session on the frontend
export const checkSession = async () => {
  try {
    const response = await apiClient.get('/check-session');
    console.log(response.data.message);  // "Logged in as {username}"
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'No session.');
    }
    throw new Error('An unexpected error occurred.');
  }
};
