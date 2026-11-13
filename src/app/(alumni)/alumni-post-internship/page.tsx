"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Send, CheckCircle2 } from "lucide-react";
import api from "@/lib/api";
import { apiErrorMessage } from "@/lib/adminData";

interface InternshipForm {
  title: string;
  description: string;
  requirements: string;
}

const initialForm: InternshipForm = { title: "", description: "", requirements: "" };

export default function AlumniPostInternshipPage() {
  const [formData, setFormData] = useState<InternshipForm>(initialForm);
  const [companyName, setCompanyName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.get("/users/me").then(({ data }) => {
      const company = data?.company;
      setCompanyName(typeof company === "string" ? company : company?.name || data?.companyName || "");
    }).catch(() => {
      // Profile information is only shown as context; posting remains available.
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSubmitted(false);
    const payload = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      requirements: formData.requirements.trim(),
    };
    try {
      await api.post("/internship", payload);
      setSubmitted(true);
      setFormData(initialForm);
    } catch (err) {
      setError(apiErrorMessage(err, "Unable to post this opportunity."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto w-full space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Post Opportunity for Juniors</h1>
        <p className="text-xs text-slate-500">Share an opening directly with students from your varsity.</p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs text-slate-600">
        This internship will be linked to your saved company{companyName ? <>: <span className="font-semibold text-slate-800">{companyName}</span></> : "."} {" "}
        <Link href="/alumni-profile" className="font-semibold text-emerald-700 hover:underline">Update profile</Link>
      </div>

      {submitted && <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-bold flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Opportunity posted successfully! Juniors can now view and apply.</div>}
      {error && <div role="alert" className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs text-rose-700">{error}</div>}

      <form onSubmit={handleSubmit} className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Position Title</label>
          <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="e.g. Software Engineer Intern" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
          <textarea rows={4} required minLength={10} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Describe the role, team, and what the intern will work on..." className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Requirements</label>
          <textarea rows={3} required value={formData.requirements} onChange={(e) => setFormData({ ...formData, requirements: e.target.value })} placeholder="e.g. React, TypeScript, communication skills" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none" />
        </div>
        <div className="flex justify-end pt-2">
          <button type="submit" disabled={submitting} className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold rounded-xl flex items-center gap-2 transition shadow-sm disabled:opacity-50">
            <Send className="w-3.5 h-3.5" /> {submitting ? "Sharing..." : "Share Listing with Students"}
          </button>
        </div>
      </form>
    </div>
  );
}
