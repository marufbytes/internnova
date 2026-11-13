'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogOut, type LucideIcon } from 'lucide-react';
import { authService } from '@/services/auth.service';

export interface SidebarNavItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

export interface RoleSidebarProps {
  isCollapsed: boolean;
  items: SidebarNavItem[];
  sectionLabel?: string;
}

export default function RoleSidebar({
  isCollapsed,
  items,
  sectionLabel = 'WORKSPACE',
}: RoleSidebarProps) {
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error('Logout error:', err);
    }
    window.location.href = '/auth/login';
  };

  return (
    <aside
      className={`bg-white border-r border-slate-200 py-6 px-3 flex flex-col justify-between shrink-0 h-[calc(100vh-4rem)] z-20 transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="overflow-y-auto overflow-x-hidden">
        {!isCollapsed && (
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3 px-3">
            {sectionLabel}
          </p>
        )}
        <nav className="space-y-1">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                title={isCollapsed ? item.name : undefined}
                className={`flex items-center gap-3 ${
                  isCollapsed ? 'justify-center px-2 py-3' : 'px-3 py-2.5'
                } rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-800 font-bold'
                    : 'text-slate-500 hover:bg-blue-50 hover:text-blue-800'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {!isCollapsed && <span className="whitespace-nowrap">{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      <button
        onClick={handleLogout}
        title={isCollapsed ? 'Log out' : undefined}
        className={`w-full bg-rose-50/80 hover:bg-rose-100/80 text-rose-600 border border-rose-100 p-2.5 rounded-2xl flex items-center gap-3 ${
          isCollapsed ? 'justify-center' : ''
        } transition-colors mt-4 shrink-0 cursor-pointer`}
      >
        <LogOut className="w-4 h-4 shrink-0" />
        {!isCollapsed && <span className="text-xs font-bold">Log out</span>}
      </button>
    </aside>
  );
}
