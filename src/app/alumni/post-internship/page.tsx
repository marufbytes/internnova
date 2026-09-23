"use client";

import React, { useState } from "react";
import { Briefcase, Send, CheckCircle2, Building2 } from "lucide-react";

export default function AlumniPostInternshipPage() {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    type: "Full-time",
    location: "Remote",
    stipend: "",
    deadline: "",
    description: "",
    referralAvailable: true,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({
      title: "",
      company: "",
      type: "Full-time",
      location: "Remote",
      stipend: "",
      deadline: "",
      description: "",
      referralAvailable: true,
    });
  };

  return (
    <div className="max-w-3xl mx-auto w-full space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Post Opportunity for Juniors</h1>
        <p className="text-xs text-slate-500">Know about an opening at your company? Share it directly with students from your varsity.</p>
      </div>

      {submitted && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Opportunity posted successfully! Juniors can now view and apply.
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Position Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Software Engineer Intern"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Company Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Google, Datasoft, etc."
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none"
            >
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Contractual</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Location</label>
            <input
              type="text"
              required
              placeholder="e.g. Remote / Dhaka"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Application Deadline</label>
            <input
              type="date"
              required
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Role Details / How to Apply</label>
          <textarea
            rows={4}
            required
            placeholder="Share key requirements, tech stack, or application instructions for your juniors..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none"
          />
        </div>

        <div className="p-3 bg-emerald-50/60 border border-emerald-100 rounded-xl flex items-center justify-between">
          <div className="text-xs">
            <p className="font-bold text-emerald-900">Are you offering internal referral for this role?</p>
            <p className="text-emerald-700">Students will see a "Request Referral" badge on this posting.</p>
          </div>
          <input
            type="checkbox"
            checked={formData.referralAvailable}
            onChange={(e) => setFormData({ ...formData, referralAvailable: e.target.checked })}
            className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
          />
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl flex items-center gap-2 transition shadow-sm"
          >
            <Send className="w-3.5 h-3.5" /> Share Listing with Students
          </button>
        </div>
      </form>
    </div>
  );
}