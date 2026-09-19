import React from "react";
import { CartProvider } from "@/lib/cart-context";
import { LayoutWrapper } from "@/components/common/LayoutWrapper";

export default function StorefrontLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <LayoutWrapper>
        {children}
      </LayoutWrapper>
    </CartProvider>
  );
}
