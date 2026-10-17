'use client';

import React from 'react';
import Link from 'next/link';
import { 
  FileText, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  ChevronRight, 
  Video 
} from 'lucide-react';

export default function DashboardPage() {
  const recentApplications = [
    {
      title: 'Product Design Intern',
      company: 'Pathao',
      logo: 'P',
      appliedDate: '18 May 2025',
      status: 'Interview Scheduled',
      statusBg: 'bg-blue-50 text-blue-600 border border-blue-100',
      interview: '22 May, 10:30 AM',
    },
    {
      title: 'Frontend Developer Intern',
      company: 'bKash',
      logo: 'b',
      appliedDate: '16 May 2025',
      status: 'Under Review',
      statusBg: 'bg-amber-50 text-amber-600 border border-amber-100',
      interview: '—',
    },
    {
      title: 'Business Analyst Intern',
      company: 'ShopUp',
      logo: 'S',
      appliedDate: '12 May 2025',
      status: 'Pending',
      statusBg: 'bg-amber-50/70 text-amber-700 border border-amber-100',
      interview: '—',
    },
    {
      title: 'Software Engineering Intern',
      company: 'Brain Station 23',
      logo: 'B',
      appliedDate: '08 May 2025',
      status: 'Accepted',
      statusBg: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
      interview: 'Completed',
    },
  ];

  return (
    <div className="space-y-8">
      {/* 1. Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Good morning, Abrar
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Track your applications and find your next opportunity.
          </p>
        </div>
        <Link
          href="/internships"
          className="bg-slate-950 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl text-xs font-semibold transition-colors shadow-sm self-start sm:self-auto inline-flex items-center justify-center"
        >
          Browse internships
        </Link>
      </div>

      {/* 2. Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Applications */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between h-36">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              TOTAL APPLICATIONS
            </span>
            <FileText className="w-4 h-4 text-slate-400" />
          </div>
          <span className="text-4xl font-extrabold text-slate-900">12</span>
        </div>

        {/* Pending Reviews */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between h-36">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              PENDING REVIEWS
            </span>
            <Clock className="w-4 h-4 text-slate-400" />
          </div>
          <span className="text-4xl font-extrabold text-slate-900">4</span>
        </div>

        {/* Upcoming Interviews */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between h-36">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              UPCOMING INTERVIEWS
            </span>
            <Calendar className="w-4 h-4 text-slate-400" />
          </div>
          <span className="text-4xl font-extrabold text-slate-900">2</span>
        </div>

        {/* Accepted Application */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between h-36">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              ACCEPTED APPLICATION
            </span>
            <CheckCircle2 className="w-4 h-4 text-slate-400" />
          </div>
          <span className="text-4xl font-extrabold text-slate-900">1</span>
        </div>
      </div>

      {/* 3. Recent Applications Table Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Recent applications</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Your latest internship applications and their progress.
            </p>
          </div>
          <Link
            href="/applications"
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 transition-colors"
          >
            View all <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/40">
                  <th className="py-3.5 px-6">INTERNSHIP</th>
                  <th className="py-3.5 px-6">APPLIED</th>
                  <th className="py-3.5 px-6">STATUS</th>
                  <th className="py-3.5 px-6">INTERVIEW</th>
                  <th className="py-3.5 px-6 text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {recentApplications.map((app, index) => (
                  <tr key={index} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center justify-center font-bold text-slate-800 text-sm shrink-0">
                          {app.logo}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{app.title}</p>
                          <p className="text-[11px] text-slate-500">{app.company}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-slate-500 font-medium">{app.appliedDate}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-semibold ${app.statusBg}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-500 font-medium">{app.interview}</td>
                    <td className="py-4 px-6 text-right">
                      <button className="text-slate-700 hover:text-slate-950 font-semibold transition-colors">
                        View details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 4. Upcoming Interviews Section */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Upcoming interviews</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Prepare for your scheduled conversations.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            {/* Calendar Date Badge */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3 w-16 h-16 flex flex-col items-center justify-center shrink-0">
              <span className="text-xl font-extrabold text-slate-900 leading-none">22</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase mt-1">MAY</span>
            </div>

            {/* Interview Info */}
            <div className="space-y-1">
              <span className="inline-block px-2.5 py-0.5 bg-blue-50 text-blue-600 rounded-md text-[11px] font-semibold">
                Online interview
              </span>
              <h3 className="text-base font-bold text-slate-900">Product Design Intern</h3>
              <p className="text-xs text-slate-500">
                Pathao • Thursday, 10:30 AM – 11:15 AM
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 self-end sm:self-center">
            <button className="px-4 py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-slate-800 text-xs font-semibold rounded-xl transition-colors">
              View details
            </button>
            <button className="px-4 py-2.5 bg-slate-950 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-colors inline-flex items-center gap-2 shadow-sm">
              <Video className="w-3.5 h-3.5" />
              Join interview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
