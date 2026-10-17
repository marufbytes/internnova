'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Search, 
  FileText, 
  Calendar, 
  Bookmark, 
  User, 
  Settings, 
  Menu,
  LogOut
} from 'lucide-react';

export default function StudentSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Browse Internships', href: '/internships', icon: Search },
    { name: 'My Applications', href: '/applications', icon: FileText, badge: '5' },
    { name: 'Interviews', href: '/interviews', icon: Calendar },
    { name: 'Saved Internships', href: '/saved-internships', icon: Bookmark },
  ];

  const accountItems = [
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const handleLogout = () => {
    // Logout logic (e.g., clearing session/tokens and redirecting)
    window.location.href = '/';
  };

  return (
    <aside 
      className={`bg-white border-r border-slate-200/80 py-6 px-3 flex flex-col justify-between shrink-0 h-screen z-20 transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="overflow-y-auto overflow-x-hidden pr-0.5">
        {/* Top Header & Always 3-Line Menu Button */}
        <div className={`flex items-center mb-8 px-2 ${isCollapsed ? 'flex-col gap-4 items-center' : 'justify-between'}`}>
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-black rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0">
              IN
            </div>
            {!isCollapsed && (
              <span className="font-bold text-lg tracking-tight text-slate-900 transition-opacity duration-200 whitespace-nowrap">
                InternNova
              </span>
            )}
          </Link>

          {/* 3-Line Menu Button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200/60 shrink-0"
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>

        {/* WORKSPACE Navigation */}
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
                  className={`flex items-center ${isCollapsed ? 'justify-center px-2 py-3' : 'justify-between px-3 py-2.5'} rounded-xl text-sm font-medium transition-colors ${
                    isActive 
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

        {/* ACCOUNT Navigation */}
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
                  className={`flex items-center ${isCollapsed ? 'justify-center px-2 py-3' : 'gap-3 px-3 py-2.5'} rounded-xl text-sm font-medium transition-colors ${
                    isActive 
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

      {/* Logout Button Section */}
      <button 
        onClick={handleLogout}
        title={isCollapsed ? "Log out" : undefined}
        className={`w-full bg-rose-50/80 hover:bg-rose-100/80 text-rose-600 border border-rose-100 p-2.5 rounded-2xl flex items-center ${
          isCollapsed ? 'justify-center' : 'justify-between'
        } transition-colors mt-4 shrink-0 group`}
      >
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-9 h-9 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center shrink-0 group-hover:bg-rose-200/80 transition-colors">
            <LogOut className="w-4 h-4" />
          </div>
          {!isCollapsed && (
            <div className="text-left overflow-hidden">
              <p className="text-xs font-bold truncate">Log out</p>
              <p className="text-[11px] text-rose-500/80 truncate">Abrar Rahman</p>
            </div>
          )}
        </div>
      </button>
    </aside>
  );
}
