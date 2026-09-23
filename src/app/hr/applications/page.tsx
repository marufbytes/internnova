'use client';

import React, { useState } from 'react';
import { Search, Filter, FileText, Clock, User, Download } from 'lucide-react';

interface Applicant {
  id: number;
  candidateName: string;
  email: string;
  position: string;
  appliedDate: string;
  resumeUrl: string;
  status: 'APPLIED' | 'SHORTLISTED' | 'INTERVIEW_SCHEDULED' | 'REJECTED' | 'ACCEPTED';
}

const initialApplicants: Applicant[] = [
  {
    id: 1,
    candidateName: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    position: 'Frontend Developer Intern',
    appliedDate: '2026-09-21',
    resumeUrl: '#',
    status: 'APPLIED',
  },
  {
    id: 2,
    candidateName: 'Sarah Smith',
    email: 'sarah.smith@example.com',
    position: 'UI/UX Designer Apprentice',
    appliedDate: '2026-09-20',
    resumeUrl: '#',
    status: 'SHORTLISTED',
  },
  {
    id: 3,
    candidateName: 'Michael Brown',
    email: 'michael.b@example.com',
    position: 'Frontend Developer Intern',
    appliedDate: '2026-09-18',
    resumeUrl: '#',
    status: 'REJECTED',
  },
];

export default function HRApplicationsPage() {
  const [applicants, setApplicants] = useState<Applicant[]>(initialApplicants);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const handleStatusChange = (id: number, newStatus: Applicant['status']) => {
    setApplicants((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
    );
  };

  const filteredApplicants = applicants.filter((app) => {
    const matchesSearch =
      app.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto w-full">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Manage Applicants</h1>
        <p className="text-slate-500 text-sm mt-0.5">
          Review candidates, download resumes, and update application statuses.
        </p>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 border border-slate-200/80 rounded-2xl shadow-sm">
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200/80 rounded-xl w-full sm:w-80 focus-within:border-slate-900 transition">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search candidates or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs bg-transparent focus:outline-none text-slate-900"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 text-xs bg-slate-50 border border-slate-200/80 rounded-xl focus:outline-none focus:border-slate-900 text-slate-900"
          >
            <option value="ALL">All Statuses</option>
            <option value="APPLIED">Applied</option>
            <option value="SHORTLISTED">Shortlisted</option>
            <option value="INTERVIEW_SCHEDULED">Interview Scheduled</option>
            <option value="REJECTED">Rejected</option>
            <option value="ACCEPTED">Accepted</option>
          </select>
        </div>
      </div>

      {/* Applicants List */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
        <div className="divide-y divide-slate-100">
          {filteredApplicants.length > 0 ? (
            filteredApplicants.map((app) => (
              <div key={app.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/50 transition">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 bg-slate-100 text-slate-700 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                    <User className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-slate-900">{app.candidateName}</h3>
                    <p className="text-xs text-slate-500 font-medium">{app.position}</p>
                    <div className="flex items-center gap-3 text-xs text-slate-400 pt-1">
                      <span>{app.email}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {app.appliedDate}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                  <a
                    href={app.resumeUrl}
                    download
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition flex items-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5" /> Resume <Download className="w-3 h-3" />
                  </a>

                  <select
                    value={app.status}
                    onChange={(e) => handleStatusChange(app.id, e.target.value as Applicant['status'])}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg border focus:outline-none transition ${
                      app.status === 'SHORTLISTED' || app.status === 'ACCEPTED'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : app.status === 'REJECTED'
                        ? 'bg-rose-50 text-rose-700 border-rose-200'
                        : 'bg-blue-50 text-blue-700 border-blue-200'
                    }`}
                  >
                    <option value="APPLIED">APPLIED</option>
                    <option value="SHORTLISTED">SHORTLISTED</option>
                    <option value="INTERVIEW_SCHEDULED">INTERVIEW SCHEDULED</option>
                    <option value="ACCEPTED">ACCEPTED</option>
                    <option value="REJECTED">REJECTED</option>
                  </select>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-xs text-slate-500">
              No applicants match your current search criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}