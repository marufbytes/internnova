"use client";

import React from "react";
import Link from "next/link";
import { UserCheck, Clock, CheckCircle2, ArrowRight, Building2, User } from "lucide-react";

const ALUMNI_STATS = [
  { label: "Pending Requests", value: "3", icon: Clock, color: "text-amber-600 bg-amber-50" },
  { label: "Referrals Granted", value: "12", icon: CheckCircle2, color: "text-emerald-600 bg-emerald-50" },
  { label: "Total Requests Received", value: "15", icon: UserCheck, color: "text-sky-600 bg-sky-50" },
];

const RECENT_REQUESTS = [
  { id: "REF-101", studentName: "Sabbir Hossain", targetRole: "Software Engineer Intern", company: "Google", date: "2026-09-21", status: "PENDING" },
  { id: "REF-102", studentName: "Anika Rahman", targetRole: "UI/UX Designer", company: "Meta", date: "2026-09-18", status: "ACCEPTED" },
  { id: "REF-103", studentName: "Tanvir Hasan", targetRole: "Backend Developer", company: "Amazon", date: "2026-09-15", status: "REJECTED" },
];

export default function AlumniDashboardPage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto w-full">
      {/* Top Banner */}
      <div className="bg-slate-900 text-white p-6 rounded-3xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-bold rounded-lg border border-emerald-500/30">
            ALUMNI NETWORK
          </span>
          <h1 className="text-2xl font-black tracking-tight mt-2">Welcome Back, Alumni Mentor</h1>
          <p className="text-xs text-slate-300">Help students from your alma mater get referred to top companies.</p>
        </div>
        <Link
          href="/alumni/referrals"
          className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold rounded-xl transition flex items-center gap-2 shrink-0"
        >
          View Referral Requests <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {ALUMNI_STATS.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm flex items-center gap-4">
              <div className={`p-3 rounded-xl ${stat.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">{stat.label}</p>
                <h3 className="text-2xl font-black text-slate-900">{stat.value}</h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Referral Requests */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-base font-bold text-slate-900">Recent Referral Requests</h2>
          <Link href="/alumni/referrals" className="text-xs text-emerald-600 hover:underline flex items-center gap-1 font-semibold">
            View All <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="divide-y divide-slate-100">
          {RECENT_REQUESTS.map((req) => (
            <div key={req.id} className="py-3 flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <p className="font-bold text-slate-900 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-400" /> {req.studentName}
                </p>
                <p className="text-slate-500">{req.targetRole} @ <span className="font-semibold text-slate-700">{req.company}</span></p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-slate-400">{req.date}</span>
                <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${
                  req.status === "ACCEPTED" ? "bg-emerald-50 text-emerald-700" : req.status === "REJECTED" ? "bg-rose-50 text-rose-700" : "bg-amber-50 text-amber-700"
                }`}>
                  {req.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}