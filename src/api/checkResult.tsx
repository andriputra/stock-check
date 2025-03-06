import apiClient from './apiClient';
import { AxiosError } from 'axios'; // Import AxiosError for better type handling

// Create a new form by posting items to the backend
export const checkResult = async () => {
  try {
    const response = await apiClient.get('/api/check_result');
    
    if (response.status === 200) {
        return response.data;
    } else {
        throw new Error('Failed to check result.');
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'An unknown error occurred.');
    }
    throw new Error('An unexpected error occurred.');
  }
};
