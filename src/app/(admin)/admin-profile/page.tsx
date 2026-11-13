"use client";

import React, { useEffect, useState } from "react";
import api from "@/lib/api";
import { apiErrorMessage, fullName, isEndpointMissing } from "@/lib/adminData";
import { User, Mail, ShieldCheck, Save, CheckCircle2, Pencil, X } from "lucide-react";

interface AdminProfile { name: string; email: string; role: string }
const initialProfile: AdminProfile = { name: "", email: "", role: "System Admin" };
const inputClass = "w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:bg-white focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-600/20";

function ProfileValue({ label, value }: { label: string; value?: string }) {
  return <div className="min-w-0"><p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">{label}</p><p className="mt-1 break-words text-sm font-medium text-slate-800">{value || <span className="font-normal text-slate-400">Not provided</span>}</p></div>;
}

export default function AdminProfilePage() {
  const [profile, setProfile] = useState<AdminProfile>(initialProfile);
  const [savedProfile, setSavedProfile] = useState<AdminProfile>(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const initials = profile.name.trim().split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase() || "A";

  useEffect(() => {
    api.get("/users/me")
      .then(({ data }) => {
        const loadedProfile: AdminProfile = {
          name: fullName(data, ""),
          email: data?.email || "",
          role: data?.role ? String(data.role).replace(/^./, (ch: string) => ch.toUpperCase()) : "System Admin",
        };
        setProfile(loadedProfile);
        setSavedProfile(loadedProfile);
        setNotice(null);
      })
      .catch((err) => setNotice(isEndpointMissing(err)
        ? "Profile could not be loaded: GET /users/me is not available."
        : apiErrorMessage(err, "Failed to load profile.")))
      .finally(() => setLoading(false));
  }, []);

  const cancelEditing = () => {
    setProfile(savedProfile);
    setNotice(null);
    setIsEditing(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const [firstName, ...rest] = profile.name.trim().split(/\s+/);
    setSaving(true);
    setNotice(null);
    try {
      await api.patch("/users/profile", {
        firstName: firstName || undefined,
        lastName: rest.join(" ") || undefined,
        email: profile.email.trim() || undefined,
      });
      const updatedProfile = { ...profile };
      setProfile(updatedProfile);
      setSavedProfile(updatedProfile);
      setSaved(true);
      setIsEditing(false);
      window.setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setNotice(isEndpointMissing(err)
        ? "Saving is unavailable: PATCH /users/profile is not implemented for admins on the backend yet."
        : apiErrorMessage(err, "Failed to update profile."));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-4xl space-y-4 pb-4">
      <div><p className="text-[11px] font-bold uppercase tracking-[0.16em] text-blue-600">Workspace settings</p><h1 className="mt-1 text-2xl font-black tracking-tight text-slate-950">Admin Profile</h1><p className="mt-1 text-sm text-slate-500">Your administrator identity and account contact details.</p></div>
      {notice && <div role="alert" className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{notice}</div>}
      {saved && <div role="status" className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-800"><CheckCircle2 className="h-4 w-4" /> Profile updated successfully.</div>}

      <form onSubmit={handleSubmit} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md shadow-slate-900/5">
        <div className="flex flex-col gap-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-blue-50/60 px-5 py-4 sm:flex-row sm:items-center">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-slate-800 to-slate-950 text-lg font-bold text-white shadow-sm ring-4 ring-white">{initials}</div>
          <div className="min-w-0 flex-1 text-center sm:text-left"><p className="truncate text-lg font-bold text-slate-950">{profile.name || (loading ? "Loading profile..." : "Administrator")}</p><p className="mt-0.5 truncate text-sm text-slate-500">{profile.role}{profile.email ? ` · ${profile.email}` : ""}</p></div>
          {!isEditing ? <button type="button" onClick={() => setIsEditing(true)} disabled={loading} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600/30 disabled:opacity-50"><Pencil className="h-4 w-4" /> Edit Profile</button>
            : <div className="flex shrink-0 justify-center gap-2"><button type="button" onClick={cancelEditing} disabled={saving} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"><X className="h-4 w-4" /> Cancel</button><button type="submit" disabled={saving} className="inline-flex items-center gap-1.5 rounded-lg bg-blue-700 px-3.5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 disabled:opacity-50"><Save className="h-4 w-4" /> {saving ? "Saving..." : "Save Changes"}</button></div>}
        </div>

        <div className="space-y-5 p-5">
          <section>
            <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-slate-400">Personal Information</h2>
            {isEditing ? <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="space-y-1.5 text-xs font-semibold text-slate-600">Full name<div className="relative"><User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input required value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className={`${inputClass} pl-9`} placeholder="Your full name" /></div></label>
              <label className="space-y-1.5 text-xs font-semibold text-slate-600">Email address<div className="relative"><Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input type="email" required value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} className={`${inputClass} pl-9`} placeholder="admin@example.com" /></div></label>
            </div> : <div className="grid grid-cols-1 gap-4 md:grid-cols-2"><ProfileValue label="Full name" value={profile.name} /><ProfileValue label="Email address" value={profile.email} /></div>}
          </section>
          <section className="border-t border-slate-100 pt-4">
            <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-slate-400">Access and Security</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2"><ProfileValue label="Account role" value={profile.role} /><div className="flex items-center gap-2 self-end rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-500"><ShieldCheck className="h-4 w-4 shrink-0 text-blue-500" />Administrator access is protected.</div></div>
          </section>
        </div>
      </form>
    </div>
  );
}
