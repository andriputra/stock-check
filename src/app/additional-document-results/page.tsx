'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/src/components/layout/DashboardLayout';
import { checkResult } from '@/src/api/checkResult';

interface CheckResult {
  form_number: number | string;
  check_result_item_id: string;
  submit_date: string;
  result_date?: string;
  status: string;
  part_number: string;
  description: string;
  quantity: number;
  inventory_status: Record<string, string>; // Updated type for inventory_status
}

export default function CheckResults() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<CheckResult[]>([]);
  const [filteredResults, setFilteredResults] = useState<CheckResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = (await checkResult()) || [];
        console.log('Fetched Data:', data); // Log the fetched data
        setResults(data);
        setFilteredResults(data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('An error occurred while fetching data.');
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);

    setFilteredResults(
      results.filter((item) =>
        [item.form_number, item.part_number, item.description, item.status]
          .map((field) => (field ? field.toString().toLowerCase() : ''))
          .some((field) => field.includes(query))
      )
    );
  };

  const renderInventoryStatus = (inventoryStatus: Record<string, string>) => {
    return (
      <ul>
        {Object.entries(inventoryStatus).map(([location, status]) => (
          <li key={location}>
            <strong>{location}:</strong> {status}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-100 px-8 py-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Check Results</h1>

        {loading ? (
          <div>Loading Check Results...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <>
            <div className="mb-8">
              <input
                type="text"
                placeholder="Search by form number, part number, or description..."
                value={search}
                onChange={handleSearch}
                className="w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 text-gray-900"
              />
            </div>

            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="px-6 py-3">Form Number</th>
                    <th className="px-6 py-3">Check Result Item ID</th>
                    <th className="px-6 py-3">End Customer</th>
                    <th className="px-6 py-3">Submit Date</th>
                    <th className="px-6 py-3">Result Date</th>
                    <th className="px-6 py-3">Part Number</th>
                    <th className="px-6 py-3">Description</th>
                    <th className="px-6 py-3">Quantity</th>
                    <th className="px-6 py-3">Inventory Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredResults.length > 0 ? (
                    filteredResults.map((item) => (
                      <tr
                        key={item.check_result_item_id}
                        className="border-b hover:bg-gray-100"
                      >
                        <td className="px-6 py-3 text-gray-800">{item.form_number || "N/A"}</td>
                        <td className="px-6 py-3 text-gray-800">{item.check_result_item_id || "N/A"}</td>
                        <td className="px-6 py-3 text-gray-800">{"Customer - "+ item.form_number || "N/A"}</td>
                        <td className="px-6 py-3 text-gray-800">{item.submit_date || "N/A"}</td>
                        <td className="px-6 py-3 text-gray-800">{item.result_date || "Pending"}</td>
                        <td className="px-6 py-3 text-gray-800">{item.part_number || "N/A"}</td>
                        <td className="px-6 py-3 text-gray-800">{item.description || "N/A"}</td>
                        <td className="px-6 py-3 text-gray-800">{item.quantity || 0}</td>
                        <td className="px-6 py-3 text-gray-800">
                          {renderInventoryStatus(item.inventory_status)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={9} className="text-center py-6 text-gray-800">
                        No results found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
