"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import apiClient from '@/src/api/apiClient';
import DashboardLayout from '@/src/components/layout/DashboardLayout';

interface FormDetails {
  check_result_item_id: string;
  end_customer: string;
  part_number: string;
  description: string;
  order_point: string;
  quantity: number;
  inventory_status: string;
}

const FormDetailsPage = ({ params }: { params: { formNumber: string } }) => {
  const formNumber = params.formNumber;
  const router = useRouter();
  const [formDetails, setFormDetails] = useState<FormDetails[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (formNumber) {
        try {
          const res = await apiClient.get(`/api/check_result/${formNumber}`);
          console.log("Fetched Data:", res.data);
          setFormDetails(res.data); // <-- Menyimpan array langsung
        } catch (err) {
          console.error("Error fetching form details:", err);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [formNumber]);

  if (loading) return <div>Loading...</div>;
  if (!formDetails || formDetails.length === 0) return <div>Form not found.</div>;

  const renderInventoryStatus = (inventory_status: string) => {
    let parsedStatus;
    try {
      parsedStatus = JSON.parse(inventory_status); // Konversi string JSON ke objek
    } catch (error) {
      console.error("Error parsing inventory_status:", error);
      return <p className="text-red-500">Invalid inventory status format</p>;
    }

    return (
      <ul className="list-disc pl-5 text-gray-800">
        {Object.entries(parsedStatus).map(([location, status]) => (
          <li key={location} className="font-medium">
            <span className="font-semibold text-gray-900">{location}:</span> {status as string}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-100 px-8 py-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Form Details</h1>
        
        {formDetails.map((item) => (
          <div key={item.check_result_item_id} className="mb-6 p-4 bg-white shadow rounded">
            <p className="text-gray-700"><strong>Check Result Item ID:</strong> {item.check_result_item_id}</p>
            <p className="text-gray-700"><strong>End Customer:</strong> {item.end_customer}</p>
            <p className="text-gray-700"><strong>Part Number:</strong> {item.part_number}</p>
            <p className="text-gray-700"><strong>Description:</strong> {item.description}</p>
            <p className="text-gray-700"><strong>Order Point:</strong> {item.order_point}</p>
            <p className="text-gray-700"><strong>Quantity:</strong> {item.quantity}</p>
            <p className="text-gray-700"><strong>Inventory Status:</strong></p>
            {renderInventoryStatus(item.inventory_status)}
          </div>
        ))}

        <button 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => router.push('/dashboard')}
        >
          Back to Forms
        </button>
      </div>  
    </DashboardLayout>
  );
};

export default FormDetailsPage;
