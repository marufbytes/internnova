"use client";


import HrNavbar from "@/components/layout/HrNavbar";
import HrSidebar from "@/components/layout/HrSidebar";
import { useState } from "react";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100 text-slate-800 font-sans antialiased">
      {/* Fixed Sidebar */}
      <HrSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content Layout Wrapper */}
      <div
        className={`transition-all duration-300 ease-in-out flex flex-col min-h-screen ${
          isSidebarOpen ? "pl-64" : "pl-20"
        }`}
      >
        {/* Fixed Top Navbar */}
        <HrNavbar
          isOpen={isSidebarOpen}
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        {/* Dynamic Page Content */}
        <main className="flex-1 pt-24 px-4 md:px-8 pb-10 w-full max-w-full overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}

