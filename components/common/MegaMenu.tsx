"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export const MegaMenu: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const occasionLinks = [
    { label: "Birthday Gifts", href: "/birthday-gifts", desc: "Thoughtful bouquets and cakes" },
    { label: "Anniversary Gifts", href: "/anniversary-gifts", desc: "Romantic blooms & luxury hampers" },
    { label: "Wedding Flowers", href: "/wedding-flowers", desc: "Garlands, bridal bouquets & decor" },
    { label: "Congratulations", href: "/congratulations-gifts", desc: "Celebrate their big achievement" },
    { label: "Thank You Gifts", href: "/thank-you-gifts", desc: "Express heartfelt gratitude" },
    { label: "Housewarming", href: "/housewarming-gifts", desc: "Warm wishes for new spaces" }
  ];

  const priceLinks = [
    { label: "Gifts Under ₹599", href: "/under-599" },
    { label: "Gifts Under ₹999", href: "/under-999" },
    { label: "Gifts Under ₹1,499", href: "/under-1499" },
    { label: "Gifts Under ₹2,499", href: "/under-2499" },
    { label: "Premium Gifts", href: "/premium-gifts" }
  ];

  return (
    <nav className="hidden lg:block bg-white border-b border-[#EEDCDA]/80 shadow-sm relative z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex items-center justify-between py-3 text-sm font-medium text-[#3B2A2A]">
          <li>
            <Link href="/bouquets" className="hover:text-[#C94F78] transition-colors py-2">
              Bouquets
            </Link>
          </li>
          <li>
            <Link href="/flowers" className="hover:text-[#C94F78] transition-colors py-2">
              Flowers
            </Link>
          </li>
          <li>
            <Link href="/hampers" className="hover:text-[#C94F78] transition-colors py-2">
              Hampers
            </Link>
          </li>
          <li>
            <Link href="/personalized-gifts" className="hover:text-[#C94F78] transition-colors py-2">
              Personalized Gifts
            </Link>
          </li>

          {/* Occasions Dropdown */}
          <li
            className="relative"
            onMouseEnter={() => setActiveDropdown("occasions")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center gap-1 hover:text-[#C94F78] transition-colors py-2 focus:outline-none">
              <span>Occasions</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </button>

            {activeDropdown === "occasions" && (
              <div className="absolute top-full left-0 w-80 bg-white rounded-xl shadow-xl border border-[#EEDCDA] p-4 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="grid grid-cols-1 gap-2">
                  {occasionLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="p-2.5 rounded-lg hover:bg-[#FCEEF2] transition-colors group"
                    >
                      <div className="text-sm font-semibold text-[#3B2A2A] group-hover:text-[#C94F78]">
                        {item.label}
                      </div>
                      <div className="text-xs text-[#7A6868] mt-0.5">{item.desc}</div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </li>

          <li>
            <Link href="/wedding-flowers" className="hover:text-[#C94F78] transition-colors py-2">
              Wedding
            </Link>
          </li>
          <li>
            <Link href="/corporate-gifts" className="hover:text-[#C94F78] transition-colors py-2">
              Corporate Gifting
            </Link>
          </li>

          {/* Offers & Budget Dropdown */}
          <li
            className="relative"
            onMouseEnter={() => setActiveDropdown("budget")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center gap-1 text-[#C94F78] font-semibold hover:text-[#8E294D] transition-colors py-2 focus:outline-none">
              <span>Shop by Budget</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </button>

            {activeDropdown === "budget" && (
              <div className="absolute top-full right-0 w-56 bg-white rounded-xl shadow-xl border border-[#EEDCDA] p-3 animate-in fade-in slide-in-from-top-2 duration-150">
                {priceLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-3 py-2 text-xs font-semibold text-[#3B2A2A] hover:text-[#C94F78] hover:bg-[#FCEEF2] rounded-lg transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </li>

          <li>
            <Link href="/blog" className="hover:text-[#C94F78] transition-colors py-2">
              Blog
            </Link>
          </li>
          <li>
            <Link href="/track-order" className="text-xs font-semibold uppercase tracking-wider text-[#7A6868] hover:text-[#C94F78] transition-colors py-2">
              Track Order
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
