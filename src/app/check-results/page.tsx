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
  order_point: string;
  end_customer: string;
  inventory_status: Record<string, string>;
  alternative_parts?: string;
}

const parseInventoryStatus = (statusString: string) => {
  const statusObj: Record<string, string> = {};
  statusString.split(', ').forEach((entry) => {
    const [key, value] = entry.split(': ');
    if (key && value) {
      statusObj[key.trim()] = value.trim();
    }
  });
  return statusObj;
};

const fixInventoryStatus = (item: CheckResult) => ({
  ...item,
  inventory_status:
    typeof item.inventory_status === 'string'
      ? parseInventoryStatus(item.inventory_status)
      : item.inventory_status,
});

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
        console.log('Fetched Data:', data);
        const fixedData = data.map(fixInventoryStatus);
        setResults(fixedData);
        setFilteredResults(fixedData);
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
      <div>
        {Object.entries(inventoryStatus).map(([location, status]) => (
          <div key={location}>
            <strong>{location}:</strong> {status}
          </div>
        ))}
      </div>
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
              <table className="min-w-full text-sm text-left border border-gray-200">
                <thead className="bg-gray-800 text-white text-left">
                  <tr>
                    <th className="px-4 py-3 w-28">Form Number</th>
                    <th className="px-4 py-3 w-40">Check Result Item ID</th>
                    <th className="px-4 py-3 w-32">End Customer</th>
                    <th className="px-4 py-3 w-32">Submit Date</th>
                    <th className="px-4 py-3 w-32">Result Date</th>
                    <th className="px-4 py-3 w-40">Part Number</th>
                    <th className="px-4 py-3 w-64">Description</th>
                    <th className="px-4 py-3 w-20">Quantity</th>
                    <th className="px-4 py-3 w-32">Order Point</th>
                    <th className="px-4 py-3 w-80">Inventory Status</th>
                    <th className="px-4 py-3 w-40">2nd PN</th>
                    <th className="px-4 py-3 w-64">2nd PN Description</th>
                    <th className="px-4 py-3 w-40">3rd PN</th>
                    <th className="px-4 py-3 w-64">3rd PN Description</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredResults.length > 0 ? (
                    filteredResults.map((item) => (
                      <tr key={item.check_result_item_id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3 text-gray-800">{item.form_number || 'N/A'}</td>
                        <td className="px-4 py-3 text-gray-800">{item.check_result_item_id || 'N/A'}</td>
                        <td className="px-4 py-3 text-gray-800">{item.end_customer || 'N/A'}</td>
                        <td className="px-4 py-3 text-gray-800">{item.submit_date || 'N/A'}</td>
                        <td className="px-4 py-3 text-gray-800">{item.result_date || 'Pending'}</td>
                        <td className="px-4 py-3 text-gray-800">{item.part_number || 'N/A'}</td>
                        <td className="px-4 py-3 text-gray-800">{item.description || 'N/A'}</td>
                        <td className="px-4 py-3 text-gray-800">{item.quantity || 0}</td>
                        <td className="px-4 py-3 text-gray-800">{item.order_point || 'N/A'}</td>
                        <td className="px-4 py-3 text-gray-800">{renderInventoryStatus(item.inventory_status)}</td>
                        <td className="px-8 py-4 text-gray-800">2nd</td>
                        <td className="px-8 py-4 text-gray-800">2nd description</td>
                        <td className="px-8 py-4 text-gray-800">3rd</td>
                        <td className="px-8 py-4 text-gray-800">3rd description</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={14} className="text-center py-6 text-gray-800">No results found.</td>
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
