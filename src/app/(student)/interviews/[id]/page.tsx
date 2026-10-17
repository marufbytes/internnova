'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { 
  Video, 
  FileText, 
  ArrowLeft 
} from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function InterviewDetailsPage({ params }: PageProps) {
  // Safe unwrap using React.use()
  const resolvedParams = use(params);
  const interviewId = resolvedParams.id;

  // Mock Single Interview Data
  const interview = {
    id: interviewId,
    title: 'Product Design Intern',
    company: 'Pathao',
    appliedDate: '18 May 2025',
    dateTime: 'Thursday, 22 May · 10:30 AM',
    format: 'Online · Google Meet',
    duration: '45 minutes',
    status: 'Scheduled',
    meetLink: 'https://meet.google.com/abc-defg-hij',
    preparationNotes: 'Be ready to walk through one portfolio project, explaining your process, decisions, and outcomes. Join 5 minutes early.',
    recruiter: 'PATHAO TALENT TEAM',
    resumeUrl: '#',
  };

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
            {interview.title} at <span className="font-semibold text-slate-800">{interview.company}</span> (ID: {interview.id})
          </p>
        </div>

        {/* View Resume Button */}
        <a
          href={interview.resumeUrl}
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
                <span className="font-bold text-slate-900">{interview.dateTime}</span>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Format</span>
                <span className="font-bold text-slate-900">{interview.format}</span>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Duration</span>
                <span className="font-bold text-slate-900">{interview.duration}</span>
              </div>

              <div className="flex items-center justify-between py-3">
                <span className="text-slate-500 font-medium">Status</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-600 border border-blue-100 rounded-lg font-semibold text-[11px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                  {interview.status}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <a
              href={interview.meetLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-slate-950 hover:bg-slate-800 text-white px-5 py-3 rounded-2xl text-xs font-semibold transition-colors shadow-sm"
            >
              <Video className="w-4 h-4" />
              Join interview
            </a>
          </div>
        </div>

        {/* Right: How to prepare */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              How to prepare
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {interview.preparationNotes}
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <span className="text-[10px] font-extrabold text-slate-400 tracking-wider uppercase">
              {interview.recruiter}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
