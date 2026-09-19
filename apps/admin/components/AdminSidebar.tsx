"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingBag,
  Boxes,
  Truck,
  TicketPercent,
  Star,
  Home,
  BookOpen,
  Search,
  History,
  ExternalLink,
  LogOut
} from "lucide-react";
import { BRAND_CONFIG } from "@repo/config";

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();

  const menuItems = [
    { label: "Dashboard", href: "/", icon: LayoutDashboard },
    { label: "Products", href: "/products", icon: Package },
    { label: "Categories", href: "/categories", icon: FolderTree },
    { label: "Orders & Fulfillment", href: "/orders", icon: ShoppingBag },
    { label: "Inventory", href: "/inventory", icon: Boxes },
    { label: "Delivery & Slots", href: "/delivery", icon: Truck },
    { label: "Coupons", href: "/coupons", icon: TicketPercent },
    { label: "Review Moderation", href: "/reviews", icon: Star },
    { label: "Homepage CMS", href: "/homepage", icon: Home },
    { label: "Blog Journal", href: "/blog", icon: BookOpen },
    { label: "SEO Manager", href: "/seo", icon: Search },
    { label: "Audit Logs", href: "/audit-logs", icon: History }
  ];

  return (
    <aside className="w-64 bg-[#3B2A2A] text-white flex flex-col justify-between h-screen sticky top-0 flex-shrink-0 z-30">
      <div>
        {/* Brand Header */}
        <div className="p-6 border-b border-gray-700/60">
          <span className="font-serif text-xl font-bold text-[#F8E1E8] block">
            {BRAND_CONFIG.name}
          </span>
          <span className="text-[10px] tracking-widest text-[#C94F78] uppercase font-bold">
            Admin Portal & CMS
          </span>
        </div>

        {/* Navigation links */}
        <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-160px)]">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? "bg-[#C94F78] text-white shadow-md font-semibold"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer link to Storefront */}
      <div className="p-4 border-t border-gray-700/60 space-y-2 text-xs">
        <a
          href="http://localhost:3000"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
        >
          <span>View Storefront</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </aside>
  );
};
