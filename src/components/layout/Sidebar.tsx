import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path ? 'bg-gray-700 text-white' : 'hover:bg-gray-700 text-gray-300';
  };

  return (
    <div className="bg-gray-800 text-white w-64 min-h-full fixed top-0 left-0">
      <div className="p-6 text-xl font-bold">
        <h1>Stock Dashboard</h1>
      </div>
      <div className="mt-8">
        <ul>
          <li>
            <Link href="/dashboard" className={`block px-6 py-2 cursor-pointer ${isActive('/dashboard')}`}>
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/create-form" className={`block px-6 py-2 cursor-pointer ${isActive('/create-form')}`}>
              Create Form
            </Link>
          </li>
          <li>
            <Link href="/check-results" className={`block px-6 py-2 cursor-pointer ${isActive('/check-results')}`}>
              Check Results
            </Link>
          </li>
          <li>
            <Link href="/create-additional-document" className={`block px-6 py-2 cursor-pointer ${isActive('/create-additional-document')}`}>
              Create Additional Document
            </Link>
          </li>
          <li>
            <Link href="/additional-document-results" className={`block px-6 py-2 cursor-pointer ${isActive('/additional-document-results')}`}>
              Additional Document Results
            </Link>
          </li>
          <li>
            <Link href="/settings" className={`block px-6 py-2 cursor-pointer ${isActive('/settings')}`}>
              Settings
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
