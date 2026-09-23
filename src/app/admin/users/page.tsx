"use client";

import React, { useState } from "react";
import { Search, ShieldAlert, CheckCircle2, MoreVertical, UserX, UserCheck, Filter, Download } from "lucide-react";

interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: "STUDENT" | "HR" | "ALUMNI" | "ADMIN";
  status: "ACTIVE" | "INACTIVE";
  joinedDate: string;
}

const INITIAL_USERS: UserRecord[] = [
  { id: "USR-001", name: "Alex Johnson", email: "alex.j@university.edu", role: "STUDENT", status: "ACTIVE", joinedDate: "2026-01-15" },
  { id: "USR-002", name: "Sarah Jenkins", email: "sarah.j@techcorp.com", role: "HR", status: "ACTIVE", joinedDate: "2026-02-01" },
  { id: "USR-003", name: "Michael Chang", email: "m.chang@alumni.edu", role: "ALUMNI", status: "ACTIVE", joinedDate: "2025-11-20" },
  { id: "USR-004", name: "David Miller", email: "david.admin@platform.com", role: "ADMIN", status: "ACTIVE", joinedDate: "2025-08-10" },
  { id: "USR-005", name: "Emily Watson", email: "emily.w@student.edu", role: "STUDENT", status: "INACTIVE", joinedDate: "2026-03-04" },
];

export default function ManageUsersPage() {
  const [users, setUsers] = useState<UserRecord[]>(INITIAL_USERS);
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("ALL");

  const toggleUserStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: u.status === "ACTIVE" ? "INACTIVE" : "ACTIVE" } : u))
    );
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = selectedRole === "ALL" || u.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const roleBadges: Record<string, string> = {
    STUDENT: "bg-sky-50 text-sky-700 border-sky-200",
    HR: "bg-indigo-50 text-indigo-700 border-indigo-200",
    ALUMNI: "bg-emerald-50 text-emerald-700 border-emerald-200",
    ADMIN: "bg-rose-50 text-rose-700 border-rose-200",
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Manage Users</h1>
          <p className="text-xs text-slate-500">Monitor accounts, manage roles, and handle account status</p>
        </div>
        <button className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition flex items-center gap-2 self-start md:self-auto">
          <Download className="w-3.5 h-3.5" /> Export User List
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {["ALL", "STUDENT", "HR", "ALUMNI", "ADMIN"].map((role) => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition shrink-0 ${
                selectedRole === role ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-slate-500 font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4">User</th>
                <th className="py-3.5 px-4">Role</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Joined Date</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/50 transition">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{u.name}</div>
                      <div className="text-slate-400 text-[11px]">{u.email}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold border ${roleBadges[u.role]}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center gap-1 font-bold ${u.status === "ACTIVE" ? "text-emerald-600" : "text-rose-500"}`}>
                        {u.status === "ACTIVE" ? <CheckCircle2 className="w-3.5 h-3.5" /> : <ShieldAlert className="w-3.5 h-3.5" />}
                        {u.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">{u.joinedDate}</td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => toggleUserStatus(u.id)}
                        className={`px-3 py-1 rounded-lg font-medium text-xs transition inline-flex items-center gap-1.5 ${
                          u.status === "ACTIVE"
                            ? "bg-rose-50 text-rose-600 hover:bg-rose-100"
                            : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                        }`}
                      >
                        {u.status === "ACTIVE" ? <UserX className="w-3.5 h-3.5" /> : <UserCheck className="w-3.5 h-3.5" />}
                        {u.status === "ACTIVE" ? "Deactivate" : "Activate"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400">No users found matching filter criteria.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}