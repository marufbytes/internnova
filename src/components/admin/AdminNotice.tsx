"use client";

import React from "react";

interface AdminNoticeProps {
  message: string | null;
  tone?: "warning" | "error";
}

/** Small inline banner used when an endpoint is missing or a request fails. */
export default function AdminNotice({ message, tone = "warning" }: AdminNoticeProps) {
  if (!message) return null;
  const styles =
    tone === "error"
      ? "bg-rose-50 border-rose-200 text-rose-700"
      : "bg-amber-50 border-amber-200 text-amber-800";
  return (
    <div className={`px-4 py-2.5 rounded-xl border text-xs font-medium ${styles}`}>{message}</div>
  );
}
