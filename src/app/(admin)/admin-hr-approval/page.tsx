"use client";

import React, { useCallback, useEffect, useState } from "react";
import api from "@/lib/api";
import { apiErrorMessage, extractList, fullName, isEndpointMissing, toDateString } from "@/lib/adminData";
import AdminNotice from "@/components/admin/AdminNotice";
import { Check, X, Building2, Mail, ExternalLink, ShieldCheck, Clock } from "lucide-react";

interface HRRequest {
  id: string;
  name: string;
  email: string;
  companyName: string;
  website: string;
  submittedAt: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
}

const normalizeHr = (u: any): HRRequest => {
  const raw = String(u.approvalStatus || u.hrStatus || u.verificationStatus || "").toUpperCase();
  let status: HRRequest["status"] = "PENDING";
  if (raw === "APPROVED" || u.isApproved === true || u.isVerified === true) status = "APPROVED";
  else if (raw === "REJECTED") status = "REJECTED";
  return {
    id: String(u.id),
    name: fullName(u),
    email: u.email || "",
    companyName: u.company?.name || u.companyName || "—",
    website: u.company?.website || u.website || "",
    submittedAt: toDateString(u.createdAt),
    status,
  };
};

export default function HRApprovalPage() {
  const [requests, setRequests] = useState<HRRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState<string | null>(null);

  const fetchRequests = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/users");
      const hrUsers = extractList<any>(data, "users").filter((u) => String(u.role).toUpperCase() === "HR");
      setRequests(hrUsers.map(normalizeHr));
      setNotice(null);
    } catch (err) {
      setRequests([]);
      setNotice(
        isEndpointMissing(err)
          ? "HR requests are unavailable: GET /users is not implemented on the backend yet."
          : apiErrorMessage(err, "Failed to load HR requests.")
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const handleAction = async (id: string, newStatus: "APPROVED" | "REJECTED") => {
    try {
      await api.patch(`/users/${id}/hr-approval`, { status: newStatus });
      setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r)));
      setNotice(null);
    } catch (err) {
      setNotice(
        isEndpointMissing(err)
          ? "Approve/Reject is unavailable: PATCH /users/:id/hr-approval is not implemented on the backend yet."
          : apiErrorMessage(err, "Failed to update HR request.")
      );
    }
  };

  const pendingRequests = requests.filter((r) => r.status === "PENDING");
  const processedRequests = requests.filter((r) => r.status !== "PENDING");
  return (
    <div className="h-full flex flex-col overflow-hidden max-w-7xl mx-auto w-full">
      <div className="shrink-0 space-y-4 pb-4">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">HR Verification Requests</h1>
          <p className="text-xs text-slate-500">Review company recruiter applications before granting job posting capabilities</p>
        </div>
      </div>

      <div className="shrink-0 empty:hidden pb-4">
        <AdminNotice message={notice} />
      </div>

      {/* Scrollable content: only this box scrolls */}
      <div className="flex-1 min-h-0 overflow-y-auto space-y-8 pb-6">
      {/* Pending Queue */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-amber-500" />
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
            Pending Queue ({pendingRequests.length})
          </h2>
        </div>

        {pendingRequests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingRequests.map((req) => (
              <div key={req.id} className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">{req.name}</h3>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                        <Mail className="w-3.5 h-3.5 text-slate-400" /> {req.email}
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-md">
                      PENDING
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                      <Building2 className="w-3.5 h-3.5 text-slate-500" /> {req.companyName}
                    </div>
                    <a
                      href={req.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-sky-600 hover:underline flex items-center gap-1 font-medium"
                    >
                      {req.website} <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">Submitted: {req.submittedAt}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAction(req.id, "REJECTED")}
                      className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-semibold rounded-lg transition flex items-center gap-1"
                    >
                      <X className="w-3.5 h-3.5" /> Reject
                    </button>
                    <button
                      onClick={() => handleAction(req.id, "APPROVED")}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition flex items-center gap-1 shadow-sm"
                    >
                      <Check className="w-3.5 h-3.5" /> Approve HR
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-slate-200/80 p-8 rounded-2xl text-center text-slate-400 text-xs">
            No pending HR registration requests at this time.
          </div>
        )}
      </div>

      {/* History Table */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-slate-600" />
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Processed History</h2>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-slate-500 font-bold uppercase tracking-wider">
                <th className="py-3 px-4">Applicant</th>
                <th className="py-3 px-4">Company</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {processedRequests.map((req) => (
                <tr key={req.id}>
                  <td className="py-3 px-4 font-bold text-slate-900">{req.name}</td>
                  <td className="py-3 px-4 text-slate-600">{req.companyName}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold border ${
                        req.status === "APPROVED"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-rose-50 text-rose-700 border-rose-200"
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right text-slate-400">{req.submittedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </div>
  );
}