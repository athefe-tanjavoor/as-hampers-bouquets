"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  ShoppingBag,
  Clock,
  Truck,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Eye
} from "lucide-react";
import { formatCurrency } from "@repo/utils";

export default function AdminDashboardPage() {
  const [metrics, setMetrics] = useState<any>({
    totalRevenue: 184500,
    totalOrders: 142,
    todayOrders: 18,
    pendingOrders: 3,
    processingOrders: 7,
    outForDeliveryOrders: 5,
    deliveredOrders: 127,
    lowStockCount: 2
  });

  const [recentOrders, setRecentOrders] = useState<any[]>([
    {
      _id: "1",
      orderNumber: "BB-20260919-4821",
      customerDetails: { name: "Ananya Sharma", email: "ananya@example.com" },
      pricing: { total: 1499 },
      orderStatus: "PROCESSING",
      paymentStatus: "PAID",
      deliverySlot: { slotName: "Evening Slot", date: "2026-09-19" },
      createdAt: new Date().toISOString()
    },
    {
      _id: "2",
      orderNumber: "BB-20260919-3910",
      customerDetails: { name: "Rohan Verma", email: "rohan@example.com" },
      pricing: { total: 2499 },
      orderStatus: "OUT_FOR_DELIVERY",
      paymentStatus: "PAID",
      deliverySlot: { slotName: "Afternoon Slot", date: "2026-09-19" },
      createdAt: new Date().toISOString()
    },
    {
      _id: "3",
      orderNumber: "BB-20260918-9120",
      customerDetails: { name: "Karthik Raja", email: "karthik@example.com" },
      pricing: { total: 999 },
      orderStatus: "DELIVERED",
      paymentStatus: "PAID",
      deliverySlot: { slotName: "Morning Slot", date: "2026-09-18" },
      createdAt: new Date(Date.now() - 86400000).toISOString()
    }
  ]);

  const [lowStock, setLowStock] = useState<any[]>([
    { name: "Royal Crimson Rose & Orchid Garland", stock: 3, sku: "WEDD-GARL-005", price: 3499 },
    { name: "Opulent Celebration Hamper", stock: 4, sku: "HAMP-OPUL-002", price: 2499 }
  ]);

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/admin/dashboard/metrics")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          if (json.data.metrics) setMetrics(json.data.metrics);
          if (json.data.recentOrders?.length) setRecentOrders(json.data.recentOrders);
          if (json.data.lowStockProducts?.length) setLowStock(json.data.lowStockProducts);
        }
      })
      .catch((e) => console.log("Using initial admin metrics."));
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#3B2A2A]">
            Commerce Overview
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time fulfillment metrics, revenue tracking, and inventory status.
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/orders"
            className="px-4 py-2 bg-[#C94F78] hover:bg-[#8E294D] text-white text-xs font-semibold rounded-xl transition-colors shadow-sm"
          >
            Manage Orders &rarr;
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Total Revenue</span>
            <TrendingUp className="w-4 h-4 text-green-600" />
          </div>
          <div className="font-serif text-2xl font-bold text-[#3B2A2A]">
            {formatCurrency(metrics.totalRevenue)}
          </div>
          <span className="text-[11px] text-green-600 font-medium">↑ 14% vs last week</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Total Orders</span>
            <ShoppingBag className="w-4 h-4 text-[#C94F78]" />
          </div>
          <div className="font-serif text-2xl font-bold text-[#3B2A2A]">
            {metrics.totalOrders}
          </div>
          <span className="text-[11px] text-slate-500">{metrics.todayOrders} placed today</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>In Fulfillment Pipeline</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="font-serif text-2xl font-bold text-[#3B2A2A]">
            {metrics.processingOrders + metrics.outForDeliveryOrders}
          </div>
          <span className="text-[11px] text-amber-600 font-medium">
            {metrics.outForDeliveryOrders} out for delivery now
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Low Stock Alerts</span>
            <AlertTriangle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="font-serif text-2xl font-bold text-rose-600">
            {metrics.lowStockCount || lowStock.length}
          </div>
          <Link href="/inventory" className="text-[11px] text-[#C94F78] hover:underline font-semibold block">
            Review inventory &rarr;
          </Link>
        </div>
      </div>

      {/* Orders Table & Low Stock Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Recent Orders Table */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-serif text-base font-bold text-[#3B2A2A]">
              Recent Orders
            </h2>
            <Link href="/orders" className="text-xs font-semibold text-[#C94F78] hover:underline">
              View all
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-400 font-semibold border-b border-slate-100">
                <tr>
                  <th className="p-3.5 pl-5">Order #</th>
                  <th className="p-3.5">Customer</th>
                  <th className="p-3.5">Total</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Slot</th>
                  <th className="p-3.5 text-right pr-5">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentOrders.map((ord) => (
                  <tr key={ord._id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-3.5 pl-5 font-mono font-bold text-[#8E294D]">
                      {ord.orderNumber}
                    </td>
                    <td className="p-3.5">
                      <div className="font-medium text-[#3B2A2A]">{ord.customerDetails?.name}</div>
                      <div className="text-[11px] text-slate-400">{ord.customerDetails?.email}</div>
                    </td>
                    <td className="p-3.5 font-semibold text-[#3B2A2A]">
                      {formatCurrency(ord.pricing?.total)}
                    </td>
                    <td className="p-3.5">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#FCEEF2] text-[#C94F78]">
                        {ord.orderStatus}
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-500">
                      {ord.deliverySlot?.slotName || "Standard"}
                    </td>
                    <td className="p-3.5 text-right pr-5">
                      <Link
                        href={`/orders`}
                        className="p-1.5 inline-block text-slate-400 hover:text-[#C94F78]"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Alerts Box */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="font-serif text-base font-bold text-[#3B2A2A] flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-500" />
              <span>Low Stock Alerts</span>
            </h2>
            <Link href="/inventory" className="text-xs text-[#C94F78] font-semibold hover:underline">
              Inventory
            </Link>
          </div>

          <div className="space-y-3">
            {lowStock.map((prod, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-[#3B2A2A] line-clamp-1">{prod.name}</div>
                  <div className="text-[11px] text-slate-400 font-mono">SKU: {prod.sku}</div>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-rose-100 text-rose-700">
                    {prod.stock} left
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
