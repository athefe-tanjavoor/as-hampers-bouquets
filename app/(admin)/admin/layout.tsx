import React from "react";
import type { Metadata } from "next";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export const metadata: Metadata = {
  title: "Admin Dashboard | Bloom & Blossom",
  description: "Bloom & Blossom Content Management System & Commerce Operations"
};

export default function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 w-full">
      <AdminSidebar />
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto max-w-7xl w-full">
        {children}
      </main>
    </div>
  );
}
