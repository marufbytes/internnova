import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

export default function HRLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header userRole="HR Manager" />
      <div className="flex flex-1">
        <Sidebar role="HR" />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}