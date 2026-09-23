'use client';

import React, { useState } from 'react';
import { Building2, Globe, MapPin, CheckCircle, Save } from 'lucide-react';

export default function HRCompanyProfilePage() {
  const [formData, setFormData] = useState({
    companyName: 'TechNova Solutions',
    industry: 'Software & Information Technology',
    website: 'https://technova.example.com',
    location: 'Dhaka, Bangladesh',
    description: 'TechNova Solutions is a leading software development agency building innovative web and mobile solutions for global clients.',
  });

  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Connect with NestJS backend API: PATCH /company/:id
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto w-full">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Company Profile</h1>
        <p className="text-slate-500 text-sm mt-0.5">Manage your organization's public information for applicants.</p>
      </div>

      {isSaved && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600" /> Company profile updated successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-xs font-semibold text-slate-700">Company Name</label>
            <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200/80 rounded-xl focus-within:border-slate-900 transition">
              <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full text-xs bg-transparent focus:outline-none text-slate-900"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Industry</label>
            <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200/80 rounded-xl focus-within:border-slate-900 transition">
              <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                className="w-full text-xs bg-transparent focus:outline-none text-slate-900"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Website URL</label>
            <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200/80 rounded-xl focus-within:border-slate-900 transition">
              <Globe className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="w-full text-xs bg-transparent focus:outline-none text-slate-900"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-xs font-semibold text-slate-700">Location</label>
            <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200/80 rounded-xl focus-within:border-slate-900 transition">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full text-xs bg-transparent focus:outline-none text-slate-900"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-xs font-semibold text-slate-700">Company Overview</label>
            <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl focus-within:border-slate-900 transition">
              <textarea
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="w-full text-xs bg-transparent focus:outline-none text-slate-900 resize-none"
                required
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-slate-900 hover:bg-blue-600 text-white rounded-xl text-xs font-semibold transition flex items-center gap-2 shadow-sm"
          >
            <Save className="w-3.5 h-3.5" /> Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}