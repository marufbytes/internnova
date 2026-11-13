"use client";

import React, { useCallback, useEffect, useState } from "react";
import api from "@/lib/api";
import { apiErrorMessage, extractList, fullName, isEndpointMissing, toDateString } from "@/lib/adminData";
import AdminNotice from "@/components/admin/AdminNotice";
import { Search, Briefcase, Trash2, CheckCircle2, XCircle } from "lucide-react";

interface Internship {
  id: string;
  title: string;
  company: string;
  type: string;
  location: string;
  status: "ACTIVE" | "CLOSED";
}

const normalizeInternship = (i: any): Internship => ({
  id: String(i.id),
  title: i.title || "Untitled",
  company: i.company?.name || i.companyName || "—",
  type: i.type || i.jobType || i.employmentType || "Internship",
  location: i.location || (i.isRemote ? "Remote" : "—"),
  status:
    i.isActive === false || String(i.status || "").toUpperCase() === "CLOSED" ? "CLOSED" : "ACTIVE",
});

export default function AdminInternshipsPage() {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const fetchInternships = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/internship");
      setInternships(extractList(data, "internships").map(normalizeInternship));
      setNotice(null);
    } catch (err) {
      setInternships([]);
      setNotice(
        isEndpointMissing(err)
          ? "Internships are unavailable: GET /internship is not implemented on the backend yet."
          : apiErrorMessage(err, "Failed to load internships.")
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInternships();
  }, [fetchInternships]);

  const toggleStatus = async (id: string) => {
    try {
      const { data } = await api.patch(`/internship/${id}/toggle-status`);
      setInternships((prev) =>
        prev.map((i) =>
          i.id === id
            ? data && typeof data === "object" && "id" in data
              ? { ...i, status: normalizeInternship({ ...data, company: data.company ?? { name: i.company } }).status }
              : { ...i, status: i.status === "ACTIVE" ? "CLOSED" : "ACTIVE" }
            : i
        )
      );
      setNotice(null);
    } catch (err) {
      setNotice(
        isEndpointMissing(err)
          ? "Close/Reopen is unavailable: PATCH /internship/:id/toggle-status is not available for admins."
          : apiErrorMessage(err, "Failed to change internship status.")
      );
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this internship listing?")) return;
    try {
      await api.delete(`/internship/${id}`);
      setInternships((prev) => prev.filter((i) => i.id !== id));
      setNotice(null);
    } catch (err) {
      setNotice(
        isEndpointMissing(err)
          ? "Deleting is unavailable: DELETE /internship/:id is not implemented on the backend yet."
          : apiErrorMessage(err, "Failed to delete internship.")
      );
    }
  };
  const filtered = internships.filter((i) =>
    i.title.toLowerCase().includes(search.toLowerCase()) || i.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col overflow-hidden max-w-7xl mx-auto w-full">
      <div className="shrink-0 space-y-4 pb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Manage Internships</h1>
          <p className="text-xs text-slate-500">Monitor all posted internship opportunities across companies</p>
        </div>


        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search position or company..."
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
              <th className="py-3.5 px-4">Position</th>
              <th className="py-3.5 px-4">Company</th>
              <th className="py-3.5 px-4">Type</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/50 transition">
                <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-sky-500" /> {item.title}
                </td>
                <td className="py-3.5 px-4 text-slate-600">{item.company}</td>
                <td className="py-3.5 px-4 text-slate-500">{item.type} ({item.location})</td>
                <td className="py-3.5 px-4">
                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${item.status === "ACTIVE" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                    {item.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right space-x-2">
                  <button onClick={() => toggleStatus(item.id)} className="px-2.5 py-1 text-[11px] font-semibold bg-slate-100 hover:bg-slate-200 rounded-lg">
                    {item.status === "ACTIVE" ? "Close" : "Reopen"}
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg" title="Delete">
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