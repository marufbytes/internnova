'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { FileText, Upload, Trash2, Download, Plus } from 'lucide-react';

const mockResumes = [
  { id: 1, title: 'Fullstack_Developer_2026.pdf', fileUrl: '/uploads/resumes/1.pdf', skills: ['React', 'NestJS', 'PostgreSQL', 'TypeScript'], createDate: '2026-09-01' },
  { id: 2, title: 'Frontend_React_Focus.pdf', fileUrl: '/uploads/resumes/2.pdf', skills: ['Next.js', 'Tailwind CSS', 'Redux'], createDate: '2026-08-15' }
];

export default function StudentResumesPage() {
  const [resumes] = useState(mockResumes);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header userName="Alex Johnson" userRole="Student" />
      <div className="flex flex-1">
        <Sidebar role="STUDENT" />
        <main className="flex-1 p-5 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">My Resumes</h1>
              <p className="text-slate-500 text-sm mt-0.5">Upload and manage your CVs for internship applications.</p>
            </div>
            <button className="px-4 py-2.5 bg-slate-900 hover:bg-blue-600 text-white rounded-xl text-xs font-semibold transition flex items-center gap-2 shadow-sm">
              <Plus className="w-4 h-4" /> Upload Resume
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resumes.map((res) => (
              <div key={res.id} className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">{res.title}</h3>
                      <p className="text-[11px] text-slate-400">Uploaded {res.createDate}</p>
                    </div>
                  </div>
                  <button className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition"><Trash2 className="w-4 h-4" /></button>
                </div>

                <div className="flex flex-wrap gap-1">
                  {res.skills?.map((s) => (
                    <span key={s} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[11px] font-medium rounded-md">{s}</span>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-100 flex justify-end">
                  <a href={res.fileUrl} download className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1">
                    <Download className="w-3.5 h-3.5" /> Download PDF
                  </a>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}