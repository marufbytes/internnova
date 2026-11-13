'use client';

import RoleNavbar from './RoleNavbar';

interface AdminNavbarProps {
  isCollapsed: boolean;
  onToggleSidebar: () => void;
}

export default function AdminNavbar(props: AdminNavbarProps) {
  return (
    <RoleNavbar
      {...props}
      homeHref="/admin-dashboard"
      roleLabel="Administrator"
      fallbackName="System Admin"
    />
  );
}
