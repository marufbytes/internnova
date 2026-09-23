"use client";

import React from "react";
import { Download, Users, Building2, Briefcase, FileCheck, Scale, Award, RefreshCw } from "lucide-react";
import { AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Static Mock Data for Instant Preview
const STATIC_TREND_DATA = [
  { month: "Jan", users: 40 },
  { month: "Feb", users: 65 },
  { month: "Mar", users: 95 },
  { month: "Apr", users: 140 },
  { month: "May", users: 210 },
  { month: "Jun", users: 280 },
  { month: "Jul", users: 340 },
  { month: "Aug", users: 420 },
  { month: "Sep", users: 510 },
  { month: "Oct", users: 620 },
  { month: "Nov", users: 700 },
  { month: "Dec", users: 850 },
];

const STATIC_ROLE_DATA = [
  { name: "Student", value: 520, color: "#0ea5e9" },
  { name: "HR", value: 140, color: "#6366f1" },
  { name: "Admin", value: 20, color: "#f43f5e" },
  { name: "Alumni", value: 170, color: "#10b981" },
];

const STATIC_STATS = [
  { title: "Total Users", value: "850", sub: "Registered accounts", accent: "bg-sky-500", icon: Users, iconBg: "bg-sky-50 text-sky-600" },
  { title: "Total Companies", value: "48", sub: "Partner organizations", accent: "bg-emerald-500", icon: Building2, iconBg: "bg-emerald-50 text-emerald-600" },
  { title: "Total Internships", value: "132", sub: "Listing posts", accent: "bg-indigo-500", icon: Briefcase, iconBg: "bg-indigo-50 text-indigo-600" },
  { title: "Total Applications", value: "1,240", sub: "Candidate submissions", accent: "bg-purple-500", icon: FileCheck, iconBg: "bg-purple-50 text-purple-600" },
  { title: "Company : Student Ratio", value: "1 : 11", sub: "Per company reach", accent: "bg-cyan-500", icon: Scale, iconBg: "bg-cyan-50 text-cyan-600" },
  { title: "Alumni : Student Ratio", value: "1 : 3", sub: "Mentor-to-peer index", accent: "bg-amber-500", icon: Award, iconBg: "bg-amber-50 text-amber-600" },
];

export default function AdminDashboardHome() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto w-full">
      {/* Top Banner */}
      <div className="relative bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 p-8 rounded-3xl shadow-md text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6 overflow-hidden border border-slate-800">
        <div className="space-y-2 z-10">
          <span className="px-3 py-1 bg-sky-500/20 text-sky-300 text-xs font-bold rounded-lg backdrop-blur-md border border-sky-500/30">ADMIN DASHBOARD</span>
          <h1 className="text-3xl font-black tracking-tight">Platform Control Center</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">Real-time analytics, user distribution, and ecosystem ratios for platform administration.</p>
        </div>
        <div className="flex items-center gap-3 z-10 w-full sm:w-auto">
          <button className="p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl transition backdrop-blur-md border border-white/10 shrink-0" title="Refresh Data">
            <RefreshCw className="w-4 h-4" />
          </button>
          <button className="px-4 py-2.5 bg-sky-500 hover:bg-sky-600 text-white text-xs font-semibold rounded-xl transition flex items-center justify-center gap-2 shadow-sm w-full sm:w-auto">
            <Download className="w-3.5 h-3.5" /> Export Analytics
          </button>
        </div>
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {STATIC_STATS.map((stat, idx) => {
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
            <span className="px-2.5 py-1 bg-slate-100 text-slate-600 font-mono text-[11px] font-bold rounded-lg">Total: 850</span>
          </div>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={STATIC_TREND_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
                <Pie data={STATIC_ROLE_DATA} innerRadius={55} outerRadius={75} paddingAngle={5} dataKey="value" stroke="none">
                  {STATIC_ROLE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderColor: "#1e293b", borderRadius: "10px", color: "#fff", fontSize: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 pt-4 border-t border-slate-100 max-h-[120px] overflow-y-auto">
            {STATIC_ROLE_DATA.map((item, idx) => (
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