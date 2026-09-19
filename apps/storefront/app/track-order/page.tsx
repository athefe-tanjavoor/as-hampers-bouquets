"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Package, Truck, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { BRAND_CONFIG, ORDER_STATUSES } from "@repo/config";
import { formatCurrency } from "@repo/utils";
import { Breadcrumbs } from "@repo/ui";
import { api } from "../../lib/api";

export default function TrackOrderPage() {
  const searchParams = useSearchParams();
  const initialOrderNumber = searchParams.get("orderNumber") || "";
  const initialContact = searchParams.get("contact") || "";

  const [orderNumber, setOrderNumber] = useState(initialOrderNumber);
  const [contact, setContact] = useState(initialContact);
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTrack = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!orderNumber || !contact) {
      setError("Please provide both Order Number and Phone/Email.");
      return;
    }

    setLoading(true);
    setError("");
    setOrder(null);

    const data = await api.trackOrder(orderNumber.trim(), contact.trim());
    setLoading(false);

    if (data) {
      setOrder(data);
    } else {
      setError("We couldn't find an order matching those details. Please check your order number and contact details.");
    }
  };

  useEffect(() => {
    if (initialOrderNumber && initialContact) {
      handleTrack();
    }
  }, [initialOrderNumber, initialContact]);

  const stages = [
    { key: "CONFIRMED", label: "Order Confirmed" },
    { key: "PROCESSING", label: "Preparing" },
    { key: "PACKED", label: "Packed" },
    { key: "DISPATCHED", label: "Dispatched" },
    { key: "OUT_FOR_DELIVERY", label: "Out for Delivery" },
    { key: "DELIVERED", label: "Delivered" }
  ];

  const getStageStatus = (stageKey: string) => {
    if (!order) return "pending";
    const statusOrder = [
      "PENDING_PAYMENT",
      "CONFIRMED",
      "PROCESSING",
      "PACKED",
      "DISPATCHED",
      "OUT_FOR_DELIVERY",
      "DELIVERED"
    ];
    const currentIndex = statusOrder.indexOf(order.status);
    const targetIndex = statusOrder.indexOf(stageKey);

    if (currentIndex >= targetIndex) return "completed";
    return "upcoming";
  };

  return (
    <div className="bg-[#FFF9F5] min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumbs items={[{ label: "Track Order", href: "/track-order" }]} />

        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-widest text-[#C94F78] font-bold block">
            Live Delivery Updates
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#3B2A2A]">
            Track Your Order
          </h1>
          <p className="text-xs sm:text-sm text-[#7A6868] max-w-md mx-auto">
            Enter your order details below to check the latest available status of your delivery.
          </p>
        </div>

        {/* Tracking Search Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EEDCDA] shadow-sm">
          <form onSubmit={handleTrack} className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
            <div className="sm:col-span-5">
              <label className="block text-xs font-semibold text-[#3B2A2A] mb-1">
                Order Number *
              </label>
              <input
                type="text"
                required
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="e.g. BB-20260919-4821"
                className="w-full px-4 py-2.5 rounded-xl border border-[#EEDCDA] bg-[#FFF9F5] text-xs font-mono uppercase focus:outline-none focus:border-[#C94F78]"
              />
            </div>

            <div className="sm:col-span-5">
              <label className="block text-xs font-semibold text-[#3B2A2A] mb-1">
                Phone Number or Email *
              </label>
              <input
                type="text"
                required
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="e.g. 9876543210 or email"
                className="w-full px-4 py-2.5 rounded-xl border border-[#EEDCDA] bg-[#FFF9F5] text-xs focus:outline-none focus:border-[#C94F78]"
              />
            </div>

            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 rounded-xl bg-[#C94F78] hover:bg-[#8E294D] text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1 shadow-sm"
              >
                <Search className="w-3.5 h-3.5" />
                <span>{loading ? "..." : "Track"}</span>
              </button>
            </div>
          </form>

          {error && (
            <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Order Status Timeline Result */}
        {order && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EEDCDA] shadow-md space-y-8 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-6 border-b border-[#EEDCDA] gap-4">
              <div>
                <span className="text-[11px] font-mono text-gray-400 block uppercase">Order ID</span>
                <span className="font-serif text-xl font-bold text-[#8E294D]">#{order.orderNumber}</span>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-gray-400 block">Current Status</span>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-[#FCEEF2] text-[#C94F78] border border-[#F8E1E8]">
                  {order.status.replace(/_/g, " ")}
                </span>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div className="py-4">
              <div className="grid grid-cols-2 sm:grid-cols-6 gap-4">
                {stages.map((st, idx) => {
                  const state = getStageStatus(st.key);
                  return (
                    <div key={st.key} className="flex flex-col items-center text-center space-y-2">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                          state === "completed"
                            ? "bg-[#C94F78] text-white shadow-md"
                            : "bg-gray-100 text-gray-400 border border-gray-200"
                        }`}
                      >
                        {state === "completed" ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                      </div>
                      <span
                        className={`text-xs font-semibold ${
                          state === "completed" ? "text-[#3B2A2A]" : "text-gray-400"
                        }`}
                      >
                        {st.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Order Items & Destination */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-[#EEDCDA] text-xs">
              <div className="space-y-2">
                <h3 className="font-serif text-sm font-bold text-[#3B2A2A]">Delivery Destination</h3>
                <p className="text-[#7A6868] leading-relaxed">
                  {order.shippingAddress?.name}<br />
                  {order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pincode}
                </p>
                <div className="text-[#8E294D] font-medium pt-1">
                  Scheduled Slot: {order.deliverySlot?.slotName} ({order.deliverySlot?.date})
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-sm font-bold text-[#3B2A2A]">Order Summary</h3>
                <div className="space-y-1 text-[#7A6868]">
                  {order.items?.map((item: any, i: number) => (
                    <div key={i} className="flex justify-between">
                      <span>{item.name} x {item.quantity}</span>
                      <span className="font-semibold text-[#3B2A2A]">{formatCurrency(item.price * item.quantity)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between font-bold text-[#3B2A2A] pt-2 border-t border-gray-100 text-sm">
                    <span>Total Paid:</span>
                    <span className="font-serif text-[#8E294D]">{formatCurrency(order.pricing?.total)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
