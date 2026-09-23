"use client";

import React, { useState } from "react";
import { User, Building2, Briefcase, Linkedin, Save, CheckCircle2 } from "lucide-react";

export default function AlumniProfilePage() {
  const [profile, setProfile] = useState({
    name: "Michael Chang",
    company: "Google",
    designation: "Senior Software Engineer",
    linkedin: "https://linkedin.com/in/example",
    gradYear: "2024",
    bio: "Passionate about backend distributed systems and helping junior engineers succeed.",
  });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto w-full space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Alumni Profile</h1>
        <p className="text-xs text-slate-500">Update your current role and company details for students seeking referrals</p>
      </div>

      {saved && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Profile saved successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Current Company</label>
            <input
              type="text"
              value={profile.company}
              onChange={(e) => setProfile({ ...profile, company: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Designation</label>
            <input
              type="text"
              value={profile.designation}
              onChange={(e) => setProfile({ ...profile, designation: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Graduation Year</label>
            <input
              type="text"
              value={profile.gradYear}
              onChange={(e) => setProfile({ ...profile, gradYear: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">LinkedIn URL</label>
            <input
              type="url"
              value={profile.linkedin}
              onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Short Bio / Mentorship Note</label>
          <textarea
            rows={3}
            value={profile.bio}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none"
          />
        </div>

        <div className="flex justify-end pt-2">
          <button type="submit" className="px-5 py-2.5 bg-slate-900 text-white text-xs font-semibold rounded-xl flex items-center gap-2 hover:bg-slate-800 transition">
            <Save className="w-3.5 h-3.5" /> Save Profile
          </button>
        </div>
      </form>
    </div>
  );
}