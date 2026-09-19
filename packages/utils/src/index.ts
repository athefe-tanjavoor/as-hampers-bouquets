import { BRAND_CONFIG } from "@repo/config";

export function formatCurrency(amount: number | undefined | null): string {
  if (amount === undefined || amount === null || isNaN(amount)) return `${BRAND_CONFIG.currency}0`;
  return `${BRAND_CONFIG.currency}${Math.round(amount).toLocaleString("en-IN")}`;
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export function calculateDiscountPercentage(originalPrice: number, salePrice: number): number {
  if (!originalPrice || originalPrice <= salePrice) return 0;
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
}

export function generateOrderNumber(): string {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `BB-${dateStr}-${randomSuffix}`;
}

export function truncate(str: string, length = 120): string {
  if (!str) return "";
  if (str.length <= length) return str;
  return str.slice(0, length).trim() + "...";
}

export function isValidPincode(pincode: string): boolean {
  return /^[1-9][0-9]{5}$/.test(pincode.trim());
}

export function isValidIndianPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-\+\(\)]/g, "");
  return /^(91)?[6-9]\d{9}$/.test(cleaned);
}
