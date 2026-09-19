"use client";

import React, { useState } from "react";
import { AnnouncementBar } from "../components/common/AnnouncementBar";
import { Header } from "../components/common/Header";
import { MegaMenu } from "../components/common/MegaMenu";
import { MobileNav, MobileBottomNav } from "../components/common/MobileNav";
import { CartDrawer } from "../components/common/CartDrawer";
import { Footer } from "../components/common/Footer";

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
