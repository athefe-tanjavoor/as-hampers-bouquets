"use client";

import React, { useState, useEffect } from "react";
import { formatCurrency } from "@/lib/utils";
import { ORDER_STATUSES, OrderStatus, VALID_ORDER_TRANSITIONS } from "@/lib/config";
import { ShoppingBag, ArrowRight, CheckCircle, Clock, AlertCircle } from "lucide-react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([
    {
      _id: "ord-1",
      orderNumber: "BB-20260919-4821",
      customerDetails: { name: "Ananya Sharma", email: "ananya@example.com", phone: "9876543210" },
      shippingAddress: { street: "4B Floral Residency", city: "Chennai", pincode: "600001" },
      pricing: { total: 1499, subtotal: 1499, deliveryFee: 0 },
      orderStatus: "PROCESSING",
      paymentStatus: "PAID",
      paymentMethod: "RAZORPAY",
      deliverySlot: { slotName: "Evening Slot (5:00 PM - 9:00 PM)", date: "2026-09-19" },
      items: [{ name: "Blush Garden Rose Bouquet", quantity: 1, price: 1499 }],
      createdAt: new Date().toISOString()
    },
    {
      _id: "ord-2",
      orderNumber: "BB-20260919-3910",
      customerDetails: { name: "Rohan Verma", email: "rohan@example.com", phone: "9876500000" },
      shippingAddress: { street: "12 Lakeview Avenue", city: "Chennai", pincode: "600028" },
      pricing: { total: 2499, subtotal: 2499, deliveryFee: 0 },
      orderStatus: "OUT_FOR_DELIVERY",
      paymentStatus: "PAID",
      paymentMethod: "RAZORPAY",
      deliverySlot: { slotName: "Afternoon Slot", date: "2026-09-19" },
      items: [{ name: "Opulent Celebration Hamper", quantity: 1, price: 2499 }],
      createdAt: new Date().toISOString()
    }
  ]);

  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [transitionNote, setTransitionNote] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  useEffect(() => {
    fetch("/api/admin/orders")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data?.length) {
          setOrders(json.data);
          setSelectedOrder(json.data[0]);
        }
      })
      .catch((e) => {});
  }, []);

  const handleStatusTransition = async (orderId: string, newStatus: OrderStatus) => {
    try {
      const res = await fetch(`/api/admin/orders/${orderId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus, note: transitionNote || `Admin changed status to ${newStatus}` })
      });
      const json = await res.json();
      if (json.success) {
        setOrders((prev) => prev.map((o) => (o._id === orderId ? json.data : o)));
        setSelectedOrder(json.data);
        setTransitionNote("");
      }
    } catch (e) {
      // Local fallback state update
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, orderStatus: newStatus } : o))
      );
      if (selectedOrder && selectedOrder._id === orderId) {
        setSelectedOrder({ ...selectedOrder, orderStatus: newStatus });
      }
    }
  };

  const filteredOrders = orders.filter((o) => statusFilter === "ALL" || o.orderStatus === statusFilter);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#3B2A2A]">
          Orders & Fulfillment
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Manage fulfillment workflow, status state machine, and delivery dispatches.
        </p>
      </div>

      {/* Filter by Status */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {["ALL", ...ORDER_STATUSES].map((st) => (
          <button
            key={st}
            onClick={() => setStatusFilter(st)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
              statusFilter === st
                ? "bg-[#C94F78] text-white"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            {st.replace(/_/g, " ")}
          </button>
        ))}
      </div>

      {/* Main Grid: Orders List & Detail Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Orders Table */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 font-serif font-bold text-sm text-[#3B2A2A]">
            Order Registry ({filteredOrders.length})
          </div>

          <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
            {filteredOrders.map((ord) => {
              const isSelected = selectedOrder?._id === ord._id;
              return (
                <div
                  key={ord._id}
                  onClick={() => setSelectedOrder(ord)}
                  className={`p-4 cursor-pointer transition-all ${
                    isSelected ? "bg-[#FCEEF2]/60 border-l-4 border-[#C94F78]" : "hover:bg-slate-50"
                  }`}
                >
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-mono font-bold text-[#8E294D]">#{ord.orderNumber}</span>
                    <span className="font-bold text-[#3B2A2A]">{formatCurrency(ord.pricing?.total)}</span>
                  </div>

                  <div className="flex justify-between items-center text-[11px] text-slate-500 mt-1">
                    <span>{ord.customerDetails?.name} • {ord.shippingAddress?.city}</span>
                    <span className="px-2 py-0.5 rounded-full font-bold uppercase text-[9px] bg-slate-100 text-slate-700">
                      {ord.orderStatus}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Order Inspector */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
          {selectedOrder ? (
            <>
              <div className="flex justify-between items-start pb-4 border-b border-slate-100">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-mono">Selected Order</span>
                  <h3 className="font-serif text-lg font-bold text-[#8E294D]">#{selectedOrder.orderNumber}</h3>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase bg-[#FCEEF2] text-[#C94F78]">
                  {selectedOrder.orderStatus}
                </span>
              </div>

              {/* State Machine Transition Controls */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#3B2A2A]">
                  Advance Order State Machine:
                </label>

                <div className="flex flex-wrap gap-2">
                  {(VALID_ORDER_TRANSITIONS[selectedOrder.orderStatus as OrderStatus] || []).map((nextStatus) => (
                    <button
                      key={nextStatus}
                      onClick={() => handleStatusTransition(selectedOrder._id, nextStatus)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#8E294D] text-white hover:bg-[#C94F78] transition-colors"
                    >
                      Move to {nextStatus.replace(/_/g, " ")} &rarr;
                    </button>
                  ))}
                </div>

                <input
                  type="text"
                  placeholder="Optional fulfillment note (e.g. Handed to driver Arun)..."
                  value={transitionNote}
                  onChange={(e) => setTransitionNote(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs focus:outline-none focus:border-[#C94F78]"
                />
              </div>

              {/* Customer & Address */}
              <div className="space-y-1 text-xs">
                <h4 className="font-bold text-[#3B2A2A]">Recipient & Contact</h4>
                <div className="text-slate-600">Name: {selectedOrder.customerDetails?.name}</div>
                <div className="text-slate-600">Phone: {selectedOrder.customerDetails?.phone}</div>
                <div className="text-slate-600">
                  Address: {selectedOrder.shippingAddress?.street}, {selectedOrder.shippingAddress?.city} - {selectedOrder.shippingAddress?.pincode}
                </div>
                <div className="text-slate-600">Slot: {selectedOrder.deliverySlot?.slotName} ({selectedOrder.deliverySlot?.date})</div>
              </div>

              {/* Items */}
              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                <h4 className="font-bold text-[#3B2A2A]">Order Items</h4>
                {selectedOrder.items?.map((item: any, i: number) => (
                  <div key={i} className="flex justify-between py-1 border-b border-slate-50">
                    <span>{item.name} x {item.quantity}</span>
                    <span className="font-bold">{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="py-12 text-center text-xs text-slate-400">
              Select an order to inspect and manage fulfillment.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
