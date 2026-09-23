'use client';

import React from 'react';
import Link from 'next/link';
import { GraduationCap, Bell, User } from 'lucide-react';

interface HeaderProps {
  userRole?: string;
  userName?: string;
}

export default function Header({ userRole = 'Student', userName = 'John Doe' }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between shadow-sm">
      <Link href="/" className="flex items-center space-x-3">
        <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white">
          <GraduationCap className="w-5 h-5" />
        </div>
        <span className="text-xl font-bold text-gray-900 leading-tight">
          InternNova <span className="block text-xs font-normal text-gray-500">Connect</span>
        </span>
      </Link>

      <div className="flex items-center space-x-4">
        <button className="relative p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-50 rounded-xl transition">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center space-x-3 pl-3 border-l border-gray-200">
          <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
            {userName.charAt(0)}
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-semibold text-gray-800 leading-tight">{userName}</p>
            <p className="text-[11px] text-gray-500">{userRole}</p>
          </div>
        </div>
      </div>
    </header>
  );
}