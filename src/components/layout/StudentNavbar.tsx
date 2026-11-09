'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, Search, Bell } from 'lucide-react';

interface StudentNavbarProps {
  isCollapsed: boolean;
  onToggleSidebar: () => void;
}

export default function StudentNavbar({ isCollapsed, onToggleSidebar }: StudentNavbarProps) {
  const [studentName, setStudentName] = useState('Loading...');
  const [roleText, setRoleText] = useState('Student');
  const [initials, setInitials] = useState('U');

  useEffect(() => {
    fetch('http://localhost:3000/users/me', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch profile');
        return res.json();
      })
      .then((data) => {
        updateUserInfo(data);
      })
      .catch((err) => {
        console.error('Navbar profile fetch error:', err);
        fallbackDefault();
      });
  }, []);

  const updateUserInfo = (data: any) => {
    let fullName = '';
    if (data.firstName || data.lastName) {
      fullName = `${data.firstName || ''} ${data.lastName || ''}`.trim();
    } else if (data.name) {
      fullName = data.name;
    } else {
      fullName = 'User';
    }

    setStudentName(fullName);

    const computedInitials = fullName
      .split(' ')
      .filter(Boolean)
      .map((n: string) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();

    setInitials(computedInitials || 'US');

    if (data.role) {
      const formattedRole = data.role.charAt(0).toUpperCase() + data.role.slice(1).toLowerCase();
      setRoleText(formattedRole);
    }
  };

  const fallbackDefault = () => {
    setStudentName('Guest User');
    setInitials('GU');
    setRoleText('Visitor');
  };

  return (
    <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between sticky top-0 z-30 w-full shrink-0">
      
      {/* Left Branding Area */}
      <div 
        className={`flex items-center gap-3 px-4 h-full border-r border-slate-200/80 shrink-0 transition-all duration-300 ${
          isCollapsed ? 'w-20 justify-center' : 'w-64 justify-start'
        }`}
      >
        <button 
          onClick={onToggleSidebar}
          aria-label="Toggle menu" 
          className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>

        {!isCollapsed && (
          <div className="flex items-center gap-2.5 overflow-hidden">
            <Image 
              src="/logo.png" 
              alt="InternNova Logo" 
              width={28} 
              height={28} 
              className="w-7 h-7 object-contain shrink-0"
            />
            <div className="flex flex-col leading-none">
              <span className="text-sm font-extrabold text-slate-900 tracking-tight">
                InternNova
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
            placeholder="Search internships, candidates, roles..." 
            className="w-full bg-slate-50 border border-slate-300 rounded-full pl-11 pr-4 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:bg-white transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Right Section: Notifications & Dynamic User Card */}
      <div className="flex items-center gap-4 px-6 shrink-0">
        <div className="relative">
          <button 
            aria-label="Notifications"
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-full border border-slate-200 transition-colors cursor-pointer"
          >
            <Bell className="w-4 h-4" />
          </button>
          <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
            5
          </span>
        </div>

        {/* Dynamic User Profile Badge */}
        <div className="flex items-center gap-2.5 border border-slate-200 rounded-2xl p-1 pr-3.5 bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer">
          <div className="relative">
            <div className="w-8 h-8 bg-slate-950 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 shadow-sm">
              {initials}
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
          </div>
          <div className="text-left leading-tight hidden sm:block">
            <p className="text-xs font-bold text-slate-900">{studentName}</p>
            <p className="text-[10px] text-slate-400 font-semibold">{roleText}</p>
          </div>
        </div>
      </div>

    </header>
  );
}
