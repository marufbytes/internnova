'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Calendar, 
  Clock, 
  Video, 
  MapPin, 
  ChevronRight, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  Loader2,
  Building2 
} from 'lucide-react';

export default function InterviewsPage() {
  const [interviews, setInterviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'Upcoming' | 'Completed' | 'Cancelled' | 'All'>('Upcoming');

  // Fetch Real Student Interviews from Backend
  useEffect(() => {
    const token = document.cookie
      .split(';')
      .find((c) => c.trim().startsWith('access_token='))
      ?.split('=')[1];

    fetch('http://localhost:3000/interviews/student/my', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setInterviews(data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Counters (Mapping backend statuses: SCHEDULED, COMPLETED, CANCELLED)
  const upcomingCount = interviews.filter((i) => i.status === 'SCHEDULED' || i.status === 'Scheduled').length;
  const completedCount = interviews.filter((i) => i.status === 'COMPLETED' || i.status === 'Completed').length;
  const cancelledCount = interviews.filter((i) => i.status === 'CANCELLED' || i.status === 'Cancelled').length;

  // Tab Filter Logic
  const filteredInterviews = interviews.filter((item) => {
    const status = item.status?.toUpperCase();
    if (activeTab === 'Upcoming') return status === 'SCHEDULED';
    if (activeTab === 'Completed') return status === 'COMPLETED';
    if (activeTab === 'Cancelled') return status === 'CANCELLED';
    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-6 h-6 animate-spin text-slate-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 1. Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">My Interviews</h1>
        <p className="text-sm text-slate-500 mt-1">Manage and track your internship interviews.</p>
      </div>

      {/* 2. Summary Cards with Hover Effect */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex items-center justify-between group">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider group-hover:text-slate-700 transition-colors">Upcoming</p>
            <p className="text-2xl font-extrabold text-slate-900 mt-1">{upcomingCount}</p>
          </div>
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
            <Calendar className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex items-center justify-between group">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider group-hover:text-slate-700 transition-colors">Completed</p>
            <p className="text-2xl font-extrabold text-slate-900 mt-1">{completedCount}</p>
          </div>
          <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex items-center justify-between group">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider group-hover:text-slate-700 transition-colors">Cancelled</p>
            <p className="text-2xl font-extrabold text-slate-900 mt-1">{cancelledCount}</p>
          </div>
          <div className="w-10 h-10 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
            <XCircle className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 3. Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200/80 pb-3">
        {(['Upcoming', 'Completed', 'Cancelled', 'All'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === tab
                ? 'bg-slate-950 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 4. Interview List with Hover Effect */}
      <div className="space-y-4">
        {filteredInterviews.length > 0 ? (
          filteredInterviews.map((item) => {
            const internshipTitle = item.application?.internship?.title || 'Interview Session';
            const companyName = item.application?.internship?.company?.name || 'Company';
            const companyInitial = companyName.charAt(0);
            const formattedDate = item.scheduledDate ? new Date(item.scheduledDate).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }) : 'TBD';
            const formattedTime = item.scheduledDate ? new Date(item.scheduledDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'TBD';
            const status = item.status?.toUpperCase();

            return (
              <div
                key={item.id}
                className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                {/* Left Column: Logo & Details */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-slate-50 border border-slate-200/80 rounded-2xl flex items-center justify-center font-bold text-slate-800 text-base shrink-0 group-hover:bg-slate-950 group-hover:text-white group-hover:border-slate-950 transition-colors">
                    {companyInitial || <Building2 className="w-5 h-5" />}
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{internshipTitle}</h3>
                    <p className="text-xs font-semibold text-slate-500">{companyName}</p>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium pt-1">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{formattedDate}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{formattedTime}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Video className="w-3.5 h-3.5 text-slate-400" />
                        <span>Online Meeting</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Status & Action Buttons */}
                <div className="flex flex-wrap sm:flex-col items-start sm:items-end justify-between gap-3 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                  {/* Status Badge */}
                  {status === 'SCHEDULED' && (
                    <span className="px-2.5 py-1 bg-blue-50 text-blue-600 border border-blue-100 rounded-lg text-[11px] font-semibold">
                      Scheduled
                    </span>
                  )}
                  {status === 'COMPLETED' && (
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-lg text-[11px] font-semibold">
                      Completed
                    </span>
                  )}
                  {status === 'CANCELLED' && (
                    <span className="px-2.5 py-1 bg-rose-50 text-rose-600 border border-rose-100 rounded-lg text-[11px] font-semibold">
                      Cancelled
                    </span>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    {status === 'SCHEDULED' && item.meetingLink && (
                      <a
                        href={item.meetingLink}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 sm:flex-none text-center bg-slate-950 hover:bg-slate-800 text-white px-4 py-2 rounded-xl text-xs font-semibold transition-colors shadow-sm"
                      >
                        Join interview
                      </a>
                    )}
                    <Link
                      href={`/interviews/${item.id}`}
                      className="flex-1 sm:flex-none text-center bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-slate-700 px-4 py-2 rounded-xl text-xs font-semibold transition-colors inline-flex items-center justify-center gap-1"
                    >
                      View Details
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="bg-white p-12 rounded-2xl border border-slate-200/80 text-center space-y-3 shadow-sm">
            <AlertCircle className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-xs text-slate-500 font-medium">No interviews found in this section.</p>
          </div>
        )}
      </div>
    </div>
  );
}
