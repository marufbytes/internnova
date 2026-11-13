'use client';

import { LayoutDashboard, UserCheck, Users, Building2, Briefcase, FileText, User } from 'lucide-react';
import RoleSidebar from './RoleSidebar';

const items = [
  { name: 'Dashboard', href: '/admin-dashboard', icon: LayoutDashboard },
  { name: 'HR Approval', href: '/admin-hr-approval', icon: UserCheck },
  { name: 'Users', href: '/admin-users', icon: Users },
  { name: 'Companies', href: '/admin-companies', icon: Building2 },
  { name: 'Internships', href: '/admin-internships', icon: Briefcase },
  { name: 'Applications', href: '/admin-applications', icon: FileText },
  { name: 'Profile', href: '/admin-profile', icon: User },
];

export default function AdminSidebar({ isCollapsed }: { isCollapsed: boolean }) {
  return <RoleSidebar isCollapsed={isCollapsed} items={items} />;
}
