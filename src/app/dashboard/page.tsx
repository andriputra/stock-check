'use client';

import { useAuth } from '../../components/AuthProvider';
import DashboardLayout from '../../components/layout/DashboardLayout';
import FormsTable from '../../components/dashboard/FormsTable';
import { useState, useEffect } from 'react';
import { checkResult } from '@/src/api/checkResult';

// Define the API response and form types as mentioned above
interface InventoryStatus {
  Bandung: string;
  Jakarta: string;
  Surabaya: string;
}

interface FormResponse {
  check_result_item_id: string;
  description: string;
  form_number: string;
  inventory_status: InventoryStatus;
  part_number: string;
  quantity: number;
  result_date: string | null;
  status: string;
  submit_date: string;
}

interface Form {
  formNumber: string;
  submitDate: string;
  resultDate: string;
}

export default function DashboardPage() {
  const { isLoggedIn, logout } = useAuth();
  const [forms, setForms] = useState<Form[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = (await checkResult()) || [];
        console.log('Fetched Data:', data); // Log the fetched data

        // Sort data by submit_date in descending order and get only the first 10
        const sortedData = data.sort((a: FormResponse, b: FormResponse) => {
          return new Date(b.submit_date).getTime() - new Date(a.submit_date).getTime();
        });

        const mappedForms: Form[] = sortedData.slice(0, 10).map((form: FormResponse) => ({
          formNumber: form.form_number,
          submitDate: form.submit_date,
          resultDate: form.result_date,
        }));

        setForms(mappedForms);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('An error occurred while fetching data.');
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-xl text-gray-700">Please log in to access this page.</p>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">Welcome to the Stock Checking Dashboard</h2>
        <button
          onClick={logout}
          className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
        >
          Logout
        </button>
      </div>

      {/* Form Stats Section */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Recent Forms</h3>

        {loading ? (
          <p>Loading forms...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <FormsTable forms={forms} />
        )}
      </div>
    </DashboardLayout>
  );
}
