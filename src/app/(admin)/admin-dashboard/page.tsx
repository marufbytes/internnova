"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Download, Users, Building2, Briefcase, FileCheck, Scale, Award, RefreshCw } from "lucide-react";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import api from "@/lib/api";
import { extractList } from "@/lib/adminData";
import AdminNotice from "@/components/admin/AdminNotice";
import { AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const ROLE_COLORS: Record<string, string> = {
  STUDENT: "#0ea5e9",
  HR: "#6366f1",
  ADMIN: "#f43f5e",
  ALUMNI: "#10b981",
};

const EMPTY_TREND = MONTHS.map((month) => ({ month, users: 0 }));
const EMPTY_ROLES = [{ name: "No data", value: 1, color: "#e2e8f0" }];

const formatRatio = (numA: number, numB: number) =>
  numA === 0 || numB === 0 ? "0 : 0" : `1 : ${Math.round(numA / numB)}`;

export default function AdminDashboardHome() {
  const dashboardRef = useRef<HTMLDivElement>(null);
  const [trendData, setTrendData] = useState<{ month: string; users: number }[]>(EMPTY_TREND);
  const [roleData, setRoleData] = useState<{ name: string; value: number; color: string }[]>(EMPTY_ROLES);
  const [totals, setTotals] = useState({ users: 0, companies: 0, internships: 0, applications: 0 });
  const [loading, setLoading] = useState(true);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);

  const loadDashboardData = useCallback(async () => {
    setLoading(true);
    const missing: string[] = [];

    const [usersRes, compRes, interRes, appRes] = await Promise.allSettled([
      api.get("/users"),
      api.get("/company"),
      api.get("/internship"),
      api.get("/application"),
    ]);

    const next = { users: 0, companies: 0, internships: 0, applications: 0 };

    if (usersRes.status === "fulfilled") {
      const usersList = extractList<any>(usersRes.value.data, "users");
      next.users = usersList.length;

      const monthMap: Record<string, number> = {};
      MONTHS.forEach((m) => (monthMap[m] = 0));
      usersList.forEach((u) => {
        if (u.createdAt) {
          const m = MONTHS[new Date(u.createdAt).getMonth()];
          if (m) monthMap[m]++;
        }
      });
      setTrendData(MONTHS.map((month) => ({ month, users: monthMap[month] })));

      const roleMap: Record<string, number> = {};
      usersList.forEach((u) => {
        const r = String(u.role || "OTHER").toUpperCase();
        roleMap[r] = (roleMap[r] || 0) + 1;
      });
      const formatted = Object.entries(roleMap).map(([role, value]) => ({
        name: role.charAt(0) + role.slice(1).toLowerCase(),
        value,
        color: ROLE_COLORS[role] || "#94a3b8",
      }));
      setRoleData(formatted.length ? formatted : EMPTY_ROLES);
    } else {
      missing.push("GET /users");
    }

    if (compRes.status === "fulfilled") next.companies = extractList(compRes.value.data, "companies").length;
    else missing.push("GET /company");

    if (interRes.status === "fulfilled") next.internships = extractList(interRes.value.data, "internships").length;
    else missing.push("GET /internship");

    if (appRes.status === "fulfilled") next.applications = extractList(appRes.value.data, "applications").length;
    else missing.push("GET /application");

    setTotals(next);
    setWarnings(missing);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  const studentCount = roleData.find((r) => r.name.toLowerCase() === "student")?.value || 0;
  const alumniCount = roleData.find((r) => r.name.toLowerCase() === "alumni")?.value || 0;
  const display = (n: number) => (loading ? "..." : n.toLocaleString());

  const exportPDF = async () => {
    if (!dashboardRef.current || exporting) return;
    setExporting(true);
    setExportError(null);
    try {
      const image = await toPng(dashboardRef.current, {
        cacheBust: true,
        backgroundColor: "#ffffff",
        filter: (node) => !(node instanceof HTMLElement && node.dataset.exportIgnore === "true"),
      });
      const pdf = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4", compress: true });
      const margin = 28;
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const contentWidth = pageWidth - margin * 2;
      const contentHeight = pageHeight - margin * 2;
      const imageDimensions = await new Promise<{ width: number; height: number }>((resolve, reject) => {
        const imageElement = new Image();
        imageElement.onload = () => resolve({ width: imageElement.naturalWidth, height: imageElement.naturalHeight });
        imageElement.onerror = () => reject(new Error("Could not read generated dashboard image."));
        imageElement.src = image;
      });
      const imageHeight = imageDimensions.height * contentWidth / imageDimensions.width;
      const pageCount = Math.max(1, Math.ceil(imageHeight / contentHeight));

      for (let page = 0; page < pageCount; page++) {
        if (page > 0) pdf.addPage();
        pdf.addImage(image, "PNG", margin, margin - page * contentHeight, contentWidth, imageHeight);
      }
      pdf.save("InternNova_Admin_Analytics.pdf");
    } catch (error) {
      console.error(error);
      setExportError("Analytics could not be exported. Please try again.");
    } finally {
      setExporting(false);
    }
  };

  const stats = [
    { title: "Total Users", value: display(totals.users), sub: "Registered accounts", accent: "bg-sky-500", icon: Users, iconBg: "bg-sky-50 text-sky-600" },
    { title: "Total Companies", value: display(totals.companies), sub: "Partner organizations", accent: "bg-emerald-500", icon: Building2, iconBg: "bg-emerald-50 text-emerald-600" },
    { title: "Total Internships", value: display(totals.internships), sub: "Listing posts", accent: "bg-blue-500", icon: Briefcase, iconBg: "bg-blue-50 text-blue-600" },
    { title: "Total Applications", value: display(totals.applications), sub: "Candidate submissions", accent: "bg-blue-500", icon: FileCheck, iconBg: "bg-blue-50 text-blue-600" },
    { title: "Company : Student Ratio", value: loading ? "..." : formatRatio(studentCount, totals.companies), sub: "Per company reach", accent: "bg-cyan-500", icon: Scale, iconBg: "bg-cyan-50 text-cyan-600" },
    { title: "Alumni : Student Ratio", value: loading ? "..." : formatRatio(studentCount, alumniCount), sub: "Mentor-to-peer index", accent: "bg-amber-500", icon: Award, iconBg: "bg-amber-50 text-amber-600" },
  ];
  return (
    <div ref={dashboardRef} className="space-y-8 max-w-7xl mx-auto w-full">
      {/* Top Banner */}
      <div className="relative bg-gradient-to-r from-blue-800 via-blue-700 to-blue-800 p-8 rounded-3xl shadow-md text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6 overflow-hidden border border-blue-900">
        <div className="space-y-2 z-10">
          <span className="px-3 py-1 bg-sky-500/20 text-sky-300 text-xs font-bold rounded-lg backdrop-blur-md border border-sky-500/30">ADMIN DASHBOARD</span>
          <h1 className="text-3xl font-black tracking-tight">Platform Control Center</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">Real-time analytics, user distribution, and ecosystem ratios for platform administration.</p>
        </div>
        <div data-export-ignore="true" className="flex items-center gap-3 z-10 w-full sm:w-auto">
          <button onClick={loadDashboardData} className="p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl transition backdrop-blur-md border border-white/10 shrink-0" title="Refresh Data">
            <RefreshCw className="w-4 h-4" />
          </button>
          <button onClick={() => void exportPDF()} disabled={exporting} className="px-4 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold rounded-xl transition flex items-center justify-center gap-2 shadow-sm w-full sm:w-auto disabled:cursor-wait disabled:opacity-70">
            <Download className="w-3.5 h-3.5" /> {exporting ? "Preparing PDF..." : "Export Analytics"}
          </button>
        </div>
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {exportError && <div role="alert" className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs text-rose-700">{exportError}</div>}

      <AdminNotice message={warnings.length ? `Some data could not be loaded (${warnings.join(", ")}). Showing zeros for those metrics.` : null} />

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {stats.map((stat, idx) => {
          const IconComponent = stat.icon;
          return (
            <div key={idx} className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm hover:shadow-md transition relative overflow-hidden flex flex-col justify-between h-36">
              <div className={`absolute top-0 left-0 right-0 h-1.5 ${stat.accent}`} />
              <div className="flex justify-between items-center">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.title}</p>
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${stat.iconBg}`}>
                  <IconComponent className="w-4 h-4" />
                </div>
              </div>
              <div className="flex justify-between items-baseline pt-2">
                <h3 className="text-3xl font-black text-slate-900">{stat.value}</h3>
                <span className="text-[11px] font-semibold text-slate-500 bg-slate-100/80 px-2.5 py-1 rounded-md">{stat.sub}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Registration Area Chart */}
        <div className="lg:col-span-2 bg-white border border-slate-200/80 p-6 rounded-3xl shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">Users Registration Trend</h3>
              <p className="text-xs text-slate-400">Monthly new user onboarding over time</p>
            </div>
            <span className="px-2.5 py-1 bg-slate-100 text-slate-600 font-mono text-[11px] font-bold rounded-lg">Total: {loading ? "..." : totals.users.toLocaleString()}</span>
          </div>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" stroke="#94a3b8" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} allowDecimals={false} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderColor: "#1e293b", borderRadius: "12px", color: "#fff", fontSize: "12px" }} itemStyle={{ color: "#38bdf8" }} />
                <Area type="monotone" dataKey="users" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Roles Pie Chart */}
        <div className="bg-white border border-slate-200/80 p-6 rounded-3xl shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-0.5">User Roles Category</h3>
            <p className="text-xs text-slate-400">Distribution across Students, HR, Admin & Alumni</p>
          </div>
          <div className="h-[190px] w-full flex items-center justify-center my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={roleData} innerRadius={55} outerRadius={75} paddingAngle={5} dataKey="value" stroke="none">
                  {roleData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderColor: "#1e293b", borderRadius: "10px", color: "#fff", fontSize: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 pt-4 border-t border-slate-100 max-h-[120px] overflow-y-auto">
            {roleData.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs">
                <span className="flex items-center gap-2 font-medium text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  {item.name}
                </span>
                <span className="font-bold text-slate-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
