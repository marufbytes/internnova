'use client';

import StudentNavbar from '@/components/layout/StudentNavbar';
import StudentSidebar from '@/components/layout/StudentSidebar';
import React, { useState } from 'react';



export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-100/60 font-sans">
      {/* 1. Full Width Header Navbar */}
      <StudentNavbar 
        isCollapsed={isCollapsed} 
        onToggleSidebar={() => setIsCollapsed(!isCollapsed)} 
      />

      {/* 2. Main Body with Sidebar + Dynamic Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Positioned Under Navbar */}
        <StudentSidebar isCollapsed={isCollapsed} />

        {/* Page Content Container */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
