import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header userRole="Student" />
      <div className="flex flex-1">
        <Sidebar role="STUDENT" />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}