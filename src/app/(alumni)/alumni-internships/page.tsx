"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Briefcase, Building2, CalendarDays, MapPin, Search } from "lucide-react";
import api from "@/lib/api";
import { apiErrorMessage, extractList } from "@/lib/adminData";

type Tab = "all" | "mine";
interface Internship {
  id: string;
  title: string;
  description: string;
  company: string;
  location: string;
  type: string;
  deadline: string;
  createdAt: string;
  creatorId: string;
}

function normalizeInternship(item: any): Internship {
  const creatorId = item?.creatorId ?? item?.creator?.id ?? "";
  return {
    id: String(item?.id ?? ""),
    title: item?.title || "Untitled internship",
    description: item?.description || "",
    company: item?.company?.name || item?.companyName || item?.company || "Company not specified",
    location: item?.location || "Location not specified",
    type: item?.type || item?.employmentType || "",
    deadline: item?.deadline || "",
    createdAt: item?.createdAt || "",
    creatorId: String(creatorId),
  };
}

export default function AlumniInternshipsPage() {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [userId, setUserId] = useState("");
  const [tab, setTab] = useState<Tab>("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    Promise.allSettled([api.get("/internship"), api.get("/users/me")]).then(([internshipResult, userResult]) => {
      if (!active) return;
      const failures: string[] = [];
      if (internshipResult.status === "fulfilled") {
        setInternships(extractList<any>(internshipResult.value.data, "internships").map(normalizeInternship));
      } else {
        failures.push(apiErrorMessage(internshipResult.reason, "Unable to load internships."));
      }
      if (userResult.status === "fulfilled") {
        setUserId(String(userResult.value.data?.id ?? userResult.value.data?.userId ?? ""));
      } else {
        failures.push(apiErrorMessage(userResult.reason, "Unable to identify the logged-in user."));
      }
      setError(failures.length ? failures.join(" ") : null);
    }).finally(() => { if (active) setLoading(false); });

    return () => { active = false; };
  }, []);

  const filteredInternships = useMemo(() => {
    const query = search.trim().toLowerCase();
    return internships.filter((item) => {
      const matchesTab = tab === "all" || Boolean(userId && item.creatorId && item.creatorId === userId);
      const matchesSearch = !query || `${item.title} ${item.company} ${item.description} ${item.location}`.toLowerCase().includes(query);
      return matchesTab && matchesSearch;
    });
  }, [internships, search, tab, userId]);

  return (
    <div className="h-full flex flex-col overflow-hidden max-w-7xl mx-auto w-full">
      <header className="shrink-0 space-y-4 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Internships</h1>
            <p className="text-xs text-slate-500">Browse opportunities shared across the network and manage your own posts.</p>
          </div>
          <Link href="/alumni-post-internship" className="self-start sm:self-auto rounded-xl bg-blue-700 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-800">Post an Internship</Link>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 rounded-2xl border border-slate-200/80 bg-white p-3 shadow-sm">
          <div className="flex shrink-0 rounded-xl bg-slate-100 p-1" role="tablist" aria-label="Filter internships">
            <button type="button" role="tab" aria-selected={tab === "all"} onClick={() => setTab("all")} className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${tab === "all" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}>All Internships</button>
            <button type="button" role="tab" aria-selected={tab === "mine"} onClick={() => setTab("mine")} className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${tab === "mine" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}>My Posts</button>
          </div>
          <div className="relative min-w-0 flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search role, company, or location..." className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-xs text-slate-800 outline-none focus:border-slate-300" />
          </div>
        </div>
        {error && <div role="alert" className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs text-rose-700">{error}</div>}
      </header>

      <section className="min-h-0 flex-1 overflow-y-auto pb-2" aria-label="Internship listings">
        {loading ? <p className="py-12 text-center text-sm text-slate-500">Loading internships...</p>
          : filteredInternships.length === 0 ? <p className="py-12 text-center text-sm text-slate-500">{tab === "mine" ? "You have not posted any matching internships yet." : "No internships match your search."}</p>
          : <div className="space-y-3">
            {filteredInternships.map((item) => (
              <article key={item.id} className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 space-y-2">
                    <div><h2 className="text-base font-bold text-slate-900">{item.title}</h2><p className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-emerald-700"><Building2 className="h-3.5 w-3.5" />{item.company}</p></div>
                    {item.description && <p className="max-w-3xl whitespace-pre-line text-xs leading-5 text-slate-600">{item.description}</p>}
                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-[11px] text-slate-500">
                      <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{item.location}</span>
                      {item.type && <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" />{item.type}</span>}
                      {item.deadline && <span className="flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" />Deadline {new Date(item.deadline).toLocaleDateString()}</span>}
                    </div>
                  </div>
                  {tab === "mine" && <span className="shrink-0 self-start rounded-md bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">My post</span>}
                </div>
              </article>
            ))}
          </div>}
      </section>
    </div>
  );
}
