"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Check, X, FileText, ExternalLink, Search } from "lucide-react";
import api from "@/lib/api";
import { apiErrorMessage, extractList } from "@/lib/adminData";

type ReferralStatus = "PENDING" | "ACCEPTED" | "REJECTED";
interface ReferralReq {
  id: string;
  studentName: string;
  email: string;
  targetRole: string;
  targetCompany: string;
  resumeUrl: string;
  message: string;
  status: ReferralStatus;
  createdAt: string;
}

function normalizeReferral(item: any): ReferralReq {
  const student = item?.student || {};
  const internship = item?.internship || {};
  const company = item?.company || internship?.company || {};
  const name = `${student.firstName || ""} ${student.lastName || ""}`.trim()
    || student.name || item?.studentName || "Student";
  const rawStatus = String(item?.status || "PENDING").toUpperCase();
  return {
    id: String(item?.id ?? ""),
    studentName: name,
    email: student.email || item?.email || "",
    targetRole: item?.targetRole || item?.role || internship?.title || "Target role not specified",
    targetCompany: company?.name || item?.targetCompany || item?.companyName || "Company not specified",
    resumeUrl: item?.resumeUrl || item?.resume?.url || item?.resume?.fileUrl || "",
    message: item?.message || "",
    status: rawStatus === "ACCEPTED" || rawStatus === "REJECTED" ? rawStatus : "PENDING",
    createdAt: item?.createdAt || "",
  };
}

export default function ReferralRequestsPage() {
  const [requests, setRequests] = useState<ReferralReq[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [actingId, setActingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadRequests = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/referrals");
      setRequests(extractList(data, "referrals").map(normalizeReferral));
      setError(null);
    } catch (err) {
      setError(apiErrorMessage(err, "Unable to load referral requests."));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void loadRequests(); }, [loadRequests]);

  const handleAction = async (id: string, status: "ACCEPTED" | "REJECTED") => {
    setActingId(id);
    setError(null);
    try {
      const { data } = await api.patch(`/referrals/${id}`, { status });
      setRequests((prev) => prev.map((req) => req.id === id
        ? { ...req, status: data?.status ? String(data.status).toUpperCase() as ReferralStatus : status }
        : req));
    } catch (err) {
      setError(apiErrorMessage(err, "Unable to update this referral request."));
    } finally {
      setActingId(null);
    }
  };

  const filtered = useMemo(() => requests.filter((req) =>
    `${req.studentName} ${req.email} ${req.targetRole} ${req.targetCompany}`.toLowerCase().includes(search.toLowerCase())
  ), [requests, search]);

  return (
    <div className="h-full flex flex-col overflow-hidden max-w-7xl mx-auto w-full">
      <div className="shrink-0 space-y-4 pb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Referral Requests</h1>
          <p className="text-xs text-slate-500">Review student requests and refer qualified candidates to your company</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input type="search" placeholder="Search student or position..." value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none" />
          </div>
        </div>
        {error && <div role="alert" className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs text-rose-700">{error}</div>}
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto space-y-4 pb-2">
        {loading ? <p className="py-12 text-center text-sm text-slate-500">Loading referral requests...</p>
          : filtered.length === 0 ? <p className="py-12 text-center text-sm text-slate-500">{search ? "No requests match your search." : "No referral requests yet."}</p>
          : filtered.map((req) => (
            <article key={req.id} className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div><h2 className="text-base font-bold text-slate-900">{req.studentName}</h2><p className="text-xs text-slate-500">{req.email}</p></div>
                <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold self-start sm:self-auto ${req.status === "ACCEPTED" ? "bg-emerald-50 text-emerald-700" : req.status === "REJECTED" ? "bg-rose-50 text-rose-700" : "bg-amber-50 text-amber-700"}`}>{req.status}</span>
              </div>
              <div className="space-y-2 text-xs">
                <p className="font-bold text-slate-800">Target Role: <span className="text-emerald-600">{req.targetRole}</span> @ {req.targetCompany}</p>
                {req.message && <p className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-slate-600">{req.message}</p>}
                <p className="text-slate-400">Received {req.createdAt ? new Date(req.createdAt).toLocaleDateString() : "date unavailable"}</p>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                {req.resumeUrl ? <a href={req.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-sky-600 hover:underline flex items-center gap-1 font-semibold"><FileText className="w-3.5 h-3.5" /> View Resume / Portfolio <ExternalLink className="w-3 h-3" /></a> : <span className="text-xs text-slate-400">No resume attached</span>}
                {req.status === "PENDING" && <div className="flex gap-2">
                  <button disabled={actingId === req.id} onClick={() => void handleAction(req.id, "REJECTED")} className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-semibold rounded-lg transition flex items-center gap-1 disabled:opacity-50"><X className="w-3.5 h-3.5" /> Decline</button>
                  <button disabled={actingId === req.id} onClick={() => void handleAction(req.id, "ACCEPTED")} className="px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold rounded-lg transition flex items-center gap-1 shadow-sm disabled:opacity-50"><Check className="w-3.5 h-3.5" /> {actingId === req.id ? "Saving..." : "Grant Referral"}</button>
                </div>}
              </div>
            </article>
          ))}
      </div>
    </div>
  );
}
