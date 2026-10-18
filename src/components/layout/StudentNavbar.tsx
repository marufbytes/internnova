'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, Search, Bell } from 'lucide-react';

interface StudentNavbarProps {
  isCollapsed: boolean;
  onToggleSidebar: () => void;
}

export default function StudentNavbar({ isCollapsed, onToggleSidebar }: StudentNavbarProps) {
  const [studentName, setStudentName] = useState('Abrar Shahriar');
  const [initials, setInitials] = useState('AS');

  useEffect(() => {
    const token = document.cookie
      .split(';')
      .find((c) => c.trim().startsWith('access_token='))
      ?.split('=')[1];

    if (token) {
      fetch('http://localhost:3000/auth/profile', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data && data.name) {
            setStudentName(data.name);
            const computedInitials = data.name
              .split(' ')
              .map((n: string) => n[0])
              .join('')
              .substring(0, 2)
              .toUpperCase();
            setInitials(computedInitials);
          }
        })
        .catch(() => {});
    }
  }, []);

  return (
    <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between sticky top-0 z-30 w-full shrink-0">
      
      {/* Left Branding Area: Exact Same Width as Sidebar */}
      <div 
        className={`flex items-center gap-3 px-4 h-full border-r border-slate-200/80 shrink-0 transition-all duration-300 ${
          isCollapsed ? 'w-20 justify-center' : 'w-64 justify-start'
        }`}
      >
        <button 
          onClick={onToggleSidebar}
          aria-label="Toggle menu" 
          className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        {!isCollapsed && (
          <div className="flex items-center gap-2.5 overflow-hidden">
            <Image 
              src="/logo.png" 
              alt="UniCareer Logo" 
              width={28} 
              height={28} 
              className="w-7 h-7 object-contain shrink-0"
            />
            <div className="flex flex-col leading-none">
              <span className="text-sm font-extrabold text-slate-900 tracking-tight">
                UniCareer
              </span>
              <span className="text-[10px] font-semibold text-slate-400 mt-0.5">
                Connect
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Middle Section: Search Field */}
      <div className="flex-1 max-w-xl mx-6">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search candidates, roles..." 
            className="w-full bg-slate-50 border border-slate-300 rounded-full pl-11 pr-4 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:bg-white transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Right Section: Notifications & User Card */}
      <div className="flex items-center gap-4 px-6 shrink-0">
        <div className="relative">
          <button 
            aria-label="Notifications"
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-full border border-slate-200 transition-colors"
          >
            <Bell className="w-4 h-4" />
          </button>
          <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
            5
          </span>
        </div>

        <div className="flex items-center gap-2.5 border border-slate-200 rounded-2xl p-1 pr-3 bg-slate-50/50 hover:bg-slate-50 transition-colors">
          <div className="relative">
            <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">
              {initials}
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
          </div>
          <div className="text-left leading-tight hidden sm:block">
            <p className="text-xs font-bold text-slate-900">{studentName}</p>
            <p className="text-[10px] text-slate-400 font-medium">Student</p>
          </div>
        </div>
      </div>

    </header>
  );
}
