'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { User, Mail, Phone, Building2, Save, Camera } from 'lucide-react';

export default function StudentProfilePage() {
  const [formData, setFormData] = useState({
    firstName: 'Alex',
    lastName: 'Johnson',
    email: 'alex.johnson@example.com',
    phone: '+1 234 567 8901',
    companyName: 'University Student',
    industry: 'Software Engineering',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Connect with NestJS backend API endpoint: PATCH /users/profile
    alert('Profile updated successfully!');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header userName={`${formData.firstName} ${formData.lastName}`} userRole="Student" />

      <div className="flex flex-1">
        <Sidebar role="STUDENT" />

        <main className="flex-1 p-5 md:p-8 space-y-6 max-w-4xl mx-auto w-full">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Profile Settings</h1>
            <p className="text-slate-500 text-sm mt-0.5">Manage your personal details and account preferences.</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-6">
            {/* Avatar Section */}
            <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
              <div className="relative">
                <div className="w-20 h-20 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-bold text-xl shadow-sm">
                  {formData.firstName[0]}{formData.lastName[0]}
                </div>
                <button type="button" className="absolute -bottom-1 -right-1 p-1.5 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-500 transition">
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">{formData.firstName} {formData.lastName}</h3>
                <p className="text-xs text-slate-500">Student Account</p>
              </div>
            </div>

            {/* Input Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">First Name</label>
                <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200/80 rounded-xl focus-within:border-slate-900 transition">
                  <User className="w-4 h-4 text-slate-400" />
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full text-xs bg-transparent focus:outline-none text-slate-900" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Last Name</label>
                <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200/80 rounded-xl focus-within:border-slate-900 transition">
                  <User className="w-4 h-4 text-slate-400" />
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full text-xs bg-transparent focus:outline-none text-slate-900" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Email Address</label>
                <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200/80 rounded-xl focus-within:border-slate-900 transition">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full text-xs bg-transparent focus:outline-none text-slate-900" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Phone Number</label>
                <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200/80 rounded-xl focus-within:border-slate-900 transition">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full text-xs bg-transparent focus:outline-none text-slate-900" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Institution / Organization</label>
                <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200/80 rounded-xl focus-within:border-slate-900 transition">
                  <Building2 className="w-4 h-4 text-slate-400" />
                  <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="w-full text-xs bg-transparent focus:outline-none text-slate-900" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Industry / Discipline</label>
                <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200/80 rounded-xl focus-within:border-slate-900 transition">
                  <Building2 className="w-4 h-4 text-slate-400" />
                  <input type="text" name="industry" value={formData.industry} onChange={handleChange} className="w-full text-xs bg-transparent focus:outline-none text-slate-900" />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button type="submit" className="px-5 py-2.5 bg-slate-900 hover:bg-blue-600 text-white rounded-xl text-xs font-semibold transition flex items-center gap-2 shadow-sm">
                <Save className="w-4 h-4" /> Save Changes
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}