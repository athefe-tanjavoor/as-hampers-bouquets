import React from "react";
import Link from "next/link";
import { BRAND_CONFIG } from "@/lib/config";

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-[#8E294D] text-white text-xs py-2 px-4 text-center font-medium tracking-wide">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 flex-wrap text-[11px] sm:text-xs">
        <span>📞 Order on Call / WhatsApp:</span>
        <a
          href={`tel:${BRAND_CONFIG.supportPhone.replace(/\s+/g, "")}`}
          className="font-bold underline decoration-[#F8E1E8] hover:text-[#F8E1E8] transition-colors font-mono"
        >
          {BRAND_CONFIG.supportPhone}
        </a>
        <span className="hidden sm:inline">•</span>
        <span>Same-Day Delivery in Selected Areas</span>
        <span className="hidden sm:inline">•</span>
        <Link
          href={BRAND_CONFIG.announcementUrl}
          className="underline underline-offset-4 hover:text-[#F8E1E8] transition-colors font-semibold ml-1"
        >
          {BRAND_CONFIG.announcementCta} &rarr;
        </Link>
      </div>
    </div>
  );
};
