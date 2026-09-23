'use client';

import React from 'react';
import Link from 'next/link';
import { Briefcase, Users, Calendar, CheckCircle2, Plus } from 'lucide-react';

export default function HRDashboard() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto w-full">
      {/* Top Banner / Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">HR Portal Overview</h1>
          <p className="text-slate-500 text-sm mt-0.5">Manage internship listings and track student applications.</p>
        </div>
        <Link 
          href="/hr/post-job" 
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-blue-600 text-white rounded-xl text-xs font-semibold shadow-sm transition"
        >
          <Plus className="w-4 h-4" /> Post New Internship
        </Link>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 border border-slate-200/80 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500">Active Internships</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">4</p>
          </div>
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
            <Briefcase className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 border border-slate-200/80 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500">Total Applicants</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">38</p>
          </div>
          <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 border border-slate-200/80 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500">Interviews Scheduled</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">12</p>
          </div>
          <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
            <Calendar className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 border border-slate-200/80 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500">Hired Candidates</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">6</p>
          </div>
          <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Recent Applicants */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Recent Applicants</h2>
          <Link href="/hr/applications" className="text-xs font-semibold text-blue-600 hover:text-blue-700">View All →</Link>
        </div>

        <div className="divide-y divide-slate-100">
          <div className="py-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-slate-900">Alex Johnson</p>
              <p className="text-xs text-slate-500">Frontend Developer Intern • Applied 2026-09-21</p>
            </div>
            <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold rounded-md">IN_REVIEW</span>
          </div>

          <div className="py-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-slate-900">Sarah Smith</p>
              <p className="text-xs text-slate-500">UI/UX Designer Apprentice • Applied 2026-09-20</p>
            </div>
            <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-md">SHORTLISTED</span>
          </div>

          <div className="py-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-slate-900">Michael Brown</p>
              <p className="text-xs text-slate-500">Frontend Developer Intern • Applied 2026-09-18</p>
            </div>
            <span className="px-2.5 py-1 bg-rose-50 text-rose-700 text-[10px] font-bold rounded-md">REJECTED</span>
          </div>
        </div>
      </div>
    </div>
  );
}