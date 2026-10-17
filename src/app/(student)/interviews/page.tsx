'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Calendar, 
  Clock, 
  Video, 
  MapPin, 
  ChevronRight, 
  CheckCircle2, 
  XCircle, 
  AlertCircle 
} from 'lucide-react';

interface Interview {
  id: number;
  title: string;
  company: string;
  logo: string;
  date: string;
  time: string;
  mode: 'Online' | 'Physical';
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  meetLink?: string;
  location?: string;
}

export default function InterviewsPage() {
  const [activeTab, setActiveTab] = useState<'Upcoming' | 'Completed' | 'Cancelled' | 'All'>('Upcoming');

  // Sample data (To be fetched from GET /interview/student)
  const interviews: Interview[] = [
    {
      id: 1,
      title: 'Product Design Intern',
      company: 'Pathao',
      logo: 'P',
      date: 'Thu, 22 May 2025',
      time: '10:30 AM',
      mode: 'Online',
      status: 'Scheduled',
      meetLink: 'https://meet.google.com/abc-defg-hij',
    },
    {
      id: 2,
      title: 'Frontend Developer Intern',
      company: 'bKash',
      logo: 'b',
      date: 'Oct 22, 2025',
      time: '11:00 AM',
      mode: 'Online',
      status: 'Scheduled',
      meetLink: 'https://meet.google.com/xyz-uvwx-rst',
    },
    {
      id: 3,
      title: 'Software Engineer Intern',
      company: 'TechBD Limited',
      logo: 'T',
      date: 'Oct 25, 2025',
      time: '03:00 PM',
      mode: 'Online',
      status: 'Scheduled',
      meetLink: 'https://meet.google.com/mno-pqrs-tuv',
    },
    {
      id: 4,
      title: 'Web Development Intern',
      company: 'Example Company',
      logo: 'E',
      date: 'Oct 10, 2025',
      time: '02:00 PM',
      mode: 'Physical',
      status: 'Completed',
      location: 'Level 4, Plot 12, Gulshan 1, Dhaka',
    },
    {
      id: 5,
      title: 'UI/UX Intern',
      company: 'Chaldal',
      logo: 'C',
      date: 'Sep 15, 2025',
      time: '11:30 AM',
      mode: 'Online',
      status: 'Cancelled',
    },
  ];

  // Counters
  const upcomingCount = interviews.filter((i) => i.status === 'Scheduled').length;
  const completedCount = interviews.filter((i) => i.status === 'Completed').length;
  const cancelledCount = interviews.filter((i) => i.status === 'Cancelled').length;

  // Tab Filter Logic
  const filteredInterviews = interviews.filter((item) => {
    if (activeTab === 'Upcoming') return item.status === 'Scheduled';
    if (activeTab === 'Completed') return item.status === 'Completed';
    if (activeTab === 'Cancelled') return item.status === 'Cancelled';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* 1. Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">My Interviews</h1>
        <p className="text-sm text-slate-500 mt-1">Manage and track your internship interviews.</p>
      </div>

      {/* 2. Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Upcoming</p>
            <p className="text-2xl font-extrabold text-slate-900 mt-1">{upcomingCount}</p>
          </div>
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold">
            <Calendar className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Completed</p>
            <p className="text-2xl font-extrabold text-slate-900 mt-1">{completedCount}</p>
          </div>
          <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Cancelled</p>
            <p className="text-2xl font-extrabold text-slate-900 mt-1">{cancelledCount}</p>
          </div>
          <div className="w-10 h-10 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center font-bold">
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
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === tab
                ? 'bg-slate-950 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 4. Interview List */}
      <div className="space-y-4">
        {filteredInterviews.length > 0 ? (
          filteredInterviews.map((item) => (
            <div
              key={item.id}
              className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-300 transition-colors"
            >
              {/* Left Column: Logo & Details */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-slate-50 border border-slate-200/80 rounded-2xl flex items-center justify-center font-bold text-slate-800 text-base shrink-0">
                  {item.logo}
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                  <p className="text-xs font-semibold text-slate-500">{item.company}</p>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium pt-1">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {item.mode === 'Online' ? (
                        <Video className="w-3.5 h-3.5 text-slate-400" />
                      ) : (
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      )}
                      <span>{item.mode}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Status & Action Buttons */}
              <div className="flex flex-wrap sm:flex-col items-start sm:items-end justify-between gap-3 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                {/* Status Badge */}
                {item.status === 'Scheduled' && (
                  <span className="px-2.5 py-1 bg-blue-50 text-blue-600 border border-blue-100 rounded-lg text-[11px] font-semibold">
                    Scheduled
                  </span>
                )}
                {item.status === 'Completed' && (
                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-lg text-[11px] font-semibold">
                    Completed
                  </span>
                )}
                {item.status === 'Cancelled' && (
                  <span className="px-2.5 py-1 bg-rose-50 text-rose-600 border border-rose-100 rounded-lg text-[11px] font-semibold">
                    Cancelled
                  </span>
                )}

                {/* Actions */}
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  {item.status === 'Scheduled' && item.meetLink && (
                    <a
                      href={item.meetLink}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 sm:flex-none text-center bg-slate-950 hover:bg-slate-800 text-white px-4 py-2 rounded-xl text-xs font-semibold transition-colors"
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
          ))
        ) : (
          <div className="bg-white p-12 rounded-2xl border border-slate-200/80 text-center space-y-3">
            <AlertCircle className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-xs text-slate-500 font-medium">No interviews found in this section.</p>
          </div>
        )}
      </div>
    </div>
  );
}
