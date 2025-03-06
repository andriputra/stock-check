'use client';

import { fetchFormDetails, FormDetail } from '@/src/api/formDetails';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const FormDetailsPage = () => {
  const router = useRouter();
  const { formNumber } = router.query;

  const [details, setDetails] = useState<FormDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!formNumber) return;

    const loadFormDetails = async () => {
      try {
        const data = await fetchFormDetails(formNumber as string);
        setDetails(data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('An error occurred while fetching data.');
      } finally {
        setLoading(false);
      }
    };

    loadFormDetails();
  }, [formNumber]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold text-gray-700">Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold text-red-500">{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Form Details for <span className="text-blue-500">{formNumber}</span>
        </h1>
        <div className="grid grid-cols-1 gap-6">
          {details.map((item) => (
            <div
              key={item.check_result_item_id}
              className="p-6 bg-gray-100 rounded-lg shadow-sm border border-gray-200"
            >
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Item ID: {item.check_result_item_id}
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">End Customer</p>
                  <p className="text-lg text-gray-800">{item.end_customer}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Order Point</p>
                  <p className="text-lg text-gray-800">{item.order_point}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Part Number</p>
                  <p className="text-lg text-gray-800">{item.part_number}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Description</p>
                  <p className="text-lg text-gray-800">{item.description}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Quantity</p>
                  <p className="text-lg text-gray-800">{item.quantity}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Result Date</p>
                  <p className="text-lg text-gray-800">{item.result_date}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-medium text-gray-500">Inventory Status</p>
                  <p
                    className={`text-lg font-bold ${
                      item.inventory_status === 'In Stock'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {item.inventory_status}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => router.back()}
          className="mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 transition"
        >
          Back to Forms
        </button>
      </div>
    </div>
  );
};

export default FormDetailsPage;
