'use client';

import React from 'react';
import { Mail, Phone, MapPin, Calendar, Edit3, Briefcase, Clock, Laptop } from 'lucide-react';

export default function StudentProfilePage() {
  // ডামি প্রফাইল ডাটা (রিয়েল অ্যাপে API বা সেশন থেকে ফেচ করবেন)
  const profile = {
    name: 'Abrar Rahman',
    department: 'Computer Science & Engineering',
    university: 'BRAC University',
    profileCompletion: '85% complete',
    email: 'abrar.rahman@g.bracu.ac.bd',
    phone: '+880 17••••••',
    location: 'Dhaka, Bangladesh',
    graduation: 'December 2026',
    preferredRoles: 'Product Design, Frontend',
    workMode: 'Hybrid or Remote',
    availability: '20 hours / week',
    skills: ['UI/UX Design', 'React', 'Product Research'],
  };

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
          onClick={() => alert('Edit profile clicked!')}
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
            AR
          </div>

          {/* Info */}
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              {profile.name}
            </h2>
            <p className="text-xs font-semibold text-slate-500">
              {profile.department} · {profile.university}
            </p>

            {/* Skill Tags */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {profile.skills.map((skill, index) => (
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
          Profile {profile.profileCompletion}
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
              <span className="font-bold text-slate-900">{profile.phone}</span>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-slate-100">
              <span className="text-slate-500 font-medium flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400" /> Location
              </span>
              <span className="font-bold text-slate-900">{profile.location}</span>
            </div>

            <div className="flex items-center justify-between py-3">
              <span className="text-slate-500 font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400" /> Graduation
              </span>
              <span className="font-bold text-slate-900">{profile.graduation}</span>
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
              <p className="font-bold text-slate-900">{profile.preferredRoles}</p>
            </div>

            <div className="py-2.5 border-b border-slate-100 space-y-1">
              <span className="text-slate-500 font-medium flex items-center gap-1.5">
                <Laptop className="w-3.5 h-3.5 text-slate-400" /> Work mode
              </span>
              <p className="font-bold text-slate-900">{profile.workMode}</p>
            </div>

            <div className="py-2.5 space-y-1">
              <span className="text-slate-500 font-medium flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" /> Availability
              </span>
              <p className="font-bold text-slate-900">{profile.availability}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
