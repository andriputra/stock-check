import Sidebar from './Sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex overflow-hidden">
      <div className="w-64 fixed inset-y-0 left-0 bg-white shadow-md">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 overflow-auto">
        {children}
      </div>
    </div>
  );
}