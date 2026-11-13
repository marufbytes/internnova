'use client';

import { LayoutDashboard, Briefcase, Handshake, User, List } from 'lucide-react';
import RoleSidebar from './RoleSidebar';

const items = [
  { name: 'Dashboard', href: '/alumni-dashboard', icon: LayoutDashboard },
  { name: 'Internships', href: '/alumni-internships', icon: List },
  { name: 'Post Internship', href: '/alumni-post-internship', icon: Briefcase },
  { name: 'Referrals', href: '/alumni-referrals', icon: Handshake },
  { name: 'Profile', href: '/alumni-profile', icon: User },
];

export default function AlumniSidebar({ isCollapsed }: { isCollapsed: boolean }) {
  return <RoleSidebar isCollapsed={isCollapsed} items={items} />;
}
