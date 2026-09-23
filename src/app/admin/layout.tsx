import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header userName="System Admin" userRole="Administrator" />
      <div className="flex flex-1">
        <Sidebar role="ADMIN" />
        <main className="flex-1 p-5 md:p-8">{children}</main>
      </div>
    </div>
  );
}