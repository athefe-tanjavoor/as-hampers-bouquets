"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem } from "@/lib/types";

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
  couponCode: string;
  setCouponCode: (code: string) => void;
  giftMessage: string;
  setGiftMessage: (msg: string) => void;
  pincode: string;
  setPincode: (pin: string) => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  cartCount: number;
  subtotal: number;
  isCartDrawerOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState<string>("");
  const [giftMessage, setGiftMessage] = useState<string>("");
  const [pincode, setPincode] = useState<string>("");
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("bb_cart");
      if (savedCart) setItems(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem("bb_wishlist");
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedPin = localStorage.getItem("bb_pincode");
      if (savedPin) setPincode(savedPin);
    } catch (e) {
      console.warn("Could not load from localStorage", e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("bb_cart", JSON.stringify(items));
    } catch (e) {}
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem("bb_wishlist", JSON.stringify(wishlist));
    } catch (e) {}
  }, [wishlist]);

  const addItem = (newItem: CartItem) => {
    setItems((prev) => {
      const existingIdx = prev.findIndex(
        (i) => i.productId === newItem.productId && i.variantId === newItem.variantId
      );
      if (existingIdx > -1) {
        const copy = [...prev];
        copy[existingIdx].quantity += newItem.quantity;
        return copy;
      }
      return [...prev, newItem];
    });
    setIsCartDrawerOpen(true);
  };

  const removeItem = (productId: string, variantId?: string) => {
    setItems((prev) =>
      prev.filter((i) => !(i.productId === productId && i.variantId === variantId))
    );
  };

  const updateQuantity = (productId: string, quantity: number, variantId?: string) => {
    if (quantity <= 0) {
      removeItem(productId, variantId);
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.productId === productId && i.variantId === variantId ? { ...i, quantity } : i
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setCouponCode("");
    setGiftMessage("");
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + (item.salePrice && item.salePrice < item.price ? item.salePrice : item.price) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        couponCode,
        setCouponCode,
        giftMessage,
        setGiftMessage,
        pincode,
        setPincode,
        wishlist,
        toggleWishlist,
        isWishlisted,
        cartCount,
        subtotal,
        isCartDrawerOpen,
        openCart: () => setIsCartDrawerOpen(true),
        closeCart: () => setIsCartDrawerOpen(false)
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
