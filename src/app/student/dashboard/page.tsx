'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { Briefcase, Clock, CheckCircle, ArrowUpRight, Calendar, MapPin, Building2, Bookmark } from 'lucide-react';

const stats = [
  { label: 'Applied Jobs', count: 12, icon: Briefcase, color: 'text-blue-600 bg-blue-50' },
  { label: 'In Review', count: 4, icon: Clock, color: 'text-amber-600 bg-amber-50' },
  { label: 'Shortlisted', count: 2, icon: CheckCircle, color: 'text-emerald-600 bg-emerald-50' }
];

const jobs = [
  { id: '1', title: 'Frontend Developer Intern', company: 'TechCorp Ltd.', location: 'Remote', type: 'Full-time', match: '98%', salary: '$800 - $1,200/mo' },
  { id: '2', title: 'UI/UX Designer Apprentice', company: 'Creative Studio', location: 'Hybrid', type: 'Part-time', match: '92%', salary: '$500 - $800/mo' },
  { id: '3', title: 'Data Analyst Trainee', company: 'Analytics Flow', location: 'On-site', type: 'Full-time', match: '88%', salary: '$900 - $1,400/mo' }
];

const sessions = [
  { id: '1', title: 'Resume Review & Career Roadmap', mentor: 'Sarah Jenkins (Senior HR)', time: 'Tomorrow, 4:00 PM' },
  { id: '2', title: 'Mock Interview: Fullstack', mentor: 'Alex Rivera (Staff Engineer)', time: 'Friday, 11:00 AM' }
];

export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header userName="Alex Johnson" userRole="Student" />

      <div className="flex flex-1">
        <Sidebar role="STUDENT" />

        <main className="flex-1 p-5 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
          {/* Welcome Banner */}
          <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Student Overview</span>
              <h1 className="text-2xl font-bold mt-1">Welcome back, Alex</h1>
              <p className="text-slate-400 text-sm mt-0.5">Track your job applications and upcoming mentorship sessions.</p>
            </div>
            <Link href="/jobs" className="px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-500 transition shadow-sm">
              Browse Jobs
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase text-slate-500 tracking-wide">{s.label}</p>
                    <p className="text-2xl font-bold text-slate-900 mt-1">{s.count}</p>
                  </div>
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${s.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Main Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recommended Jobs */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-base font-bold text-slate-900">Recommended Opportunities</h2>
                <Link href="/jobs" className="text-xs font-semibold text-blue-600 hover:underline">View All</Link>
              </div>

              <div className="space-y-3">
                {jobs.map((job) => (
                  <div key={job.id} className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm hover:border-slate-300 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-slate-900 text-sm hover:text-blue-600 cursor-pointer">{job.title}</h3>
                        <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">{job.match} Match</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1"><Building2 className="w-3.5 h-3.5" />{job.company}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{job.location}</span>
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded font-medium text-[11px]">{job.type}</span>
                      </div>
                    </div>

                    <div className="flex sm:flex-col justify-between items-end gap-2">
                      <span className="text-xs font-bold text-slate-900">{job.salary}</span>
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"><Bookmark className="w-4 h-4" /></button>
                        <button className="px-3 py-1.5 bg-slate-900 hover:bg-blue-600 text-white rounded-lg text-xs font-medium transition flex items-center gap-1">
                          Apply <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Mentorship */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-base font-bold text-slate-900">Upcoming Mentorship</h2>
                <Link href="/student/mentorship" className="text-xs font-semibold text-blue-600 hover:underline">Schedule</Link>
              </div>

              <div className="space-y-3">
                {sessions.map((s) => (
                  <div key={s.id} className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm space-y-2">
                    <h4 className="text-sm font-semibold text-slate-900">{s.title}</h4>
                    <p className="text-xs text-slate-500">{s.mentor}</p>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-blue-600 bg-blue-50/80 px-2.5 py-1 rounded-lg w-fit border border-blue-100">
                      <Calendar className="w-3.5 h-3.5" />
                      {s.time}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}