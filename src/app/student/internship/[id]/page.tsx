'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { Building2, MapPin, ArrowLeft, CheckCircle, FileText, Send, Clock, Sparkles } from 'lucide-react';

const mockInternship = {
  id: 1,
  title: 'Frontend Developer Intern',
  companyName: 'TechCorp Ltd.',
  industry: 'Software & Cloud Solutions',
  location: 'Remote',
  stipend: '$800 - $1,200/mo',
  type: 'Full-time Intern',
  isActive: true,
  createdAt: '2026-09-15',
  description: 'We are looking for a passionate Frontend Developer Intern to join our core engineering team. You will work directly with senior software engineers to build responsive, accessible web applications using Next.js, React, and Tailwind CSS.',
  requirements: [
    'Strong knowledge of HTML, CSS, JavaScript (ES6+), and TypeScript.',
    'Hands-on experience with React and Next.js App Router.',
    'Familiarity with REST APIs and state management.',
    'Good communication skills and eagerness to learn software architecture.'
  ]
};

const userResumes = [
  { id: 1, title: 'Fullstack_Developer_2026.pdf' },
  { id: 2, title: 'Frontend_React_Focus.pdf' }
];

export default function InternshipDetailsPage() {
  const [selectedResume, setSelectedResume] = useState<number>(userResumes[0].id);
  const [isApplying, setIsApplying] = useState(false);
  const [applied, setApplied] = useState(false);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setIsApplying(true);
    // Connect with NestJS backend API: POST /applications
    setTimeout(() => {
      setIsApplying(false);
      setApplied(true);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header userName="Alex Johnson" userRole="Student" />

      <div className="flex flex-1">
        <Sidebar role="STUDENT" />

        <main className="flex-1 p-5 md:p-8 space-y-6 max-w-5xl mx-auto w-full">
          {/* Back Navigation */}
          <Link href="/student/internship" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition">
            <ArrowLeft className="w-4 h-4" /> Back to Internships
          </Link>

          {/* Header Card */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-900">{mockInternship.title}</h1>
                  <span className="px-2.5 py-0.5 text-[11px] font-semibold bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">Active</span>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-2">
                  <span className="flex items-center gap-1 font-medium text-slate-700"><Building2 className="w-3.5 h-3.5 text-slate-400" />{mockInternship.companyName}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" />{mockInternship.location}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-slate-400" />Posted {mockInternship.createdAt}</span>
                </div>
              </div>

              <div className="text-right sm:text-right">
                <span className="text-xs text-slate-400 font-medium block">Stipend / Allowance</span>
                <span className="text-lg font-bold text-slate-900">{mockInternship.stipend}</span>
              </div>
            </div>

            {/* Description & Requirements */}
            <div className="space-y-4 pt-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">About the Role</h3>
                <p className="text-xs leading-relaxed text-slate-600">{mockInternship.description}</p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-2">Key Requirements</h3>
                <ul className="space-y-1.5">
                  {mockInternship.requirements.map((req, i) => (
                    <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Application Action Section */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" /> Submit Application
            </h3>

            {applied ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-1">
                <p className="text-sm font-bold text-emerald-800">Application Submitted!</p>
                <p className="text-xs text-emerald-600">You can track your status in the <Link href="/student/applications" className="underline font-semibold">My Applications</Link> page.</p>
              </div>
            ) : (
              <form onSubmit={handleApply} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Select Resume</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {userResumes.map((res) => (
                      <label key={res.id} onClick={() => setSelectedResume(res.id)} className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition ${selectedResume === res.id ? 'border-slate-900 bg-slate-50 shadow-sm' : 'border-slate-200/80 hover:bg-slate-50'}`}>
                        <div className="flex items-center gap-2.5">
                          <FileText className="w-4 h-4 text-slate-500" />
                          <span className="text-xs font-medium text-slate-800">{res.title}</span>
                        </div>
                        <input type="radio" name="resume" checked={selectedResume === res.id} onChange={() => {}} className="accent-slate-900" />
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button type="submit" disabled={isApplying} className="px-6 py-2.5 bg-slate-900 hover:bg-blue-600 text-white rounded-xl text-xs font-semibold transition flex items-center gap-2 shadow-sm disabled:opacity-50">
                    {isApplying ? 'Submitting...' : <><Send className="w-3.5 h-3.5" /> Apply Now</>}
                  </button>
                </div>
              </form>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}