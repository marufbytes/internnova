'use client';

import RoleNavbar from './RoleNavbar';

interface AlumniNavbarProps {
  isCollapsed: boolean;
  onToggleSidebar: () => void;
}

export default function AlumniNavbar(props: AlumniNavbarProps) {
  return (
    <RoleNavbar
      {...props}
      homeHref="/alumni-dashboard"
      roleLabel="Alumni Mentor"
      fallbackName="Alumni"
    />
  );
}
