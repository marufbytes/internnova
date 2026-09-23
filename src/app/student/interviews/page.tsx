'use client';

import React from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { Calendar, Video, Building2, Clock } from 'lucide-react';

const mockInterviews = [
  { id: 1, applicationId: 12, companyName: 'TechCorp Ltd.', title: 'Frontend Developer Intern', scheduledDate: '2026-09-25T14:00:00Z', meetingLink: 'https://meet.google.com/abc-defg-hij', status: 'SCHEDULED' },
  { id: 2, applicationId: 15, companyName: 'Analytics Flow', title: 'Data Analyst Trainee', scheduledDate: '2026-09-28T10:00:00Z', meetingLink: 'https://zoom.us/j/123456789', status: 'SCHEDULED' },
  { id: 3, applicationId: 8, companyName: 'Creative Studio', title: 'UI/UX Designer Apprentice', scheduledDate: '2026-09-15T11:00:00Z', meetingLink: null, status: 'COMPLETED' }
];

export default function StudentInterviewsPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header userName="Alex Johnson" userRole="Student" />
      <div className="flex flex-1">
        <Sidebar role="STUDENT" />
        <main className="flex-1 p-5 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Scheduled Interviews</h1>
            <p className="text-slate-500 text-sm mt-0.5">Manage your upcoming technical and HR interview meetings.</p>
          </div>

          <div className="space-y-3">
            {mockInterviews.map((interview) => {
              const dateObj = new Date(interview.scheduledDate);
              return (
                <div key={interview.id} className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-900 text-base">{interview.title}</h3>
                      <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full border ${
                        interview.status === 'SCHEDULED' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}>
                        {interview.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1 font-medium text-slate-700"><Building2 className="w-3.5 h-3.5 text-slate-400" />{interview.companyName}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-slate-400" />{dateObj.toLocaleDateString()}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-slate-400" />{dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>

                  {interview.meetingLink && interview.status === 'SCHEDULED' ? (
                    <a href={interview.meetingLink} target="_blank" rel="noreferrer" className="px-4 py-2 bg-slate-900 hover:bg-blue-600 text-white rounded-xl text-xs font-semibold transition flex items-center gap-2 shadow-sm self-start sm:self-center">
                      <Video className="w-4 h-4" /> Join Call
                    </a>
                  ) : (
                    <span className="text-xs text-slate-400 font-medium">No active link</span>
                  )}
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}