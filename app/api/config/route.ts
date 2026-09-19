import { NextResponse } from "next/server";
import { BRAND_CONFIG, SITE_NAVIGATION, PRICE_COLLECTIONS, COLOR_TOKENS } from "@/lib/config";
import { successResponse } from "@/lib/api-response";

export async function GET() {
  return successResponse({
    brand: BRAND_CONFIG,
    navigation: SITE_NAVIGATION,
    priceCollections: PRICE_COLLECTIONS,
    colors: COLOR_TOKENS
  });
}
