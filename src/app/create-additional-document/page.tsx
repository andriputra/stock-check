'use client';

import { useState } from 'react';
import DashboardLayout from '@/src/components/layout/DashboardLayout';
import { createAdditionalDocument } from '@/src/api/createAdditionalDocument';

export default function CreateAdditionalDocumentPage() {
  const [additionalDocuments, setAdditionalDocuments] = useState([
    {
      part_number: '',
      description: '',
      vin_number: '',
      engine_number: '',
      unit_type: '',
      quantity: 0,
    },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddItem = () => {
    setAdditionalDocuments([
      ...additionalDocuments,
      {
        part_number: '',
        description: '',
        vin_number: '',
        engine_number: '',
        unit_type: '',
        quantity: 0,
      },
    ]);
  };

  const handleRemoveItem = (index: number) => {
    setAdditionalDocuments(additionalDocuments.filter((_, idx) => idx !== index));
  };

  const handleChange = (index: number, field: string, value: string | number) => {
    const updatedItems = additionalDocuments.map((item, idx) =>
      idx === index ? { ...item, [field]: value } : item
    );
    setAdditionalDocuments(updatedItems);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await createAdditionalDocument(additionalDocuments);
      setAdditionalDocuments([
        {
          part_number: '',
          description: '',
          vin_number: '',
          engine_number: '',
          unit_type: '',
          quantity: 0,
        },
      ]);
      if (response?.message) {
        alert(response.message || 'Form created successfully');
      } else {
        setError('Failed to create the form. No message in response.');
      }
    } catch (err) {
      setError('Error occurred');
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
            {additionalDocuments.map((item, index) => (
              <div key={index} className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Item {index + 1}</h3>
                  {additionalDocuments.length > 1 && (
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
                    <label className="block text-gray-700 font-medium mb-1">Description</label>
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => handleChange(index, 'description', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-400 text-gray-900"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-1">Vin Number</label>
                    <input
                      type="text"
                      value={item.vin_number}
                      onChange={(e) => handleChange(index, 'vin_number', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-400 text-gray-900"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-1">Engine Number</label>
                    <input
                      type="text"
                      value={item.engine_number}
                      onChange={(e) => handleChange(index, 'engine_number', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-400 text-gray-900"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-1">Unit Type</label>
                    <input
                      type="text"
                      value={item.unit_type}
                      onChange={(e) => handleChange(index, 'unit_type', e.target.value)}
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
