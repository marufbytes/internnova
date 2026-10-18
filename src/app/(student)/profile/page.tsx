'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Calendar, Edit3, Briefcase, Clock, Laptop, Loader2, AlertCircle } from 'lucide-react';

export default function StudentProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch Logged-in Student Profile from Backend API
  useEffect(() => {
    const token = document.cookie
      .split(';')
      .find((c) => c.trim().startsWith('access_token='))
      ?.split('=')[1];

    fetch('http://localhost:3000/auth/profile', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch profile information.');
        return res.json();
      })
      .then((data) => {
        setProfile(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Something went wrong.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-6 h-6 animate-spin text-slate-500" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="bg-white p-12 rounded-3xl border border-slate-200/80 text-center space-y-3 shadow-sm">
        <AlertCircle className="w-8 h-8 text-rose-400 mx-auto" />
        <p className="text-xs font-semibold text-slate-600">{error || 'Profile not found.'}</p>
      </div>
    );
  }

  // Generate Initials for Avatar (e.g., Abrar Shahriar -> AS)
  const nameInitials = profile.name
    ? profile.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()
    : 'U';

  const skills = profile.skills || ['Full-stack Development', 'React', 'TypeScript'];

  return (
    <div className="space-y-6">
      {/* 1. Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Student profile
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Keep your academic and professional information up to date.
          </p>
        </div>

        {/* Edit Profile Button */}
        <button
          onClick={() => alert('Edit profile functionality coming soon!')}
          className="bg-slate-950 hover:bg-slate-800 text-white px-5 py-2.5 rounded-2xl text-xs font-semibold inline-flex items-center gap-2 shadow-sm transition-colors self-start sm:self-auto"
        >
          <Edit3 className="w-4 h-4" />
          Edit profile
        </button>
      </div>

      {/* 2. Top Profile Hero Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          {/* Avatar */}
          <div className="w-20 h-20 bg-slate-950 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shrink-0 shadow-md">
            {nameInitials}
          </div>

          {/* Info */}
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              {profile.name}
            </h2>
            <p className="text-xs font-semibold text-slate-500">
              {profile.department || 'Computer Science & Engineering'} · {profile.university || 'American International University-Bangladesh'}
            </p>

            {/* Skill Tags */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {skills.map((skill: string, index: number) => (
                <span
                  key={index}
                  className="bg-slate-50 text-slate-600 border border-slate-200/80 px-2.5 py-1 rounded-lg text-[11px] font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Profile Completion Badge */}
        <div className="self-start md:self-center bg-emerald-50 text-emerald-700 border border-emerald-200/80 px-3.5 py-1.5 rounded-full text-xs font-semibold">
          Profile 100% Active
        </div>
      </div>

      {/* 3. Bottom Two Columns Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Personal Information (Spans 2 columns) */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm lg:col-span-2 space-y-6">
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            Personal information
          </h3>

          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between py-3 border-b border-slate-100">
              <span className="text-slate-500 font-medium flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-400" /> Email
              </span>
              <span className="font-bold text-slate-900">{profile.email}</span>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-slate-100">
              <span className="text-slate-500 font-medium flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-400" /> Phone
              </span>
              <span className="font-bold text-slate-900">{profile.phone || '+880 1XXXXXXXXX'}</span>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-slate-100">
              <span className="text-slate-500 font-medium flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400" /> Location
              </span>
              <span className="font-bold text-slate-900">{profile.location || 'Dhaka, Bangladesh'}</span>
            </div>

            <div className="flex items-center justify-between py-3">
              <span className="text-slate-500 font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400" /> Role / Account Type
              </span>
              <span className="font-bold text-slate-900 uppercase">{profile.role}</span>
            </div>
          </div>
        </div>

        {/* Career Preferences (1 column) */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            Career preferences
          </h3>

          <div className="space-y-4 text-xs">
            <div className="py-2.5 border-b border-slate-100 space-y-1">
              <span className="text-slate-500 font-medium flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-slate-400" /> Preferred roles
              </span>
              <p className="font-bold text-slate-900">{profile.preferredRoles || 'Full-stack Developer, Software Engineer'}</p>
            </div>

            <div className="py-2.5 border-b border-slate-100 space-y-1">
              <span className="text-slate-500 font-medium flex items-center gap-1.5">
                <Laptop className="w-3.5 h-3.5 text-slate-400" /> Work mode
              </span>
              <p className="font-bold text-slate-900">{profile.workMode || 'Remote / Hybrid'}</p>
            </div>

            <div className="py-2.5 space-y-1">
              <span className="text-slate-500 font-medium flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" /> Availability
              </span>
              <p className="font-bold text-slate-900">{profile.availability || 'Full-time / Part-time'}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
