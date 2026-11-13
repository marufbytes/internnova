"use client";

import React, { useCallback, useEffect, useState } from "react";
import api from "@/lib/api";
import { apiErrorMessage, extractList, fullName, isEndpointMissing, toDateString } from "@/lib/adminData";
import AdminNotice from "@/components/admin/AdminNotice";
import { Search, ShieldAlert, CheckCircle2, MoreVertical, UserX, UserCheck, Filter, Download } from "lucide-react";

interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: "STUDENT" | "HR" | "ALUMNI" | "ADMIN";
  status: "ACTIVE" | "INACTIVE";
  joinedDate: string;
}

const normalizeUser = (u: any): UserRecord => ({
  id: String(u.id),
  name: fullName(u),
  email: u.email || "",
  role: String(u.role || "STUDENT").toUpperCase() as UserRecord["role"],
  status:
    String(u.status || "").toUpperCase() === "INACTIVE" || u.isActive === false || u.isBlocked === true
      ? "INACTIVE"
      : "ACTIVE",
  joinedDate: toDateString(u.createdAt || u.joinedAt),
});

export default function ManageUsersPage() {
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("ALL");

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/users");
      setUsers(extractList(data, "users").map(normalizeUser));
      setNotice(null);
    } catch (err) {
      setUsers([]);
      setNotice(
        isEndpointMissing(err)
          ? "User list is unavailable: GET /users is not implemented on the backend yet."
          : apiErrorMessage(err, "Failed to load users.")
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const toggleUserStatus = async (id: string) => {
    const target = users.find((u) => u.id === id);
    if (!target) return;
    const nextStatus = target.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    try {
      await api.patch(`/users/${id}/status`, { status: nextStatus, isActive: nextStatus === "ACTIVE" });
      setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, status: nextStatus } : u)));
      setNotice(null);
    } catch (err) {
      setNotice(
        isEndpointMissing(err)
          ? "Activate/Deactivate is unavailable: PATCH /users/:id/status is not implemented on the backend yet."
          : apiErrorMessage(err, "Failed to update user status.")
      );
    }
  };
  const filteredUsers = users.filter((u) => {
    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = selectedRole === "ALL" || u.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const roleBadges: Record<string, string> = {
    STUDENT: "bg-sky-50 text-sky-700 border-sky-200",
    HR: "bg-blue-50 text-blue-700 border-blue-200",
    ALUMNI: "bg-emerald-50 text-emerald-700 border-emerald-200",
    ADMIN: "bg-rose-50 text-rose-700 border-rose-200",
  };

  return (
    <div className="h-full flex flex-col overflow-hidden max-w-7xl mx-auto w-full">
      <div className="shrink-0 space-y-4 pb-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Manage Users</h1>
            <p className="text-xs text-slate-500">Monitor accounts, manage roles, and handle account status</p>
          </div>
          <button className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold rounded-xl transition flex items-center gap-2 self-start md:self-auto">
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
                  selectedRole === role ? "bg-blue-800 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="shrink-0 empty:hidden pb-4">
        <AdminNotice message={notice} />
      </div>

      {/* Scrollable content: only this box scrolls */}
      <div className="flex-1 min-h-0 overflow-y-auto pb-6">
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
                  <td colSpan={5} className="py-8 text-center text-slate-400">{loading ? "Loading users..." : "No users found matching filter criteria."}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </div>
  );
}