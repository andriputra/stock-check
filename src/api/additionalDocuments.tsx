import apiClient from './apiClient';
import { AxiosError } from 'axios';

export const fetchAdditionalDocuments = async () => {
  try {
    const response = await apiClient.get('/api/additional_documents_result');

    console.log("API Response:", response.data); 

    if (response.status === 200 && Array.isArray(response.data)) {
      return response.data;
    } else {  
        throw new Error('Failed to check result.');
    }
  } catch (error) {
    console.error("Error fetching check results:", error);
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || `Server error: ${ error.response?.status}`);
    }
    throw new Error('An unexpected error occurred.');
  }
};
