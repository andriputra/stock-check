'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/src/components/layout/DashboardLayout';
import { createForm } from '@/src/api/form';
// import axios from 'axios';
import { debounce } from 'lodash';
import apiClient from '@/src/api/apiClient';
// import Select from 'react-select';

interface FormItem {
  end_customer: string;
  order_point: string;
  part_number: string;
  quantity: number;
}

export default function CreateFormPage() {
  const [items, setItems] = useState<FormItem[]>([
    { end_customer: '', order_point: '', part_number: '', quantity: 0 }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [customerOptions, setCustomerOptions] = useState<{ id: string; nama: string; value: string }[]>([]);
  const [partNumberOptions, setPartNumberOptions] = useState<{ id: string; code: string; value: string }[]>([]);

  const searchCustomers = debounce(async (query: string) => {
    if (!query.trim()) return setCustomerOptions([]);
    try {
      console.log("Fetching customers for:", query);
      const response = await apiClient.get('/api/customers', { params: { nama: query }, withCredentials: true });
      console.log("Customer response:", response.data);
      setCustomerOptions(
        response.data.map((nama: string, index: number) => ({ id: String(index), nama, value: nama }))
      );
    } catch (err) {
      console.error("Error fetching customers:", err);
      setCustomerOptions([]);
    }
  }, 300);

  const searchPartNumbers = debounce(async (query: string) => {
    if (!query.trim()) return setPartNumberOptions([]);
    try {
      console.log("Fetching part numbers for:", query);
      const response = await apiClient.get('/api/datapn', { params: { code: query }, withCredentials: true });
      console.log("Part number response:", response.data);
      setPartNumberOptions(
        response.data.map((code: string, index: number) => ({ id: String(index), code }))
      );
    } catch (err) {
      console.error("Error fetching part numbers:", err);
      setPartNumberOptions([]);
    }
  }, 300);

  const handleAddItem = () => {
    setItems([...items, { end_customer: '', order_point: '', part_number: '', quantity: 0 }]);
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, idx) => idx !== index));
  };
  const handleChange = (index: number, field: keyof FormItem, value: string | number) => {
    console.log(`Changing field: ${field}, Value: ${value}`);
    
    const updatedItems = items.map((item, idx) =>
      idx === index ? { ...item, [field]: value } : item
    );
    setItems(updatedItems);
  
    if (field === 'end_customer') {
      console.log("Triggering customer search...");
      searchCustomers(value as string);
    }
    if (field === 'part_number') {
      console.log("Triggering part number search...");
      searchPartNumbers(value as string);
    }
  };

  const handleSelectCustomer = (index: number, name: string) => {
    handleChange(index, 'end_customer', name);
    setCustomerOptions(prevOptions => prevOptions.filter(c => c.nama !== name));
  };

  const handleSelectPartNumber = (index: number, code: string) => {
    handleChange(index, 'part_number', code);
    setPartNumberOptions(prevOptions => prevOptions.filter(c => c.code !== code));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await createForm({ items });

      setItems([{ end_customer: '', order_point: '', part_number: '', quantity: 0 }]);
      alert(response?.message || 'Form created successfully');
    } catch (err: any) {
      console.error('Full error object:', err);
      setError(err.response?.data?.message || 'API request failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    console.log("Updated customer options:", customerOptions);
  }, [customerOptions]);

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
                  <div className="relative">
                    <label className="block text-gray-700 font-medium mb-1">End Customer</label>
                    <input
                      type="text"
                      value={item.end_customer}
                      onChange={(e) => handleChange(index, 'end_customer', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-400 text-gray-900"
                      required
                    />
                    {customerOptions.length > 0 && !items.some(item => item.end_customer === customerOptions[0].nama) && (
                      <ul className="absolute bg-white border border-gray-300 mt-1 w-full rounded-lg shadow-lg z-10">
                        {customerOptions.map((customer) => (
                          <li
                            key={customer.id}
                            onClick={() => handleSelectCustomer(index, customer.nama)}
                            className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                          >
                            <span className='text-black'>{customer.nama}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Order Point */}
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
                  <div className="relative">
                    <label className="block text-gray-700 font-medium mb-1">Part Number</label>
                    <input
                      type="text"
                      value={item.part_number}
                      onChange={(e) => handleChange(index, 'part_number', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-400 text-gray-900"
                      required
                    />
                    {partNumberOptions.length > 0 && !items.some(item => item.part_number === partNumberOptions[0].code) &&  (
                      <ul className="absolute bg-white border border-gray-300 mt-1 w-full rounded-lg shadow-lg">
                        {partNumberOptions.map((part) => (
                          <li
                            key={part.id}
                            onClick={() => handleSelectPartNumber(index, part.code)}
                            className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                          >
                             <span className='text-black'>{part.code}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  {/* Quantity */}
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
                className={`bg-green-500 text-white font-medium py-2 px-6 rounded-lg hover:bg-green-600 transition duration-300 ${ isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Create Form'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}

