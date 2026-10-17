import React from 'react';
import StudentSidebar from '@/components/layout/StudentSidebar';
import StudentNavbar from '@/components/layout/StudentNavbar';

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full bg-[#F8FAFC] text-slate-900 font-sans overflow-hidden">
      {/* বাম পাশে Persistent Sidebar */}
      <StudentSidebar />

      {/* ডান পাশে Navbar ও Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        <StudentNavbar />
        <main className="flex-1 p-8 bg-[#F8FAFC]">
          {children}
        </main>
      </div>
    </div>
  );
}
