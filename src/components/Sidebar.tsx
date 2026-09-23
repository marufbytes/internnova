"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Calendar,
  Building2,
  UserCheck,
  User,
  FileCheck2,
  Settings,
  LogOut,
} from "lucide-react";

interface SidebarProps {
  role?: "STUDENT" | "HR" | "ALUMNI" | "ADMIN";
}

export default function Sidebar({ role = "STUDENT" }: SidebarProps) {
  const pathname = usePathname();

  const menuItems = {
    STUDENT: [
      { label: "Dashboard", href: "/student/dashboard", icon: LayoutDashboard },
      { label: "Internships", href: "/student/internship", icon: Briefcase },
      { label: "Applications", href: "/student/applications", icon: FileText },
      { label: "Interviews", href: "/student/interviews", icon: Calendar },
      { label: "Resumes", href: "/student/resumes", icon: FileCheck2 },
      { label: "Referrals", href: "/student/referrals", icon: UserCheck },
      { label: "Profile", href: "/student/profile", icon: User },
    ],
    HR: [
      { label: "Dashboard", href: "/hr/dashboard", icon: LayoutDashboard },
      { label: "Company Profile", href: "/hr/company-profile", icon: Building2 },
      { label: "Post Internship", href: "/hr/post-internship", icon: Briefcase },
      { label: "Internships", href: "/hr/internships", icon: Briefcase },
      { label: "Applications", href: "/hr/applications", icon: FileText },
      { label: "Interviews", href: "/hr/interviews", icon: Calendar },
    ],
    ALUMNI: [
      { label: "Dashboard", href: "/alumni/dashboard", icon: LayoutDashboard },
      { label: "Referral Requests", href: "/alumni/referrals", icon: UserCheck },
      { label: "Post Internship", href: "/alumni/post-internship", icon: Briefcase },
      { label: "Profile", href: "/alumni/profile", icon: User },
    ],
    ADMIN: [
      { label: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
      { label: "Manage Users", href: "/admin/users", icon: User },
      { label: "Approve HRs", href: "/admin/hr-approval", icon: UserCheck },
      { label: "Companies", href: "/admin/companies", icon: Building2 },
      { label: "Internships", href: "/admin/internships", icon: Briefcase },
      { label: "Applications", href: "/admin/applications", icon: FileText },
    ],
  };

  const navItems = menuItems[role] || menuItems.STUDENT;
  const settingsHref = role === "HR" ? "/hr/company-profile" : `/${role.toLowerCase()}/profile`;

  return (
    <aside className="w-16 md:w-64 bg-white border-r border-slate-100 sticky top-[61px] h-[calc(100vh-61px)] p-2 md:p-4 flex flex-col justify-between shrink-0 transition-all duration-200">
      <nav className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== `/${role.toLowerCase()}/dashboard` && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              title={item.label}
              className={`flex items-center justify-center md:justify-start space-x-0 md:space-x-3 px-3 md:px-4 py-2.5 rounded-xl text-sm font-medium transition ${
                isActive
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
              }`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span className="hidden md:inline">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="pt-4 border-t border-slate-100 space-y-1">
        <Link
          href={settingsHref}
          title="Settings"
          className="flex items-center justify-center md:justify-start space-x-0 md:space-x-3 px-3 md:px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition"
        >
          <Settings className="w-5 h-5 shrink-0" />
          <span className="hidden md:inline">Settings</span>
        </Link>
        <Link
          href="/auth/login"
          title="Log Out"
          className="flex items-center justify-center md:justify-start space-x-0 md:space-x-3 px-3 md:px-4 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          <span className="hidden md:inline">Log Out</span>
        </Link>
      </div>
    </aside>
  );
}