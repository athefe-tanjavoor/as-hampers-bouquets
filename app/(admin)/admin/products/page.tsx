"use client";

import React, { useState, useEffect } from "react";
import { formatCurrency } from "@/lib/utils";
import { Plus, Edit2, Trash2, Check, Package, Sparkles } from "lucide-react";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([
    {
      _id: "p1",
      name: "Blush Garden Rose Bouquet",
      sku: "BOUQ-ROSE-001",
      price: 1499,
      salePrice: 1299,
      stock: 35,
      status: "ACTIVE",
      bestseller: true,
      featured: true,
      category: { name: "Bouquets" }
    },
    {
      _id: "p2",
      name: "Opulent Celebration Hamper",
      sku: "HAMP-OPUL-002",
      price: 2499,
      salePrice: 2199,
      stock: 4,
      status: "ACTIVE",
      bestseller: true,
      featured: true,
      category: { name: "Hampers" }
    },
    {
      _id: "p3",
      name: "Vintage Lilies & Carnations Bunch",
      sku: "FLOW-LILY-003",
      price: 999,
      salePrice: 899,
      stock: 40,
      status: "ACTIVE",
      bestseller: false,
      featured: true,
      category: { name: "Flowers" }
    },
    {
      _id: "p4",
      name: "Royal Crimson Rose & Orchid Garland",
      sku: "WEDD-GARL-005",
      price: 3499,
      salePrice: 2999,
      stock: 3,
      status: "ACTIVE",
      bestseller: false,
      featured: false,
      category: { name: "Wedding" }
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    slug: "",
    sku: "",
    price: 1499,
    salePrice: 1299,
    stock: 25,
    shortDescription: "Handcrafted arrangement with fresh blooms.",
    description: "Detailed product description.",
    status: "ACTIVE"
  });

  useEffect(() => {
    fetch("/api/admin/products")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data?.length) setProducts(json.data);
      })
      .catch((e) => {});
  }, []);

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newProduct,
          slug: newProduct.name.toLowerCase().replace(/\s+/g, "-"),
          sku: newProduct.sku.toUpperCase()
        })
      });
      const json = await res.json();
      if (json.success) {
        setProducts([json.data, ...products]);
      } else {
        setProducts([
          { ...newProduct, _id: `p-${Date.now()}`, category: { name: "Custom" } },
          ...products
        ]);
      }
    } catch (e) {
      setProducts([
        { ...newProduct, _id: `p-${Date.now()}`, category: { name: "Custom" } },
        ...products
      ]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#3B2A2A]">
            Catalog & Products
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage inventory, pricing, variants, and SEO titles for bouquets and hampers.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-[#C94F78] hover:bg-[#8E294D] text-white text-xs font-semibold rounded-xl transition-colors shadow-sm inline-flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-400 font-semibold border-b border-slate-100">
              <tr>
                <th className="p-4 pl-6">Product Details</th>
                <th className="p-4">SKU</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Status</th>
                <th className="p-4">Badges</th>
                <th className="p-4 text-right pr-6">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map((p) => (
                <tr key={p._id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-4 pl-6">
                    <div className="font-serif font-bold text-sm text-[#3B2A2A]">{p.name}</div>
                    <div className="text-[11px] text-slate-400">Category: {p.category?.name || "General"}</div>
                  </td>
                  <td className="p-4 font-mono text-[11px] text-slate-500 font-semibold">{p.sku}</td>
                  <td className="p-4 font-bold text-[#3B2A2A]">
                    {formatCurrency(p.salePrice || p.price)}
                    {p.salePrice && p.salePrice < p.price && (
                      <span className="text-[10px] text-gray-400 line-through ml-1.5 font-normal">
                        {formatCurrency(p.price)}
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
                        p.stock <= 5 ? "bg-rose-100 text-rose-700" : "bg-green-100 text-green-700"
                      }`}
                    >
                      {p.stock} in stock
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 uppercase">
                      {p.status}
                    </span>
                  </td>
                  <td className="p-4 space-x-1">
                    {p.bestseller && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#FCEEF2] text-[#C94F78]">
                        Bestseller
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right pr-6 space-x-2">
                    <button className="text-slate-400 hover:text-[#C94F78] p-1">
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 shadow-2xl space-y-4">
            <h2 className="font-serif text-lg font-bold text-[#3B2A2A]">Add New Floral Product</h2>
            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  placeholder="e.g. Lavender Garden Bliss Bouquet"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#C94F78]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">SKU</label>
                  <input
                    type="text"
                    required
                    value={newProduct.sku}
                    onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                    placeholder="BOUQ-LAV-007"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono uppercase focus:outline-none focus:border-[#C94F78]"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    required
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#C94F78]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#C94F78]"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Sale Price (₹)</label>
                  <input
                    type="number"
                    value={newProduct.salePrice}
                    onChange={(e) => setNewProduct({ ...newProduct, salePrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#C94F78]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#C94F78] hover:bg-[#8E294D] text-white font-semibold shadow-sm"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
