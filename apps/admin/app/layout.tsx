import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { AdminSidebar } from "../components/AdminSidebar";

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
    <html lang="en">
      <body className="flex min-h-screen bg-slate-50 text-slate-900">
        <AdminSidebar />
        <main className="flex-1 p-6 sm:p-10 overflow-y-auto max-w-7xl">
          {children}
        </main>
      </body>
    </html>
  );
}
