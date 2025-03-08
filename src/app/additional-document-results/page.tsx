'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/src/components/layout/DashboardLayout';
import { fetchAdditionalDocuments } from '@/src/api/additionalDocuments';

interface AdditionalDocument {
  id: number;
  part_number: string;
  description: string;
  vin_number: string;
  engine_number: string;
  unit_type: string;
  quantity: number;
}

export default function AdditionalDocuments() {
  const [search, setSearch] = useState('');
  const [documents, setDocuments] = useState<AdditionalDocument[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState<AdditionalDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = (await fetchAdditionalDocuments()) || [];
        console.log('Fetched Data:', data);
        setDocuments(data);
        setFilteredDocuments(data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('An error occurred while fetching data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);

    setFilteredDocuments(
      documents.filter((doc) =>
        [doc.part_number, doc.description, doc.vin_number, doc.engine_number, doc.unit_type]
          .map((field) => (field ? field.toString().toLowerCase() : ''))
          .some((field) => field.includes(query))
      )
    );
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-100 px-8 py-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Additional Documents</h1>

        {loading ? (
          <div>Loading documents...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <>
            <div className="mb-8">
              <input
                type="text"
                placeholder="Search by part number, description, or VIN number..."
                value={search}
                onChange={handleSearch}
                className="w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 text-gray-900"
              />
            </div>

            <div className="w-full overflow-x-auto">
              <div className="min-w-max bg-white shadow-md rounded-lg">
                <table className="w-full text-sm text-left border border-gray-200">
                  <thead className="bg-gray-800 text-white">
                    <tr>
                      <th className="px-6 py-3">ID</th>
                      <th className="px-6 py-3">Part Number</th>
                      <th className="px-6 py-3">Description</th>
                      <th className="px-6 py-3">VIN Number</th>
                      <th className="px-6 py-3">Engine Number</th>
                      <th className="px-6 py-3">Unit Type</th>
                      <th className="px-6 py-3">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDocuments.length > 0 ? (
                      filteredDocuments.map((doc) => (
                        <tr
                          key={doc.id}
                          className="border-b hover:bg-gray-100"
                        >
                          <td className="px-6 py-3 text-gray-800">{doc.id}</td>
                          <td className="px-6 py-3 text-gray-800">{doc.part_number}</td>
                          <td className="px-6 py-3 text-gray-800">{doc.description}</td>
                          <td className="px-6 py-3 text-gray-800">{doc.vin_number}</td>
                          <td className="px-6 py-3 text-gray-800">{doc.engine_number}</td>
                          <td className="px-6 py-3 text-gray-800">{doc.unit_type}</td>
                          <td className="px-6 py-3 text-gray-800">{doc.quantity}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="text-center py-6 text-gray-800">
                          No documents found.
                        </td>
                      </tr>
                    )}
                  </tbody>
              </table>
              </div>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
