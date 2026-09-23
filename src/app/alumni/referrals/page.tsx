"use client";

import React, { useState } from "react";
import { Check, X, FileText, ExternalLink, UserCheck, Search } from "lucide-react";

interface ReferralReq {
  id: string;
  studentName: string;
  email: string;
  targetRole: string;
  targetCompany: string;
  resumeUrl: string;
  message: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
}

const INITIAL_REQUESTS: ReferralReq[] = [
  {
    id: "REF-101",
    studentName: "Sabbir Hossain",
    email: "sabbir@student.edu",
    targetRole: "Software Engineer Intern",
    targetCompany: "Google",
    resumeUrl: "https://example.com/sabbir-resume.pdf",
    message: "Hi, I have built several full-stack projects using React and Node.js. I would appreciate a referral for the SDE intern role!",
    status: "PENDING",
  },
  {
    id: "REF-102",
    studentName: "Nusrat Jahan",
    email: "nusrat@student.edu",
    targetRole: "Product Designer Intern",
    targetCompany: "Meta",
    resumeUrl: "https://example.com/nusrat-portfolio.pdf",
    message: "Hello! I saw an opening at Meta for UI/UX intern. My portfolio aligns well with the position.",
    status: "PENDING",
  },
];

export default function ReferralRequestsPage() {
  const [requests, setRequests] = useState<ReferralReq[]>(INITIAL_REQUESTS);
  const [search, setSearch] = useState("");

  const handleAction = (id: string, newStatus: "ACCEPTED" | "REJECTED") => {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r)));
  };

  const filtered = requests.filter(
    (r) => r.studentName.toLowerCase().includes(search.toLowerCase()) || r.targetRole.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto w-full">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Referral Requests</h1>
        <p className="text-xs text-slate-500">Review student requests and refer qualified candidates to your company</p>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search student or position..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map((req) => (
          <div key={req.id} className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">{req.studentName}</h3>
                <p className="text-xs text-slate-500">{req.email}</p>
              </div>
              <span
                className={`px-2.5 py-1 rounded-md text-[10px] font-bold self-start sm:self-auto ${
                  req.status === "ACCEPTED"
                    ? "bg-emerald-50 text-emerald-700"
                    : req.status === "REJECTED"
                    ? "bg-rose-50 text-rose-700"
                    : "bg-amber-50 text-amber-700"
                }`}
              >
                {req.status}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <p className="font-bold text-slate-800">
                Target Role: <span className="text-emerald-600">{req.targetRole}</span> @ {req.targetCompany}
              </p>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-slate-600 text-xs">
                "{req.message}"
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <a
                href={req.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-sky-600 hover:underline flex items-center gap-1 font-semibold"
              >
                <FileText className="w-3.5 h-3.5" /> View Resume / Portfolio <ExternalLink className="w-3 h-3" />
              </a>

              {req.status === "PENDING" && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAction(req.id, "REJECTED")}
                    className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-semibold rounded-lg transition flex items-center gap-1"
                  >
                    <X className="w-3.5 h-3.5" /> Decline
                  </button>
                  <button
                    onClick={() => handleAction(req.id, "ACCEPTED")}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition flex items-center gap-1 shadow-sm"
                  >
                    <Check className="w-3.5 h-3.5" /> Grant Referral
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}