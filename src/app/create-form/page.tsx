'use client';

import { useState } from 'react';
// import { useRouter } from 'next/navigation';
import DashboardLayout from '@/src/components/layout/DashboardLayout';
import { createForm } from '@/src/api/form';


export default function CreateFormPage() {
  // const router = useRouter();
  const [items, setItems] = useState([{ end_customer: '', order_point: '', part_number: '', quantity: 0 }]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddItem = () => {
    setItems([...items, { end_customer: '', order_point: '', part_number: '', quantity: 0 }]);
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, idx) => idx !== index));
  };

  const handleChange = (index: number, field: string, value: string | number) => {
    const updatedItems = items.map((item, idx) =>
      idx === index ? { ...item, [field]: value } : item
    );
    setItems(updatedItems);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    console.log("Submitting data:", items);
    try {
      const response = await createForm(items);
      console.log("Response from API:", response);
      setItems([{ end_customer: '', order_point: '', part_number: '', quantity: 0 }]);
      if (response?.message) {
        alert(response.message || 'Form created successfully');
      } else {
        setError('Failed to create the form. No message in response.');
      }
    } catch (err) {
      setError("Error occurred");
      console.error('Error: ', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center">
        <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8 mt-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Create New Form</h2>

          {error && <p className="text-red-600 font-medium mb-4">{error}</p>}

          <form onSubmit={handleSubmit}>
            {items.map((item, index) => (
              <div key={index} className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Item {index + 1}</h3>
                  {items.length > 1 && (
                    <button
                      type="button"
                      className="text-red-600 font-medium hover:underline"
                      onClick={() => handleRemoveItem(index)}
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">End Customer</label>
                    <input
                      type="text"
                      value={item.end_customer}
                      onChange={(e) => handleChange(index, 'end_customer', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-400 text-gray-900"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-1">Order Point</label>
                    <select
                      value={item.order_point}
                      onChange={(e) => handleChange(index, 'order_point', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-400 text-gray-900"
                      required
                    >
                      <option value="" disabled>
                        Select an Order Point
                      </option>
                      <option value="Jakarta">Jakarta</option>
                      <option value="Bandung">Bandung</option>
                      <option value="Angsana">Angsana</option>
                      <option value="Kendari">Kendari</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-1">Part Number</label>
                    <input
                      type="text"
                      value={item.part_number}
                      onChange={(e) => handleChange(index, 'part_number', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-400 text-gray-900"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-1">Quantity</label>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleChange(index, 'quantity', parseInt(e.target.value, 10))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-400 text-gray-900"
                      required
                    />
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddItem}
              className="bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 mb-6"
            >
              Add Item
            </button>

            <div className="flex justify-end">
              <button
                type="submit"
                className={`bg-green-500 text-white font-medium py-2 px-6 rounded-lg hover:bg-green-600 transition duration-300 ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Create Form'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
