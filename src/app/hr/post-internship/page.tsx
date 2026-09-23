'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Briefcase, MapPin, CheckCircle, Send, ArrowLeft } from 'lucide-react';

export default function HRPostInternshipPage() {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    type: 'Full-time Intern',
    description: '',
    requirements: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Connect with NestJS backend API: POST /internship
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto w-full">
      <Link href="/hr/dashboard" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-slate-900">Post New Internship</h1>
        <p className="text-slate-500 text-sm mt-0.5">Create a new internship opportunity for students and applicants.</p>
      </div>

      {submitted ? (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-8 shadow-sm text-center space-y-4">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900">Internship Posted Successfully!</h3>
            <p className="text-xs text-slate-500">Your internship position is now live and accepting student applications.</p>
          </div>
          <div className="pt-2 flex justify-center gap-3">
            <button 
              onClick={() => { setSubmitted(false); setFormData({ title: '', location: '', type: 'Full-time Intern', description: '', requirements: '' }); }}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition"
            >
              Post Another
            </button>
            <Link href="/hr/dashboard" className="px-4 py-2 bg-slate-900 hover:bg-blue-600 text-white rounded-xl text-xs font-semibold transition">
              Go to Dashboard
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-700">Internship Title</label>
              <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200/80 rounded-xl focus-within:border-slate-900 transition">
                <Briefcase className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Frontend Developer Intern"
                  className="w-full text-xs bg-transparent focus:outline-none text-slate-900"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Location</label>
              <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200/80 rounded-xl focus-within:border-slate-900 transition">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="text"
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Remote / Dhaka, BD"
                  className="w-full text-xs bg-transparent focus:outline-none text-slate-900"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Employment Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200/80 rounded-xl focus:outline-none focus:border-slate-900 text-slate-900"
              >
                <option value="Full-time Intern">Full-time Intern</option>
                <option value="Part-time Intern">Part-time Intern</option>
                <option value="Contract / Apprentice">Contract / Apprentice</option>
              </select>
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-700">Job Description</label>
              <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl focus-within:border-slate-900 transition">
                <textarea
                  name="description"
                  rows={4}
                  required
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Detailed overview of the role and responsibilities..."
                  className="w-full text-xs bg-transparent focus:outline-none text-slate-900 resize-none"
                />
              </div>
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-700">Requirements & Qualifications</label>
              <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl focus-within:border-slate-900 transition">
                <textarea
                  name="requirements"
                  rows={3}
                  required
                  value={formData.requirements}
                  onChange={handleChange}
                  placeholder="List key requirements (one per line)..."
                  className="w-full text-xs bg-transparent focus:outline-none text-slate-900 resize-none"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-slate-900 hover:bg-blue-600 text-white rounded-xl text-xs font-semibold transition flex items-center gap-2 shadow-sm disabled:opacity-50"
            >
              {isSubmitting ? 'Publishing...' : <><Send className="w-3.5 h-3.5" /> Publish Internship</>}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}