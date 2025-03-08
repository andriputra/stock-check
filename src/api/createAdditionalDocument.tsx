import apiClient from "./apiClient";
import { AxiosError } from 'axios';

interface Item {
  part_number: string;
  description: string;
  vin_number: string;
  engine_number: string;
  unit_type: string;
  quantity: number;
}

export const createAdditionalDocument = async (data: { items: Item[] }) => {
  try {
    const response = await apiClient.post('/api/additional_documents',data, { withCredentials: true});
    console.log("API Response:", response.data); 
    
        // Check if the response status is either 200 or 201 (success)
        if (response.status === 200 || response.status === 201) {
          return response.data;
        } else {
          throw new Error('Failed to create the form.');
        }
      } catch (error) {
        console.error("Error fetching check results:", error);
        if (error instanceof AxiosError) {
          // Extract error message from AxiosError and pass it to the front-end
          throw new Error(error.response?.data?.message || 'An unknown error occurred.');
        }
        // Handle other unexpected errors
        throw new Error('An unexpected error occurred.');
      }
    };
