import React from "react";
import Link from "next/link";
import { BRAND_CONFIG } from "@/lib/config";
import { Phone, Mail, MapPin, Instagram, Facebook, MessageCircle } from "lucide-react";

export const Footer: React.FC = () => {
  const shopLinks = [
    { label: "Bouquets", href: "/bouquets" },
    { label: "Flowers", href: "/flowers" },
    { label: "Hampers", href: "/hampers" },
    { label: "Personalized Gifts", href: "/personalized-gifts" },
    { label: "Birthday Gifts", href: "/birthday-gifts" },
    { label: "Anniversary Gifts", href: "/anniversary-gifts" },
    { label: "Wedding Flowers", href: "/wedding-flowers" },
    { label: "Corporate Gifts", href: "/corporate-gifts" },
    { label: "Bestsellers", href: "/bestsellers" },
    { label: "Gifts Under ₹999", href: "/under-999" }
  ];

  const helpLinks = [
    { label: "Contact Us", href: "/contact" },
    { label: "Track Order", href: "/track-order" },
    { label: "Delivery Information", href: "/delivery-information" },
    { label: "FAQs", href: "/faq" },
    { label: "Cancellation & Refund", href: "/refund-cancellation" },
    { label: "Shipping Policy", href: "/shipping-policy" }
  ];

  const companyLinks = [
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Corporate Gifting", href: "/corporate-gifts" },
    { label: "Wedding Inquiries", href: "/wedding-flowers" }
  ];

  const legalLinks = [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
    { label: "Refund & Cancellation Policy", href: "/refund-cancellation" },
    { label: "Shipping Policy", href: "/shipping-policy" }
  ];

  const popularSearches = [
    { label: "Bouquets Online", href: "/bouquets" },
    { label: "Fresh Flowers Online", href: "/flowers" },
    { label: "Gift Hampers", href: "/hampers" },
    { label: "Birthday Gifts", href: "/birthday-gifts" },
    { label: "Anniversary Gifts", href: "/anniversary-gifts" },
    { label: "Personalized Gifts", href: "/personalized-gifts" },
    { label: "Wedding Flowers", href: "/wedding-flowers" },
    { label: "Corporate Gifts", href: "/corporate-gifts" },
    { label: "Gifts Under ₹999", href: "/under-999" },
    { label: `Flower Delivery ${BRAND_CONFIG.primaryCity}`, href: "/flowers" }
  ];

  return (
    <footer className="bg-[#3B2A2A] text-white pt-16 pb-12 border-t border-[#8E294D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-gray-700/60">
          {/* Brand block */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-serif text-3xl font-bold text-[#F8E1E8]">
                {BRAND_CONFIG.name}
              </span>
              <span className="block text-[10px] tracking-[0.2em] text-[#C94F78] uppercase mt-0.5">
                Floral & Gifting Studio
              </span>
            </Link>
            <p className="text-xs text-gray-300 leading-relaxed max-w-sm">
              {BRAND_CONFIG.name} creates beautiful bouquets, flowers, gift hampers and personalized gifts for birthdays, anniversaries, weddings, celebrations and everyday surprises.
            </p>

            <div className="space-y-2 pt-2 text-xs text-gray-300">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#C94F78]" />
                <span>{BRAND_CONFIG.serviceArea}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C94F78]" />
                <a href={`tel:${BRAND_CONFIG.supportPhone.replace(/\s+/g, "")}`} className="hover:text-white">
                  {BRAND_CONFIG.supportPhone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C94F78]" />
                <a href={`mailto:${BRAND_CONFIG.supportEmail}`} className="hover:text-white">
                  {BRAND_CONFIG.supportEmail}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={BRAND_CONFIG.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#C94F78] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={BRAND_CONFIG.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#25D366] transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={BRAND_CONFIG.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#1877F2] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-serif text-sm font-semibold tracking-wider uppercase text-[#F8E1E8] mb-4">
              Shop Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-300">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-[#F8E1E8] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Help */}
          <div>
            <h4 className="font-serif text-sm font-semibold tracking-wider uppercase text-[#F8E1E8] mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-300">
              {helpLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-[#F8E1E8] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h4 className="font-serif text-sm font-semibold tracking-wider uppercase text-[#F8E1E8] mb-4">
              Company & Legal
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-300">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-[#F8E1E8] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-[#F8E1E8] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Popular Searches SEO Block */}
        <div className="py-8 border-b border-gray-700/60">
          <h5 className="text-[11px] uppercase tracking-widest text-[#F8E1E8] font-bold mb-3">
            Popular Searches
          </h5>
          <div className="flex flex-wrap gap-2 text-[11px] text-gray-400">
            {popularSearches.map((item, index) => (
              <span key={item.label} className="inline-flex items-center">
                <Link href={item.href} className="hover:text-white transition-colors">
                  {item.label}
                </Link>
                {index < popularSearches.length - 1 && <span className="mx-2 text-gray-600">|</span>}
              </span>
            ))}
          </div>
        </div>

        {/* Copyright & Professional Attribution */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-left">
            <p>© {new Date().getFullYear()} {BRAND_CONFIG.name}. All rights reserved.</p>
            <span className="hidden sm:inline text-gray-600">•</span>
            <p className="inline-flex items-center gap-1.5 text-[11px] text-gray-300">
              <span>Designed & Developed by</span>
              <a
                href="https://aitechgrow.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#F8E1E8] hover:text-white transition-colors underline decoration-[#C94F78] underline-offset-4 hover:decoration-white inline-flex items-center gap-1 group"
              >
                <span>AiTechGrow</span>
                <span className="text-[#C94F78] group-hover:translate-x-0.5 transition-transform">↗</span>
              </a>
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 text-[11px] text-gray-400">
            <span className="inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C94F78]"></span>
              100% Handcrafted
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Secure Payments
            </span>
            <span>•</span>
            <span>{BRAND_CONFIG.deliveryPromise}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
