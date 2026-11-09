'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { 
  Briefcase, Clock, CheckCircle, ArrowUpRight, 
  Building2, Bookmark, Sparkles, Loader2, Check 
} from 'lucide-react';

export default function StudentDashboard() {
  const [user, setUser] = useState<any>(null);
  const [internships, setInternships] = useState<any[]>([]);
  const [myApplications, setMyApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [applyingId, setApplyingId] = useState<number | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      if (!storedUser) return;
      const parsedUser = JSON.parse(storedUser);

      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      // ১. নির্দিষ্ট ইউজারের ডাটা আনবে: http://localhost:3000/users/{id}
      const userRes = await fetch(`http://localhost:3000/users/${parsedUser.id}`, { headers });
      if (userRes.ok) {
        const userData = await userRes.json();
        setUser(userData);
      } else {
        setUser(parsedUser); // fallback
      }

      // ২. সব ইন্টার্নশিপ ফেচ করবে: http://localhost:3000/internship
      const internshipRes = await fetch('http://localhost:3000/internship', { headers });
      if (internshipRes.ok) {
        const internshipData = await internshipRes.json();
        setInternships(internshipData);
      }

      // ৩. এই নির্দিষ্ট স্টুডেন্টের অ্যাপ্লিকেশন ফেচ করবে
      const appRes = await fetch(`http://localhost:3000/application`, { headers });
      if (appRes.ok) {
        const appData = await appRes.json();
        // ফিল্টার করে শুধু এই স্টুডেন্টের অ্যাপ্লিকেশনগুলো রাখা
        const studentApps = Array.isArray(appData) 
          ? appData.filter((app: any) => app.studentId === parsedUser.id || app.student?.id === parsedUser.id)
          : [];
        setMyApplications(studentApps);
      }

    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  // ইন্টার্নশিপে অ্যাপ্লাই করার ফাংশন
  const handleApply = async (internshipId: number) => {
    setApplyingId(internshipId);
    try {
      const token = localStorage.getItem('token');
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');

      const res = await fetch('http://localhost:3000/application', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          internshipId: internshipId,
          studentId: storedUser.id,
          // প্রয়োজন হলে ডিফল্ট resumeId পাঠাতে পারেন
        })
      });

      if (res.ok) {
        alert('Application submitted successfully!');
        // ডাটা রিলোড দিয়ে নতুন করে অ্যাপ্লিকেশন লিস্ট আপডেট করা
        await fetchDashboardData();
      } else {
        const errData = await res.json().catch(() => ({}));
        alert(errData.message || 'Failed to apply. You might have already applied!');
      }
    } catch (err) {
      console.error('Apply error:', err);
      alert('Something went wrong while applying.');
    } finally {
      setApplyingId(null);
    }
  };

  // স্টুডেন্ট অলরেডি অ্যাপ্লাই করেছে কিনা চেক করার হেলপার ফাংশন
  const hasApplied = (internshipId: number) => {
    return myApplications.some((app: any) => app.internshipId === internshipId || app.internship?.id === internshipId);
  };

  // স্ট্যাটস কাউন্ট
  const stats = [
    { 
      label: 'Applied Jobs', 
      count: myApplications.length, 
      icon: Briefcase, 
      color: 'text-blue-600 bg-blue-50 border-blue-100' 
    },
    { 
      label: 'In Review', 
      count: myApplications.filter((a: any) => a.status === 'PENDING' || a.status === 'UNDER_REVIEW').length, 
      icon: Clock, 
      color: 'text-amber-600 bg-amber-50 border-amber-100' 
    },
    { 
      label: 'Shortlisted', 
      count: myApplications.filter((a: any) => a.status === 'SHORTLISTED' || a.status === 'ACCEPTED').length, 
      icon: CheckCircle, 
      color: 'text-emerald-600 bg-emerald-50 border-emerald-100' 
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header userName={user ? `${user.firstName} ${user.lastName}` : "Student"} userRole={user?.role || "STUDENT"} />

      <div className="flex flex-1">
        <Sidebar role="STUDENT" />

        <main className="flex-1 p-5 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
          
          {/* Welcome Banner */}
          <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-xl border border-slate-800">
            <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-2">
                  <Sparkles className="w-3.5 h-3.5" /> Student Overview
                </span>
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                  Welcome back, {user?.firstName || 'Student'} 👋
                </h1>
                <p className="text-slate-400 text-sm mt-1 max-w-md">
                  Track your applied internships and discover new career opportunities.
                </p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase text-slate-400 tracking-wider">{s.label}</p>
                    <p className="text-3xl font-black text-slate-900 mt-1">
                      {loading ? <Loader2 className="w-6 h-6 animate-spin text-slate-300" /> : s.count}
                    </p>
                  </div>
                  <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${s.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* All / Recommended Internships Section */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Available Internships</h2>
                  <p className="text-xs text-slate-500">Explore open roles and apply</p>
                </div>
              </div>

              <div className="space-y-3">
                {loading ? (
                  <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-400 text-sm">
                    Loading internships...
                  </div>
                ) : internships.length === 0 ? (
                  <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-400 text-sm">
                    No active internships found.
                  </div>
                ) : (
                  internships.map((job) => {
                    const isAlreadyApplied = hasApplied(job.id);
                    return (
                      <div 
                        key={job.id} 
                        className="bg-white border border-slate-200/80 hover:border-blue-300 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                      >
                        <div className="space-y-2 max-w-md">
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors">
                              {job.title}
                            </h3>
                            {job.isActive && (
                              <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
                                Active
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-600 line-clamp-2">{job.description}</p>
                          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-1">
                            <span className="flex items-center gap-1 font-medium text-slate-700">
                              <Building2 className="w-3.5 h-3.5 text-slate-400" />
                              {job.company?.name || 'Company Not Specified'}
                            </span>
                          </div>
                        </div>

                        <div className="flex sm:flex-col justify-between items-end gap-3 pt-2 sm:pt-0 border-t sm:border-0 border-slate-100">
                          {isAlreadyApplied ? (
                            <span className="px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-bold flex items-center gap-1">
                              <Check className="w-3.5 h-3.5" /> Applied
                            </span>
                          ) : (
                            <button 
                              onClick={() => handleApply(job.id)}
                              disabled={applyingId === job.id}
                              className="px-4 py-2 bg-slate-900 hover:bg-blue-600 text-white rounded-xl text-xs font-semibold transition flex items-center gap-1 shadow-sm disabled:opacity-50 cursor-pointer"
                            >
                              {applyingId === job.id ? 'Submitting...' : 'Apply Now'} <ArrowUpRight className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* My Applications Sidebar Section */}
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">My Applications</h2>
                <p className="text-xs text-slate-500">Where you have applied</p>
              </div>

              <div className="space-y-3">
                {myApplications.length === 0 ? (
                  <div className="p-6 text-center bg-white rounded-2xl border border-slate-200 text-slate-400 text-xs">
                    You haven't applied to any internships yet.
                  </div>
                ) : (
                  myApplications.map((app: any) => (
                    <div key={app.id} className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm space-y-2">
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-bold text-slate-900">
                          {app.internship?.title || `Internship #${app.internshipId}`}
                        </h4>
                        <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-50 text-blue-700 rounded-md uppercase">
                          {app.status || 'PENDING'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">
                        Applied on: {new Date(app.createdAt || Date.now()).toLocaleDateString()}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}