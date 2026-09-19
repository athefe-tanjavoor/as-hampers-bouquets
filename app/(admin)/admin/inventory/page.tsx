"use client";

import React, { useState } from "react";
import { Boxes, AlertTriangle, CheckCircle, Search, RefreshCw, Plus, Minus, ArrowUpDown } from "lucide-react";

interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  stock: number;
  lowStockThreshold: number;
  allowBackorders: boolean;
  status: "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK";
}

const INITIAL_INVENTORY: InventoryItem[] = [
  {
    id: "prod-1",
    sku: "FLW-ROS-001",
    name: "Velvet Crimson 24-Rose Hand-Tied Luxury Bouquet",
    category: "Bouquets",
    stock: 18,
    lowStockThreshold: 5,
    allowBackorders: false,
    status: "IN_STOCK"
  },
  {
    id: "prod-2",
    sku: "HMP-CHOC-002",
    name: "Artisan Belgian Chocolate & Dry Fruit Festive Hamper",
    category: "Hampers",
    stock: 4,
    lowStockThreshold: 6,
    allowBackorders: false,
    status: "LOW_STOCK"
  },
  {
    id: "prod-3",
    sku: "FLW-LIL-003",
    name: "Blush Lilies & Pastel Carnations Spring Bouquet",
    category: "Bouquets",
    stock: 12,
    lowStockThreshold: 5,
    allowBackorders: false,
    status: "IN_STOCK"
  },
  {
    id: "prod-4",
    sku: "PRS-MUG-004",
    name: "Custom Engraved Walnut Wood Keepsake Box",
    category: "Personalized Gifts",
    stock: 3,
    lowStockThreshold: 5,
    allowBackorders: true,
    status: "LOW_STOCK"
  },
  {
    id: "prod-5",
    sku: "FLW-ORC-005",
    name: "Imperial Purple Dendrobium Orchids Vase Arrangement",
    category: "Flowers",
    stock: 0,
    lowStockThreshold: 4,
    allowBackorders: false,
    status: "OUT_OF_STOCK"
  },
  {
    id: "prod-6",
    sku: "HMP-SPA-006",
    name: "Serenity Botanical Spa & Aromatherapy Gift Basket",
    category: "Hampers",
    stock: 9,
    lowStockThreshold: 5,
    allowBackorders: false,
    status: "IN_STOCK"
  }
];

export default function InventoryAdminPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [saveFeedback, setSaveFeedback] = useState<string | null>(null);

  const updateStock = (id: string, delta: number) => {
    setInventory(
      inventory.map((item) => {
        if (item.id !== id) return item;
        const newStock = Math.max(0, item.stock + delta);
        let newStatus: "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK" = "IN_STOCK";
        if (newStock === 0) newStatus = "OUT_OF_STOCK";
        else if (newStock <= item.lowStockThreshold) newStatus = "LOW_STOCK";

        return { ...item, stock: newStock, status: newStatus };
      })
    );
    showFeedback("Stock updated");
  };

  const handleManualStock = (id: string, val: number) => {
    const validVal = Math.max(0, val);
    setInventory(
      inventory.map((item) => {
        if (item.id !== id) return item;
        let newStatus: "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK" = "IN_STOCK";
        if (validVal === 0) newStatus = "OUT_OF_STOCK";
        else if (validVal <= item.lowStockThreshold) newStatus = "LOW_STOCK";

        return { ...item, stock: validVal, status: newStatus };
      })
    );
  };

  const showFeedback = (msg: string) => {
    setSaveFeedback(msg);
    setTimeout(() => setSaveFeedback(null), 2500);
  };

  const lowStockCount = inventory.filter((i) => i.status === "LOW_STOCK").length;
  const outOfStockCount = inventory.filter((i) => i.status === "OUT_OF_STOCK").length;

  const filtered = inventory.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;
    if (filterStatus === "ALL") return true;
    return item.status === filterStatus;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-[#3B2A2A]">Inventory & Stock Control</h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time flower stem counts, hamper supplies, low-stock alerts, and batch stock adjustments.
          </p>
        </div>
        {saveFeedback && (
          <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 animate-fade-in">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            {saveFeedback}
          </div>
        )}
      </div>

      {/* Alert Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <span className="text-xs text-slate-400 uppercase font-semibold">Total Tracked SKUs</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">{inventory.length}</div>
        </div>
        <div className="bg-white rounded-2xl border border-amber-200 bg-amber-50/20 p-5 shadow-sm">
          <span className="text-xs text-amber-700 uppercase font-semibold flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5" /> Low Stock Alerts
          </span>
          <div className="text-2xl font-bold text-amber-900 mt-1">{lowStockCount} Products</div>
        </div>
        <div className="bg-white rounded-2xl border border-red-200 bg-red-50/20 p-5 shadow-sm">
          <span className="text-xs text-red-700 uppercase font-semibold">Out of Stock</span>
          <div className="text-2xl font-bold text-red-900 mt-1">{outOfStockCount} Products</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by SKU, item name, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C94F78]"
          />
        </div>

        <div className="flex gap-2">
          {["ALL", "LOW_STOCK", "OUT_OF_STOCK", "IN_STOCK"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterStatus(tab)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filterStatus === tab
                  ? "bg-[#C94F78] text-white shadow-sm"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {tab.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-6">SKU & Item Name</th>
                <th className="py-3.5 px-6">Category</th>
                <th className="py-3.5 px-6">Threshold</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-center">Current Stock & Adjustment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-semibold text-slate-900">{item.name}</div>
                    <div className="font-mono text-xs text-slate-400">{item.sku}</div>
                  </td>
                  <td className="py-4 px-6 text-xs text-slate-600">{item.category}</td>
                  <td className="py-4 px-6 text-xs text-slate-500">Alert at ≤ {item.lowStockThreshold} units</td>
                  <td className="py-4 px-6">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                        item.status === "IN_STOCK"
                          ? "bg-emerald-50 text-emerald-700"
                          : item.status === "LOW_STOCK"
                          ? "bg-amber-50 text-amber-700 font-bold animate-pulse"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {item.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => updateStock(item.id, -1)}
                        className="w-8 h-8 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <input
                        type="number"
                        min={0}
                        value={item.stock}
                        onChange={(e) => handleManualStock(item.id, Number(e.target.value))}
                        className="w-16 text-center py-1 rounded-lg border border-slate-200 font-bold text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#C94F78]"
                      />
                      <button
                        onClick={() => updateStock(item.id, 1)}
                        className="w-8 h-8 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
