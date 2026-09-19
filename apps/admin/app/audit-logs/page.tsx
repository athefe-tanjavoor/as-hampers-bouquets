"use client";

import React, { useState } from "react";
import { History, Shield, Filter, Search, UserCheck, RefreshCw, Clock } from "lucide-react";

interface AuditEntry {
  id: string;
  actor: string;
  action: string;
  resource: string;
  resourceId: string;
  details: string;
  ipAddress: string;
  timestamp: string;
  severity: "INFO" | "WARNING" | "CRITICAL";
}

const INITIAL_LOGS: AuditEntry[] = [
  {
    id: "log-1",
    actor: "Admin (Elena Vance)",
    action: "ORDER_STATUS_CHANGED",
    resource: "Order",
    resourceId: "BB-2026-9812",
    details: "Changed status from OUT_FOR_DELIVERY to DELIVERED. Proof of delivery: Customer signature uploaded.",
    ipAddress: "103.21.14.88",
    timestamp: "2026-09-19 15:42:10",
    severity: "INFO"
  },
  {
    id: "log-2",
    actor: "Inventory Manager (Rajesh K.)",
    action: "STOCK_ADJUSTMENT",
    resource: "Product",
    resourceId: "FLW-ROS-001",
    details: "Restocked fresh Dutch crimson roses from 4 to 24 units. Supplier: Nilgiri Flower Farm batch #402.",
    ipAddress: "103.21.14.92",
    timestamp: "2026-09-19 14:15:00",
    severity: "INFO"
  },
  {
    id: "log-3",
    actor: "System Automation",
    action: "RAZORPAY_WEBHOOK_VERIFIED",
    resource: "Payment",
    resourceId: "pay_OrZkX82h41q",
    details: "HMAC SHA-256 signature verified. Order BB-2026-9812 marked PAID. Total: ₹2,499.",
    ipAddress: "razorpay-webhook.internal",
    timestamp: "2026-09-19 12:30:22",
    severity: "INFO"
  },
  {
    id: "log-4",
    actor: "Admin (Elena Vance)",
    action: "COUPON_CREATED",
    resource: "Coupon",
    resourceId: "FESTIVE200",
    details: "Created flat ₹200 discount coupon for hampers above ₹1,499 with 200 usage cap.",
    ipAddress: "103.21.14.88",
    timestamp: "2026-09-19 10:11:05",
    severity: "INFO"
  },
  {
    id: "log-5",
    actor: "Security Engine",
    action: "FAILED_LOGIN_ATTEMPT",
    resource: "Admin Portal",
    resourceId: "auth/login",
    details: "Invalid password attempt for account admin@bloomandblossom.com. Rate limit counter incremented.",
    ipAddress: "45.134.22.10",
    timestamp: "2026-09-19 04:12:33",
    severity: "WARNING"
  },
  {
    id: "log-6",
    actor: "Admin (Elena Vance)",
    action: "REVIEW_APPROVED",
    resource: "Review",
    resourceId: "rev-1",
    details: "Approved 5-star customer review for Velvet Crimson Rose Bouquet from verified buyer Priya Sundaram.",
    ipAddress: "103.21.14.88",
    timestamp: "2026-09-18 18:05:40",
    severity: "INFO"
  }
];

export default function AuditLogsAdminPage() {
  const [logs, setLogs] = useState<AuditEntry[]>(INITIAL_LOGS);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSeverity, setFilterSeverity] = useState<string>("ALL");

  const filtered = logs.filter((log) => {
    const matchesSearch =
      log.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.resourceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;
    if (filterSeverity === "ALL") return true;
    return log.severity === filterSeverity;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-[#3B2A2A]">System Audit & Activity Logs</h1>
          <p className="text-sm text-slate-500 mt-1">
            Immutable trace of administrative actions, status changes, inventory overrides, and security events.
          </p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search logs by actor, action, resource ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C94F78]"
          />
        </div>

        <div className="flex gap-2">
          {["ALL", "INFO", "WARNING", "CRITICAL"].map((sev) => (
            <button
              key={sev}
              onClick={() => setFilterSeverity(sev)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filterSeverity === sev
                  ? "bg-[#C94F78] text-white shadow-sm"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Log Feed */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="divide-y divide-slate-100">
          {filtered.map((log) => (
            <div key={log.id} className="p-5 flex flex-col md:flex-row md:items-start justify-between gap-4 hover:bg-slate-50/60 transition-colors">
              <div className="flex items-start gap-3.5">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    log.severity === "CRITICAL"
                      ? "bg-red-50 text-red-600"
                      : log.severity === "WARNING"
                      ? "bg-amber-50 text-amber-600"
                      : "bg-[#FCEEF2] text-[#C94F78]"
                  }`}
                >
                  <History className="w-4 h-4" />
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-slate-900 text-sm">{log.action}</span>
                    <span className="text-slate-400 text-xs">•</span>
                    <span className="text-xs text-slate-600 font-medium">{log.resource} ({log.resourceId})</span>
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                        log.severity === "CRITICAL"
                          ? "bg-red-100 text-red-800"
                          : log.severity === "WARNING"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {log.severity}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">{log.details}</p>

                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 pt-1">
                    <span className="font-medium text-slate-500">By: {log.actor}</span>
                    <span>•</span>
                    <span>IP: {log.ipAddress}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono flex-shrink-0 md:text-right">
                <Clock className="w-3.5 h-3.5" />
                <span>{log.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
