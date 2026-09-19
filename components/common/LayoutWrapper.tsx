"use client";

import React, { useState } from "react";
import { AnnouncementBar } from "./AnnouncementBar";
import { Header } from "./Header";
import { MegaMenu } from "./MegaMenu";
import { MobileNav, MobileBottomNav } from "./MobileNav";
import { CartDrawer } from "./CartDrawer";
import { Footer } from "./Footer";

export const LayoutWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <>
      <div>
        <AnnouncementBar />
        <Header onOpenMobileNav={() => setIsMobileNavOpen(true)} />
        <MegaMenu />
      </div>

      <main className="flex-1 pb-16 lg:pb-0">{children}</main>

      <Footer />

      <MobileNav isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
      <MobileBottomNav />
      <CartDrawer />
    </>
  );
};
