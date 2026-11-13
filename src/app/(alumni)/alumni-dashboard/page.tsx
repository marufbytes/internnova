"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { UserCheck, Clock, CheckCircle2, ArrowRight, User } from "lucide-react";
import api from "@/lib/api";
import { apiErrorMessage, extractList, fullName } from "@/lib/adminData";

interface Referral {
  id: string;
  studentName: string;
  targetRole: string;
  company: string;
  createdAt: string;
  status: string;
}

export default function AlumniDashboardPage() {
  const [name, setName] = useState("Alumni");
  const [requests, setRequests] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    api.get("/users/me")
      .then(({ data }) => { if (active) setName(fullName(data, "Alumni")); })
      .catch((err) => { if (active) setError(apiErrorMessage(err, "Unable to load your profile name.")); });
    api.get("/referrals")
      .then(({ data }) => {
        if (!active) return;
        const list = extractList<any>(data, "referrals");
        setRequests(list.map((item) => {
          const student = item?.student || {};
          const internship = item?.internship || {};
          const company = item?.company || internship?.company || {};
          return {
            id: String(item?.id ?? ""),
            studentName: fullName(student, item?.studentName || "Student"),
            targetRole: item?.targetRole || item?.role || internship?.title || "Target role not specified",
            company: company?.name || item?.targetCompany || item?.companyName || "Company not specified",
            createdAt: item?.createdAt || "",
            status: String(item?.status || "PENDING").toUpperCase(),
          };
        }));
      })
      .catch((err) => { if (active) setError(apiErrorMessage(err, "Unable to load your dashboard data.")); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const pending = requests.filter((item) => item.status === "PENDING").length;
  const accepted = requests.filter((item) => item.status === "ACCEPTED").length;
  const stats = [
    { label: "Pending Requests", value: pending, icon: Clock, color: "text-amber-600 bg-amber-50" },
    { label: "Referrals Granted", value: accepted, icon: CheckCircle2, color: "text-emerald-600 bg-emerald-50" },
    { label: "Total Requests Received", value: requests.length, icon: UserCheck, color: "text-sky-600 bg-sky-50" },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto w-full">
      <div className="bg-blue-800 text-white p-6 rounded-3xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-bold rounded-lg border border-emerald-500/30">ALUMNI NETWORK</span>
          <h1 className="text-2xl font-black tracking-tight mt-2">Welcome Back, {name}</h1>
          <p className="text-xs text-slate-300">Help students from your alma mater get referred to top companies.</p>
        </div>
        <Link href="/alumni-referrals" className="px-4 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold rounded-xl transition flex items-center gap-2 shrink-0">View Referral Requests <ArrowRight className="w-4 h-4" /></Link>
      </div>

      {error && <div role="alert" className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs text-rose-700">{error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => { const Icon = stat.icon; return (
          <div key={stat.label} className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm flex items-center gap-4">
            <div className={`p-3 rounded-xl ${stat.color}`}><Icon className="w-5 h-5" /></div>
            <div><p className="text-xs font-bold text-slate-400 uppercase">{stat.label}</p><h2 className="text-2xl font-black text-slate-900">{loading ? "..." : stat.value}</h2></div>
          </div>
        ); })}
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex justify-between items-center"><h2 className="text-base font-bold text-slate-900">Recent Referral Requests</h2><Link href="/alumni-referrals" className="text-xs text-emerald-600 hover:underline flex items-center gap-1 font-semibold">View All <ArrowRight className="w-3.5 h-3.5" /></Link></div>
        <div className="divide-y divide-slate-100">
          {loading ? <p className="py-5 text-xs text-slate-500">Loading requests...</p> : requests.length === 0 ? <p className="py-5 text-xs text-slate-500">No referral requests yet.</p> : [...requests].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5).map((req) => (
            <div key={req.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="space-y-0.5"><p className="font-bold text-slate-900 flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-slate-400" /> {req.studentName}</p><p className="text-slate-500">{req.targetRole} @ <span className="font-semibold text-slate-700">{req.company}</span></p></div>
              <div className="flex items-center gap-4"><span className="text-slate-400">{req.createdAt ? new Date(req.createdAt).toLocaleDateString() : ""}</span><span className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${req.status === "ACCEPTED" ? "bg-emerald-50 text-emerald-700" : req.status === "REJECTED" ? "bg-rose-50 text-rose-700" : "bg-amber-50 text-amber-700"}`}>{req.status}</span></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
