"use client";

import React, { useState } from "react";
import { Truck, Clock, MapPin, Plus, Edit2, Trash2, CheckCircle, AlertTriangle, ShieldCheck } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface SlotConfig {
  id: string;
  name: string;
  timeRange: string;
  cutoffHour: number; // 24-hr format (e.g. 18 = 6 PM)
  surcharge: number;
  active: boolean;
}

interface DeliveryZone {
  id: string;
  name: string;
  pincodePrefixes: string[];
  sameDayAvailable: boolean;
  midnightAvailable: boolean;
  baseDeliveryFee: number;
  freeShippingThreshold: number;
}

const INITIAL_SLOTS: SlotConfig[] = [
  {
    id: "slot-std",
    name: "Standard Delivery",
    timeRange: "9:00 AM - 6:00 PM",
    cutoffHour: 17,
    surcharge: 0,
    active: true
  },
  {
    id: "slot-fixed",
    name: "Fixed Time Slot",
    timeRange: "Specific 2-hour window",
    cutoffHour: 16,
    surcharge: 150,
    active: true
  },
  {
    id: "slot-midnight",
    name: "Midnight Delivery",
    timeRange: "11:00 PM - 11:59 PM",
    cutoffHour: 18,
    surcharge: 250,
    active: true
  },
  {
    id: "slot-express",
    name: "Express 2-Hour Delivery",
    timeRange: "Within 120 minutes",
    cutoffHour: 19,
    surcharge: 200,
    active: true
  }
];

const INITIAL_ZONES: DeliveryZone[] = [
  {
    id: "zone-chn-core",
    name: "Chennai Core Metro (T. Nagar, Alwarpet, Nungambakkam, Adyar)",
    pincodePrefixes: ["600017", "600018", "600034", "600020", "600028"],
    sameDayAvailable: true,
    midnightAvailable: true,
    baseDeliveryFee: 0,
    freeShippingThreshold: 799
  },
  {
    id: "zone-chn-omr",
    name: "Chennai OMR & South (Velachery, Thoraipakkam, Sholinganallur)",
    pincodePrefixes: ["600042", "600096", "600097", "600119"],
    sameDayAvailable: true,
    midnightAvailable: true,
    baseDeliveryFee: 49,
    freeShippingThreshold: 999
  },
  {
    id: "zone-chn-west",
    name: "Chennai West & North (Anna Nagar, Kilpauk, Ambattur)",
    pincodePrefixes: ["600040", "600010", "600053", "600101"],
    sameDayAvailable: true,
    midnightAvailable: false,
    baseDeliveryFee: 49,
    freeShippingThreshold: 999
  }
];

