'use client';

import React, { useState } from 'react';
import AlumniNavbar from '@/components/layout/AlumniNavbar';
import AlumniSidebar from '@/components/layout/AlumniSidebar';

export default function AlumniLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="h-screen overflow-hidden flex flex-col bg-slate-50 font-sans">
      <AlumniNavbar
        isCollapsed={isCollapsed}
        onToggleSidebar={() => setIsCollapsed(!isCollapsed)}
      />
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <AlumniSidebar isCollapsed={isCollapsed} />
        <main className="flex-1 overflow-y-auto p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
