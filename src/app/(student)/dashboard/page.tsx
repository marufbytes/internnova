'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FileText, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  ChevronRight, 
  Video,
  Loader2
} from 'lucide-react';

export default function DashboardPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch Real Student Applications from Backend
  useEffect(() => {
    const token = document.cookie
      .split(';')
      .find((c) => c.trim().startsWith('access_token='))
      ?.split('=')[1];

    fetch('http://localhost:3000/application/my', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setApplications(data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Summary Card Calculation Logic
  const totalApps = applications.length;
  const pendingCount = applications.filter((a) => a.status === 'PENDING').length;
  const interviewApps = applications.filter((a) => a.status === 'INTERVIEW');
  const upcomingInterviewsCount = interviewApps.length;
  const acceptedCount = applications.filter((a) => a.status === 'ACCEPTED').length;

  // Latest 4 Applications for Table
  const recentApplications = applications.slice(0, 4);

  // Pick First Upcoming Interview Detail if exists
  const upcomingInterviewApp = interviewApps[0];
  const interviewDetails = upcomingInterviewApp?.interviews?.[0];

  // Status Styling Helper
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-amber-50 text-amber-700 border border-amber-100';
      case 'REVIEWED':
        return 'bg-blue-50 text-blue-600 border border-blue-100';
      case 'INTERVIEW':
        return 'bg-indigo-50 text-indigo-600 border border-indigo-100';
      case 'ACCEPTED':
        return 'bg-emerald-50 text-emerald-600 border border-emerald-100';
      case 'REJECTED':
        return 'bg-rose-50 text-rose-600 border border-rose-100';
      default:
        return 'bg-slate-50 text-slate-600 border border-slate-100';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-6 h-6 animate-spin text-slate-500" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* 1. Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Good morning, Student
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Track your applications and find your next opportunity.
          </p>
        </div>
        <Link
          href="/internships"
          className="bg-slate-950 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl text-xs font-semibold transition-all shadow-sm hover:shadow-md self-start sm:self-auto inline-flex items-center justify-center"
        >
          Browse internships
        </Link>
      </div>

      {/* 2. Stat Cards Grid with Hover Effect */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Applications */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col justify-between h-36 group">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 group-hover:text-slate-700 transition-colors">
              TOTAL APPLICATIONS
            </span>
            <FileText className="w-4 h-4 text-slate-400 group-hover:scale-110 transition-transform" />
          </div>
          <span className="text-4xl font-extrabold text-slate-900">{totalApps}</span>
        </div>

        {/* Pending Reviews */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col justify-between h-36 group">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 group-hover:text-slate-700 transition-colors">
              PENDING REVIEWS
            </span>
            <Clock className="w-4 h-4 text-slate-400 group-hover:scale-110 transition-transform" />
          </div>
          <span className="text-4xl font-extrabold text-slate-900">{pendingCount}</span>
        </div>

        {/* Upcoming Interviews */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col justify-between h-36 group">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 group-hover:text-slate-700 transition-colors">
              UPCOMING INTERVIEWS
            </span>
            <Calendar className="w-4 h-4 text-slate-400 group-hover:scale-110 transition-transform" />
          </div>
          <span className="text-4xl font-extrabold text-slate-900">{upcomingInterviewsCount}</span>
        </div>

        {/* Accepted Application */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col justify-between h-36 group">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 group-hover:text-slate-700 transition-colors">
              ACCEPTED APPLICATION
            </span>
            <CheckCircle2 className="w-4 h-4 text-slate-400 group-hover:scale-110 transition-transform" />
          </div>
          <span className="text-4xl font-extrabold text-slate-900">{acceptedCount}</span>
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
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 transition-colors group"
          >
            View all <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
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
                  <th className="py-3.5 px-6">TYPE</th>
                  <th className="py-3.5 px-6 text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {recentApplications.length > 0 ? (
                  recentApplications.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center justify-center font-bold text-slate-800 text-sm shrink-0 group-hover:bg-slate-950 group-hover:text-white transition-colors">
                            {app.internship?.company?.name?.charAt(0) || 'I'}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                              {app.internship?.title}
                            </p>
                            <p className="text-[11px] text-slate-500">{app.internship?.company?.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-slate-500 font-medium">
                        {new Date(app.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-semibold ${getStatusBadge(app.status)}`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-slate-500 font-medium uppercase text-[10px]">
                        {app.type}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <Link
                          href={`/applications`}
                          className="text-slate-600 hover:text-slate-950 font-semibold transition-colors inline-flex items-center gap-1"
                        >
                          View details
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-400 text-xs">
                      No applications found. Start applying today!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 4. Upcoming Interviews Section with Hover Effect */}
      {upcomingInterviewApp && (
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Upcoming interviews</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Prepare for your scheduled conversations.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-6 group">
            <div className="flex items-center gap-5">
              {/* Calendar Date Badge */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3 w-16 h-16 flex flex-col items-center justify-center shrink-0 group-hover:bg-slate-950 group-hover:text-white group-hover:border-slate-950 transition-colors">
                <span className="text-xl font-extrabold text-slate-900 group-hover:text-white leading-none transition-colors">
                  {interviewDetails?.date ? new Date(interviewDetails.date).getDate() : '22'}
                </span>
                <span className="text-[10px] font-bold text-slate-400 group-hover:text-slate-300 uppercase mt-1 transition-colors">
                  {interviewDetails?.date ? new Date(interviewDetails.date).toLocaleString('default', { month: 'short' }) : 'MAY'}
                </span>
              </div>

              {/* Interview Info */}
              <div className="space-y-1">
                <span className="inline-block px-2.5 py-0.5 bg-blue-50 text-blue-600 rounded-md text-[11px] font-semibold">
                  Online interview
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  {upcomingInterviewApp.internship?.title}
                </h3>
                <p className="text-xs text-slate-500">
                  {upcomingInterviewApp.internship?.company?.name} • Scheduled
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 self-end sm:self-center">
              <Link
                href={`/interviews/${interviewDetails?.id || 1}`}
                className="px-4 py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-slate-800 text-xs font-semibold rounded-xl transition-colors"
              >
                View details
              </Link>
              {interviewDetails?.meetingLink && (
                <a
                  href={interviewDetails.meetingLink}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 bg-slate-950 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-all shadow-sm hover:shadow inline-flex items-center gap-2"
                >
                  <Video className="w-3.5 h-3.5" />
                  Join interview
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
