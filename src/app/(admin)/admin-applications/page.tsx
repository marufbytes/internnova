"use client";

import React, { useCallback, useEffect, useState } from "react";
import api from "@/lib/api";
import { apiErrorMessage, extractList, fullName, isEndpointMissing, toDateString } from "@/lib/adminData";
import AdminNotice from "@/components/admin/AdminNotice";
import { Search, FileText, Trash2 } from "lucide-react";

interface Application {
  id: string;
  applicant: string;
  position: string;
  company: string;
  appliedDate: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
}

const normalizeApplication = (a: any): Application => {
  const raw = String(a.status || "PENDING").toUpperCase();
  return {
    id: String(a.id),
    applicant: fullName(a.student || a.user || a, "Unknown applicant"),
    position: a.internship?.title || a.position || "—",
    company: a.internship?.company?.name || a.company?.name || a.companyName || "—",
    appliedDate: toDateString(a.createdAt || a.appliedAt || a.appliedDate),
    status: raw === "ACCEPTED" || raw === "REJECTED" ? raw : "PENDING",
  };
};

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const fetchApplications = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/application");
      setApplications(extractList(data, "applications").map(normalizeApplication));
      setNotice(null);
    } catch (err) {
      setApplications([]);
      setNotice(
        isEndpointMissing(err)
          ? "Applications are unavailable: GET /application (admin, all applications) is not implemented on the backend yet."
          : apiErrorMessage(err, "Failed to load applications.")
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this application log?")) return;
    try {
      await api.delete(`/application/${id}`);
      setApplications((prev) => prev.filter((a) => a.id !== id));
      setNotice(null);
    } catch (err) {
      setNotice(
        isEndpointMissing(err)
          ? "Deleting is unavailable: DELETE /application/:id is not implemented on the backend yet."
          : apiErrorMessage(err, "Failed to delete application.")
      );
    }
  };
  const filtered = applications.filter((a) =>
    a.applicant.toLowerCase().includes(search.toLowerCase()) || a.position.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col overflow-hidden max-w-7xl mx-auto w-full">
      <div className="shrink-0 space-y-4 pb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Applications Log</h1>
          <p className="text-xs text-slate-500">Read-only audit log of student internship submissions</p>
        </div>


        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search applicant or position..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="shrink-0 empty:hidden pb-4">
        <AdminNotice message={notice} />
      </div>

      {/* Scrollable content: only this box scrolls */}
      <div className="flex-1 min-h-0 overflow-y-auto pb-6">
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200/80 text-slate-500 font-bold uppercase tracking-wider">
              <th className="py-3.5 px-4">Applicant</th>
              <th className="py-3.5 px-4">Position & Company</th>
              <th className="py-3.5 px-4">Applied Date</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/50 transition">
                <td className="py-3.5 px-4 font-bold text-slate-900">{item.applicant}</td>
                <td className="py-3.5 px-4 text-slate-600 font-medium">
                  {item.position} <span className="text-slate-400">@ {item.company}</span>
                </td>
                <td className="py-3.5 px-4 text-slate-500">{item.appliedDate}</td>
                <td className="py-3.5 px-4">
                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${
                    item.status === "ACCEPTED" ? "bg-emerald-50 text-emerald-700" : item.status === "REJECTED" ? "bg-rose-50 text-rose-700" : "bg-amber-50 text-amber-700"
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <button onClick={() => handleDelete(item.id)} className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg" title="Delete record">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
}