export default function DeliveryAdminPage() {
  const [slots, setSlots] = useState<SlotConfig[]>(INITIAL_SLOTS);
  const [zones, setZones] = useState<DeliveryZone[]>(INITIAL_ZONES);
  const [testPincode, setTestPincode] = useState("");
  const [testResult, setTestResult] = useState<{ zone: string; status: string } | null>(null);

  const toggleSlotActive = (id: string) => {
    setSlots(
      slots.map((s) => (s.id === id ? { ...s, active: !s.active } : s))
    );
  };

  const handleTestPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testPincode || testPincode.length !== 6) {
      setTestResult({ zone: "N/A", status: "Invalid pincode format (must be 6 digits)" });
      return;
    }
    const matchedZone = zones.find((z) => z.pincodePrefixes.includes(testPincode));
    if (matchedZone) {
      setTestResult({
        zone: matchedZone.name,
        status: `Eligible: Same-day delivery ${matchedZone.sameDayAvailable ? "YES" : "NO"} | Midnight ${matchedZone.midnightAvailable ? "YES" : "NO"} | Base Fee: ₹${matchedZone.baseDeliveryFee}`
      });
    } else {
      setTestResult({
        zone: "Standard Regional / Pan-India",
        status: "Non-metro zone. Standard shipping within 2-4 business days."
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold font-serif text-[#3B2A2A]">Delivery Zones & Time Slots</h1>
        <p className="text-sm text-slate-500 mt-1">
          Configure pincode fulfillment rules, cut-off hours, express delivery windows, and midnight fees.
        </p>
      </div>

      {/* Pincode Tester Tool */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h2 className="text-base font-serif font-bold text-slate-900 mb-1 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-[#C94F78]" />
          Instant Pincode Zone Validator
        </h2>
        <p className="text-xs text-slate-500 mb-4">
          Test any customer pincode to verify matching zone, order cutoff eligibility, and shipping fees.
        </p>
        <form onSubmit={handleTestPincode} className="flex flex-col sm:flex-row gap-3 max-w-xl">
          <input
            type="text"
            placeholder="Enter 6-digit Pincode (e.g. 600017)"
            maxLength={6}
            value={testPincode}
            onChange={(e) => setTestPincode(e.target.value.replace(/\D/g, ""))}
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C94F78]"
          />
          <button
            type="submit"
            className="bg-[#C94F78] hover:bg-[#8E294D] text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors"
          >
            Check Zone
          </button>
        </form>

        {testResult && (
          <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
            <div className="font-semibold text-slate-800">Zone: {testResult.zone}</div>
            <div className="text-slate-600">{testResult.status}</div>
          </div>
        )}
      </div>

      {/* Time Slots Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-serif font-bold text-slate-900 flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#C94F78]" />
            Delivery Slot Cutoffs & Surcharges
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {slots.map((slot) => (
            <div
              key={slot.id}
              className={`bg-white rounded-2xl border p-5 transition-all shadow-sm ${
                slot.active ? "border-slate-200" : "border-slate-200 opacity-60 bg-slate-50"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <span className="font-semibold text-sm text-slate-900">{slot.name}</span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    slot.active ? "bg-emerald-50 text-emerald-700" : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {slot.active ? "Active" : "Disabled"}
                </span>
              </div>

              <div className="space-y-2 text-xs text-slate-600 mb-4">
                <div className="flex justify-between">
                  <span className="text-slate-400">Time Window:</span>
                  <span className="font-medium text-slate-800">{slot.timeRange}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Order Cutoff:</span>
                  <span className="font-medium text-slate-800">
                    {slot.cutoffHour}:00 ({slot.cutoffHour > 12 ? `${slot.cutoffHour - 12} PM` : `${slot.cutoffHour} AM`})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Surcharge:</span>
                  <span className="font-bold text-[#C94F78]">
                    {slot.surcharge === 0 ? "FREE" : formatCurrency(slot.surcharge)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => toggleSlotActive(slot.id)}
                className={`w-full py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  slot.active
                    ? "border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                    : "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                }`}
              >
                {slot.active ? "Disable Slot" : "Enable Slot"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Pincode Zones Management */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-serif font-bold text-slate-900 flex items-center gap-2">
            <Truck className="w-5 h-5 text-[#C94F78]" />
            Active Delivery Zones
          </h2>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="divide-y divide-slate-100">
            {zones.map((zone) => (
              <div key={zone.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900 text-sm">{zone.name}</span>
                    <span className="bg-[#F8E1E8] text-[#8E294D] text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {zone.pincodePrefixes.length} Pincodes
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {zone.pincodePrefixes.map((pin) => (
                      <span
                        key={pin}
                        className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded font-mono"
                      >
                        {pin}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-6 text-xs text-slate-600 flex-shrink-0">
                  <div className="text-right">
                    <div className="text-slate-400">Base Shipping:</div>
                    <div className="font-semibold text-slate-900">
                      {zone.baseDeliveryFee === 0 ? "Free" : formatCurrency(zone.baseDeliveryFee)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-slate-400">Free Above:</div>
                    <div className="font-semibold text-slate-900">{formatCurrency(zone.freeShippingThreshold)}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded-full font-semibold ${
                        zone.sameDayAvailable ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {zone.sameDayAvailable ? "Same-Day ✓" : "Standard"}
                    </span>
                    {zone.midnightAvailable && (
                      <span className="px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 font-semibold">
                        Midnight ✓
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
