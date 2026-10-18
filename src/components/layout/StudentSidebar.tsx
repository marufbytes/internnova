'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Search,
  FileText,
  Calendar,
  Bookmark,
  User,
  LogOut
} from 'lucide-react';

interface StudentSidebarProps {
  isCollapsed: boolean;
}

export default function StudentSidebar({ isCollapsed }: StudentSidebarProps) {
  const pathname = usePathname();
  const [studentName, setStudentName] = useState('Abrar Shahriar');

  useEffect(() => {
    // Sothik /users/me endpoint theke HTTP-only cookie-r maddhome data fetch kora
    fetch('http://localhost:3000/users/me', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // NestJS HTTP-only cookie pathanor jonno khuboi zori
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch sidebar profile');
        return res.json();
      })
      .then((data) => {
        if (data) {
          let fullName = '';
          if (data.firstName || data.lastName) {
            fullName = `${data.firstName || ''} ${data.lastName || ''}`.trim();
          } else if (data.name) {
            fullName = data.name;
          }
          if (fullName) {
            setStudentName(fullName);
          }
        }
      })
      .catch((err) => {
        console.error('Sidebar profile fetch error:', err);
      });
  }, []);

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Browse Internships', href: '/internships', icon: Search },
    { name: 'My Applications', href: '/applications', icon: FileText, badge: '5' },
    { name: 'Interviews', href: '/interviews', icon: Calendar },
    { name: 'Saved Internships', href: '/saved-internships', icon: Bookmark },
  ];

  const accountItems = [
    { name: 'Profile', href: '/profile', icon: User },
  ];

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:3000/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (err) {
      console.error('Logout error:', err);
    }
    window.location.href = '/auth/login';
  };

  return (
    <aside
      className={`bg-white border-r border-slate-200 py-6 px-3 flex flex-col justify-between shrink-0 h-[calc(100vh-4rem)] z-20 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'
        }`}
    >
      <div className="overflow-y-auto overflow-x-hidden">

        {/* WORKSPACE Section */}
        <div className="mb-6">
          {!isCollapsed && (
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3 px-3">
              WORKSPACE
            </p>
          )}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={isCollapsed ? item.name : undefined}
                  className={`flex items-center ${isCollapsed ? 'justify-center px-2 py-3' : 'justify-between px-3 py-2.5'} rounded-xl text-sm font-medium transition-colors ${isActive
                      ? 'bg-slate-100 text-slate-900 font-bold'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0" />
                    {!isCollapsed && <span className="whitespace-nowrap">{item.name}</span>}
                  </div>
                  {!isCollapsed && item.badge && (
                    <span className="bg-slate-100 text-slate-600 text-[11px] px-2 py-0.5 rounded-full font-semibold">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* ACCOUNT Section */}
        <div>
          {!isCollapsed && (
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3 px-3">
              ACCOUNT
            </p>
          )}
          <nav className="space-y-1">
            {accountItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={isCollapsed ? item.name : undefined}
                  className={`flex items-center ${isCollapsed ? 'justify-center px-2 py-3' : 'gap-3 px-3 py-2.5'} rounded-xl text-sm font-medium transition-colors ${isActive
                      ? 'bg-slate-100 text-slate-900 font-bold'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {!isCollapsed && <span className="whitespace-nowrap">{item.name}</span>}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        title={isCollapsed ? "Log out" : undefined}
        className={`w-full bg-rose-50/80 hover:bg-rose-100/80 text-rose-600 border border-rose-100 p-2.5 rounded-2xl flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'
          } transition-colors mt-4 shrink-0 group cursor-pointer`}
      >
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-9 h-9 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center shrink-0 group-hover:bg-rose-200/80 transition-colors">
            <LogOut className="w-4 h-4" />
          </div>
          {!isCollapsed && (
            <div className="text-left overflow-hidden">
              <p className="text-xs font-bold truncate">Log out</p>
              <p className="text-[11px] text-rose-500/80 truncate">{studentName}</p>
            </div>
          )}
        </div>
      </button>
    </aside>
  );
}
