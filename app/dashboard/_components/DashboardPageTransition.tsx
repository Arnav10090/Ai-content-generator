"use client";

import { usePathname } from "next/navigation";
import React from "react";

export default function DashboardPageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div
      key={pathname}
      className="min-h-full animate-[dashboard-page-in_180ms_ease-out] will-change-transform"
    >
      {children}
    </div>
  );
}
