'use client';

import React, { useState } from 'react';
import { Calendar, Clock, Video, User, CheckCircle2, XCircle } from 'lucide-react';

interface Interview {
  id: number;
  candidateName: string;
  position: string;
  scheduledAt: string;
  meetingLink: string;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
}

const mockInterviews: Interview[] = [
  { id: 1, candidateName: 'Alex Johnson', position: 'Frontend Developer Intern', scheduledAt: '2026-09-24 10:00 AM', meetingLink: 'https://meet.google.com/abc-defg-hij', status: 'SCHEDULED' },
  { id: 2, candidateName: 'Sarah Smith', position: 'UI/UX Designer Apprentice', scheduledAt: '2026-09-25 02:30 PM', meetingLink: 'https://meet.google.com/xyz-uvwx-rst', status: 'SCHEDULED' },
];

export default function HRInterviewsPage() {
  const [interviews, setInterviews] = useState<Interview[]>(mockInterviews);

  const updateStatus = (id: number, status: Interview['status']) => {
    // Connect with NestJS backend API: PATCH /interviews/:id
    setInterviews((prev) => prev.map((item) => (item.id === id ? { ...item, status } : item)));
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto w-full">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Scheduled Interviews</h1>
        <p className="text-slate-500 text-sm mt-0.5">View and manage upcoming interview calls with applicants.</p>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
        <div className="divide-y divide-slate-100">
          {interviews.length > 0 ? (
            interviews.map((item) => (
              <div key={item.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center font-bold shrink-0">
                    <User className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-slate-900">{item.candidateName}</h3>
                    <p className="text-xs text-slate-500 font-medium">{item.position}</p>
                    <div className="flex items-center gap-3 text-xs text-slate-400 pt-1">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {item.scheduledAt}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <a
                    href={item.meetingLink}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-xs font-semibold transition flex items-center gap-1.5"
                  >
                    <Video className="w-3.5 h-3.5" /> Join Meeting
                  </a>

                  {item.status === 'SCHEDULED' && (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => updateStatus(item.id, 'COMPLETED')}
                        className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition"
                        title="Mark Completed"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => updateStatus(item.id, 'CANCELLED')}
                        className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition"
                        title="Cancel Interview"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-xs text-slate-500">No interviews scheduled yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}