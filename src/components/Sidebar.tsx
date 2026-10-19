"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import {
  LayoutDashboard,
  Building2,
  Briefcase,
  FileText,
  Calendar,
  Settings,
  LogOut,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  applicationCount?: number;
}

export default function HrSidebar({
  isOpen,
  onClose,
  applicationCount,
}: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [hrProfile, setHrProfile] = useState({
    name: "Loading...",
    role: "HR Manager",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/users/me", {
          withCredentials: true,
        });

        if (data) {
          setHrProfile({
            name:
              data.name ||
              data.fullName ||
              data.username ||
              "HR Manager",
            role: data.designation || data.role || "HR Manager",
          });
        }
      } catch (err) {
        console.error("Sidebar profile fetch error:", err);
        setHrProfile({ name: "HR Manager", role: "HR Manager" });
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/auth/logout",
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      router.push("/auth/login");
    }
  };

  const navItems = [
    { name: "Dashboard", href: "/hr-dashboard", icon: LayoutDashboard },
    { name: "Company Profile", href: "/hr-company", icon: Building2 },
    { name: "Internships", href: "/hr-internships", icon: Briefcase },
    {
      name: "Applications",
      href: "/hr-applications",
      icon: FileText,
      badge: applicationCount,
    },
    { name: "Interviews", href: "/hr-interviews", icon: Calendar },
    { name: "Settings", href: "/hr-settings", icon: Settings },
  ];

  const avatarLetter = hrProfile.name
    ? hrProfile.name.charAt(0).toUpperCase()
    : "H";

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/35 backdrop-blur-xs z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-16 left-0 bottom-0 bg-white border-r border-slate-200/90 z-40 transition-all duration-300 ease-in-out flex flex-col justify-between py-3 ${
          isOpen ? "w-64" : "w-20"
        } ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <nav className="flex-1 space-y-1.5 overflow-y-auto px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group relative flex items-center gap-3.5 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-[#EFEFEE] text-slate-900 font-bold shadow-2xs"
                    : "text-slate-700 hover:bg-slate-200/70 hover:text-slate-950 hover:translate-x-1"
                }`}
                title={!isOpen ? item.name : undefined}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-7 w-1 bg-slate-900 rounded-r-md" />
                )}

                <Icon
                  className={`w-5 h-5 shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                    isActive
                      ? "text-slate-900"
                      : "text-slate-500 group-hover:text-slate-950"
                  }`}
                />

                {isOpen && (
                  <span className="flex-1 tracking-tight text-[15px] whitespace-nowrap overflow-hidden transition-all duration-200">
                    {item.name}
                  </span>
                )}

                {isOpen && item.badge !== undefined && item.badge > 0 && (
                  <span className="bg-slate-100 text-slate-700 text-xs font-bold px-2 py-0.5 rounded-full shrink-0 group-hover:bg-white transition-colors">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div
          className={`p-3 mx-3 mb-2 bg-[#F8FAFC] border border-slate-200/70 rounded-2xl flex items-center transition-all duration-300 hover:border-slate-400 hover:bg-slate-100 hover:shadow-xs ${
            isOpen ? "justify-between" : "justify-center"
          }`}
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative shrink-0">
              <div className="w-10 h-10 rounded-full bg-[#1E293B] text-white font-bold flex items-center justify-center text-sm uppercase shadow-xs transition-transform duration-200 hover:scale-105">
                {avatarLetter}
              </div>
              <span className="w-3 h-3 bg-emerald-500 rounded-full absolute bottom-0 right-0 border-2 border-white" />
            </div>

            {isOpen && (
              <div className="min-w-0 flex-1 overflow-hidden transition-all duration-200">
                <h4 className="text-sm font-bold text-slate-900 truncate leading-tight">
                  {hrProfile.name}
                </h4>
                <p className="text-xs font-medium text-slate-500 truncate mt-0.5">
                  {hrProfile.role}
                </p>
              </div>
            )}
          </div>

          {isOpen && (
            <button
              onClick={handleLogout}
              className="p-1.5 rounded-xl text-red-500 hover:text-red-700 hover:bg-red-50 transition-all duration-200 shrink-0"
              title="Logout"
              aria-label="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </aside>
    </>
  );
}
