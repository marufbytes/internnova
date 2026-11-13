"use client";

import React, { useCallback, useEffect, useState } from "react";
import api from "@/lib/api";
import { apiErrorMessage, extractList, isEndpointMissing } from "@/lib/adminData";
import AdminNotice from "@/components/admin/AdminNotice";
import { Search, Building2, Trash2, Edit2, Plus, ExternalLink, Globe } from "lucide-react";

interface Company {
  id: string;
  name: string;
  industry: string;
  website: string;
  location: string;
  totalPostings: number;
}

const normalizeCompany = (c: any): Company => ({
  id: String(c.id),
  name: c.name || c.companyName || "Unnamed company",
  industry: c.industry || "—",
  website: c.website || "",
  location: c.location || "—",
  totalPostings: c.totalPostings ?? c.internshipCount ?? c._count?.internships ?? c.internships?.length ?? 0,
});

export default function AdminCompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editCompany, setEditCompany] = useState<Company | null>(null);
  const [formData, setFormData] = useState({ name: "", industry: "", website: "", location: "" });

  const fetchCompanies = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/company");
      setCompanies(extractList(data, "companies").map(normalizeCompany));
      setNotice(null);
    } catch (err) {
      setCompanies([]);
      setNotice(
        isEndpointMissing(err)
          ? "Company list is unavailable: GET /company is not implemented on the backend yet."
          : apiErrorMessage(err, "Failed to load companies.")
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  const reportFailure = (err: unknown, route: string, action: string) =>
    setNotice(
      isEndpointMissing(err)
        ? `${action} is unavailable: ${route} is not implemented on the backend yet.`
        : apiErrorMessage(err, `${action} failed.`)
    );

  const handleOpenAdd = () => {
    setEditCompany(null);
    setFormData({ name: "", industry: "", website: "", location: "" });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (company: Company) => {
    setEditCompany(company);
    setFormData({ name: company.name, industry: company.industry, website: company.website, location: company.location });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this company?")) return;
    try {
      await api.delete(`/company/${id}`);
      setCompanies((prev) => prev.filter((c) => c.id !== id));
      setNotice(null);
    } catch (err) {
      reportFailure(err, "DELETE /company/:id", "Deleting a company");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editCompany) {
        const { data } = await api.patch(`/company/${editCompany.id}`, formData);
        setCompanies((prev) =>
          prev.map((c) => (c.id === editCompany.id ? { ...c, ...formData, ...(data?.id ? normalizeCompany(data) : {}) } : c))
        );
      } else {
        const { data } = await api.post("/company", formData);
        setCompanies((prev) => [
          ...prev,
          data?.id ? normalizeCompany(data) : { id: `tmp-${Date.now()}`, ...formData, totalPostings: 0 },
        ]);
      }
      setNotice(null);
      setIsModalOpen(false);
    } catch (err) {
      reportFailure(err, editCompany ? "PATCH /company/:id" : "POST /company", editCompany ? "Editing a company" : "Adding a company");
      setIsModalOpen(false);
    }
  };
  const filtered = companies.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) || c.industry.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col overflow-hidden max-w-7xl mx-auto w-full">
      <div className="shrink-0 space-y-4 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Manage Companies</h1>
            <p className="text-xs text-slate-500">Add, edit, or remove partner companies across the platform</p>
          </div>
          <button onClick={handleOpenAdd} className="px-4 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold rounded-xl transition flex items-center gap-2 self-start sm:self-auto shadow-sm">
            <Plus className="w-4 h-4" /> Add New Company
          </button>
        </div>


        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search company or industry..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
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
              <th className="py-3.5 px-4">Company</th>
              <th className="py-3.5 px-4">Industry</th>
              <th className="py-3.5 px-4">Location</th>
              <th className="py-3.5 px-4">Internships</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50/50 transition">
                <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-slate-400" /> {c.name}
                </td>
                <td className="py-3.5 px-4 text-slate-600">{c.industry}</td>
                <td className="py-3.5 px-4 text-slate-500">{c.location}</td>
                <td className="py-3.5 px-4 font-bold text-slate-700">{c.totalPostings}</td>
                <td className="py-3.5 px-4 text-right space-x-2">
                  <button onClick={() => handleOpenEdit(c)} className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition" title="Edit">
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleDelete(c.id)} className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition" title="Delete">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
            {!loading && filtered.length === 0 && (<tr><td colSpan={5} className="py-8 text-center text-slate-400">No companies found.</td></tr>)}
            {loading && (<tr><td colSpan={5} className="py-8 text-center text-slate-400">Loading companies...</td></tr>)}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl space-y-4">
            <h2 className="text-base font-bold text-slate-900">{editCompany ? "Edit Company" : "Add Company"}</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input type="text" placeholder="Company Name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl" />
              <input type="text" placeholder="Industry" required value={formData.industry} onChange={(e) => setFormData({ ...formData, industry: e.target.value })} className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl" />
              <input type="url" placeholder="Website URL" required value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl" />
              <input type="text" placeholder="Location" required value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl" />
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-slate-100 text-xs font-semibold rounded-xl">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold rounded-xl transition">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
