'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { GraduationCap, Bell, Menu } from 'lucide-react';
import api from '@/lib/api';

export interface RoleNavbarProps {
  isCollapsed: boolean;
  onToggleSidebar: () => void;
  homeHref: string;
  roleLabel: string;
  fallbackName: string;
}

export default function RoleNavbar({
  isCollapsed,
  onToggleSidebar,
  homeHref,
  roleLabel,
  fallbackName,
}: RoleNavbarProps) {
  const [name, setName] = useState(fallbackName);

  useEffect(() => {
    api
      .get('/users/me')
      .then(({ data }) => {
        const full = `${data?.firstName || ''} ${data?.lastName || ''}`.trim() || data?.name;
        if (full) setName(full);
      })
      .catch((err) => console.error('Navbar profile fetch error:', err));
  }, []);

  return (
    <header className="sticky top-0 z-30 h-16 w-full bg-white border-b border-slate-200 px-4 md:px-6 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        <Link href={homeHref} className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-blue-700 bg-transparent text-blue-700">
            <GraduationCap className="h-5 w-5 text-blue-700" />
          </div>
          <span className="text-lg font-bold text-blue-800 leading-tight">
            InternNova
            <span className="block text-[10px] font-semibold text-slate-400">{roleLabel}</span>
          </span>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <button
          aria-label="Notifications"
          className="relative p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors"
        >
          <Bell className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2.5 border border-slate-200 rounded-2xl p-1 pr-3.5 bg-slate-50/50">
          <div className="w-8 h-8 bg-blue-800 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">
            {name.charAt(0).toUpperCase()}
          </div>
          <div className="text-left leading-tight hidden sm:block">
            <p className="text-xs font-bold text-slate-900">{name}</p>
            <p className="text-[10px] text-slate-400 font-semibold">{roleLabel}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
