'use client';

import React from 'react';
import { Search, Bell } from 'lucide-react';

export default function StudentNavbar() {
  return (
    <header className="h-16 min-h-[4rem] max-h-[4rem] bg-white border-b border-slate-200/80 px-8 flex items-center justify-between gap-4 sticky top-0 z-10 shrink-0 w-full">
      {/* Search Input */}
      <div className="relative flex-1 max-w-xl">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input 
          type="text" 
          placeholder="Search internships by title, company, or skill" 
          className="w-full bg-slate-50 border border-slate-200/80 rounded-xl pl-10 pr-12 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-slate-300 text-slate-800 placeholder:text-slate-400"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 border border-slate-200 px-1.5 py-0.5 rounded bg-white font-mono">
        </div>
      </div>

      {/* Profile & Notifications */}
      <div className="flex items-center gap-3 shrink-0">
        <button 
          aria-label="Notifications"
          className="p-2 text-slate-500 hover:bg-slate-100 rounded-full border border-slate-200/80 transition-colors"
        >
          <Bell className="w-4 h-4" />
        </button>
        
        <div className="flex items-center gap-3 bg-slate-50 border border-slate-200/80 rounded-full py-1 px-3">
          <div className="w-7 h-7 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">
            AR
          </div>
          <div className="text-left leading-tight hidden sm:block">
            <p className="text-xs font-bold text-slate-900">Abrar Rahman</p>
            <p className="text-[10px] text-slate-500 font-medium">Student</p>
          </div>
        </div>
      </div>
    </header>
  );
}
