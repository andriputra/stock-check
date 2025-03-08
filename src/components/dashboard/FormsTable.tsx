// components/FormsTable.tsx
import { useRouter } from 'next/navigation';

interface Form {
  formNumber: string;
  submitDate: string;
  resultDate: string;
  customer: string;
}

interface FormsTableProps {
  forms: Form[];
}

const FormsTable = ({ forms }: FormsTableProps) => {
  const router = useRouter();
  console.log("Forms data:", forms);
  const handleViewClick = (formNumber: string) => {
    router.push(`/form-details/${formNumber}`);
  };

  // Deduplicate forms by formNumber
  const uniqueForms = Array.from(
    forms.reduce((map, form) => {
      if (!map.has(form.formNumber)) {
        map.set(form.formNumber, form);
      }
      return map;
    }, new Map<string, Form>()).values()
  );

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-md">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-gray-600">
            <th className="px-6 py-3 text-left">Customer</th>
            <th className="px-6 py-3 text-left">Form Number</th>
            <th className="px-6 py-3 text-left">Submit Date</th>
            <th className="px-6 py-3 text-left">Result Date</th>
            <th className="px-6 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {uniqueForms.map((form, index) => (
            <tr
              key={form.formNumber}
              className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
            >
              <td className="px-6 py-3 text-gray-700 text-sm">{form.customer}</td>
              <td className="px-6 py-3 text-gray-700 text-sm">{form.formNumber}</td>
              <td className="px-6 py-3 text-gray-700 text-sm">{form.submitDate ? new Date(form.submitDate).toLocaleString('sv-SE').replace(' ', ' | ') : 'N/A'}</td>
              <td className="px-6 py-3 text-gray-700 text-sm">{form.resultDate ? new Date(form.resultDate).toLocaleString('sv-SE').replace(' ', ' | ') : 'Pending'}</td>
              <td
                className="px-6 py-3 text-blue-500 cursor-pointer text-sm"
                onClick={() => handleViewClick(form.formNumber)}
              >
                View
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FormsTable;
