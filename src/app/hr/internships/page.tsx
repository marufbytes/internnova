'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Briefcase, MapPin, Users, Plus, Edit2, Trash2, Power } from 'lucide-react';

interface Internship {
  id: number;
  title: string;
  location: string;
  type: string;
  applicantCount: number;
  isActive: boolean;
  postedDate: string;
}

const mockInternships: Internship[] = [
  { id: 1, title: 'Frontend Developer Intern', location: 'Remote', type: 'Full-time Intern', applicantCount: 18, isActive: true, postedDate: '2026-09-10' },
  { id: 2, title: 'UI/UX Designer Apprentice', location: 'Dhaka, BD', type: 'Part-time Intern', applicantCount: 12, isActive: true, postedDate: '2026-09-14' },
  { id: 3, title: 'Backend Node.js Intern', location: 'Remote', type: 'Full-time Intern', applicantCount: 8, isActive: false, postedDate: '2026-08-28' },
];

export default function HRInternshipsPage() {
  const [internships, setInternships] = useState<Internship[]>(mockInternships);

  const toggleStatus = (id: number) => {
    // Connect with NestJS backend API: PATCH /internship/:id/toggle
    setInternships((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isActive: !item.isActive } : item))
    );
  };

  const handleDelete = (id: number) => {
    // Connect with NestJS backend API: DELETE /internship/:id
    setInternships((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Manage Internship Postings</h1>
          <p className="text-slate-500 text-sm mt-0.5">Toggle status or edit active internship opportunities.</p>
        </div>
        <Link
          href="/hr/post-job"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-blue-600 text-white rounded-xl text-xs font-semibold shadow-sm transition"
        >
          <Plus className="w-4 h-4" /> Post New Internship
        </Link>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
        <div className="divide-y divide-slate-100">
          {internships.length > 0 ? (
            internships.map((job) => (
              <div key={job.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-sm font-bold text-slate-900">{job.title}</h3>
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${job.isActive ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                      {job.isActive ? 'ACTIVE' : 'INACTIVE'}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {job.location}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5 text-slate-400" /> {job.type}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-slate-400" /> {job.applicantCount} Applicants</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <button
                    onClick={() => toggleStatus(job.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition flex items-center gap-1.5 ${
                      job.isActive ? 'border-amber-200 text-amber-700 bg-amber-50 hover:bg-amber-100' : 'border-emerald-200 text-emerald-700 bg-emerald-50 hover:bg-emerald-100'
                    }`}
                  >
                    <Power className="w-3.5 h-3.5" /> {job.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                  <button
                    onClick={() => handleDelete(job.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                    title="Delete Internship"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-xs text-slate-500">No internship postings found.</div>
          )}
        </div>
      </div>
    </div>
  );
}