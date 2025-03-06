import apiClient from './apiClient';
import { AxiosError } from 'axios'; // Import AxiosError for better error handling

// Define the FormDetail interface
export interface FormDetail {
  check_result_item_id: string;
  end_customer: string;
  order_point: string;
  part_number: string;
  description: string;
  quantity: string;
  result_date: string;
  inventory_status: string;
}

// Fetch form details by form number
export const fetchFormDetails = async (formNumber: string): Promise<FormDetail[]> => {
  try {
    const response = await apiClient.get(`/api/form_details/${formNumber}`);
    if (response.status === 200) {
      return response.data.items; // Assuming `items` is the key in your API response
    } else {
      throw new Error('Failed to fetch form details.');
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'An unknown error occurred.');
    }
    throw new Error('An unexpected error occurred.');
  }
};
