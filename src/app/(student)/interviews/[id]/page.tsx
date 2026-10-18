'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { 
  Video, 
  FileText, 
  ArrowLeft,
  Loader2,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle
} from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function InterviewDetailsPage({ params }: PageProps) {
  // Safe unwrap using React.use()
  const resolvedParams = use(params);
  const interviewId = resolvedParams.id;

  const [interview, setInterview] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch Real Single Interview Details from Backend
  useEffect(() => {
    const token = document.cookie
      .split(';')
      .find((c) => c.trim().startsWith('access_token='))
      ?.split('=')[1];

    fetch(`http://localhost:3000/interviews/${interviewId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch interview details.');
        return res.json();
      })
      .then((data) => {
        setInterview(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Something went wrong.');
        setLoading(false);
      });
  }, [interviewId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-6 h-6 animate-spin text-slate-500" />
      </div>
    );
  }

  if (error || !interview) {
    return (
      <div className="space-y-6">
        <Link
          href="/interviews"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Interviews
        </Link>
        <div className="bg-white p-12 rounded-3xl border border-slate-200/80 text-center space-y-3 shadow-sm">
          <AlertCircle className="w-8 h-8 text-rose-400 mx-auto" />
          <p className="text-xs font-semibold text-slate-600">{error || 'Interview not found.'}</p>
        </div>
      </div>
    );
  }

  // Extract relational properties safely
  const internship = interview.application?.internship;
  const company = internship?.company;
  const formattedDate = interview.scheduledDate 
    ? new Date(interview.scheduledDate).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' }) 
    : 'TBD';
  const formattedTime = interview.scheduledDate 
    ? new Date(interview.scheduledDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    : 'TBD';
  const status = interview.status?.toUpperCase();

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        href="/interviews"
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Interviews
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Interview details
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {internship?.title || 'Position'} at <span className="font-semibold text-slate-800">{company?.name || 'Company'}</span> (ID: {interview.id})
          </p>
        </div>

        {/* View Resume Button (If applicant resume is linked) */}
        <a
          href={interview.application?.resumeUrl || '#'}
          target="_blank"
          rel="noreferrer"
          className="bg-white hover:bg-slate-50 border border-slate-200/80 text-slate-800 px-4 py-2.5 rounded-2xl text-xs font-semibold inline-flex items-center gap-2 shadow-sm transition-colors self-start sm:self-auto"
        >
          <FileText className="w-4 h-4 text-slate-500" />
          View resume
        </a>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Interview Information */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm lg:col-span-2 space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Interview information
            </h2>

            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between py-3 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Date & time</span>
                <span className="font-bold text-slate-900">{formattedDate} · {formattedTime}</span>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Format</span>
                <span className="font-bold text-slate-900">Online · Google Meet</span>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Duration</span>
                <span className="font-bold text-slate-900">45 minutes</span>
              </div>

              <div className="flex items-center justify-between py-3">
                <span className="text-slate-500 font-medium">Status</span>
                {status === 'SCHEDULED' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-600 border border-blue-100 rounded-lg font-semibold text-[11px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                    Scheduled
                  </span>
                )}
                {status === 'COMPLETED' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-lg font-semibold text-[11px]">
                    Completed
                  </span>
                )}
                {status === 'CANCELLED' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-50 text-rose-600 border border-rose-100 rounded-lg font-semibold text-[11px]">
                    Cancelled
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="pt-4">
            {status === 'SCHEDULED' && interview.meetingLink && (
              <a
                href={interview.meetingLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-slate-950 hover:bg-slate-800 text-white px-5 py-3 rounded-2xl text-xs font-semibold transition-colors shadow-sm"
              >
                <Video className="w-4 h-4" />
                Join interview
              </a>
            )}
          </div>
        </div>

        {/* Right: How to prepare */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              How to prepare
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {interview.notes || 'Be ready to discuss your previous projects, technical stack, and problem-solving approach. Join the meeting 5 minutes prior to the scheduled time.'}
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <span className="text-[10px] font-extrabold text-slate-400 tracking-wider uppercase">
              {company?.name ? `${company.name.toUpperCase()} TALENT TEAM` : 'HIRING TEAM'}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
