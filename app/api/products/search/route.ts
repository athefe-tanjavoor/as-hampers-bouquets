import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/connection";
import { ProductModel } from "@/lib/db/models/Product";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const q = (searchParams.get("q") || "").trim();

    if (!q) {
      return successResponse({ products: [], suggestions: [] });
    }

    const regex = new RegExp(q, "i");
    const products = await ProductModel.find({
      status: "ACTIVE",
      $or: [{ name: regex }, { shortDescription: regex }, { occasion: regex }, { colour: regex }]
    })
      .limit(12)
      .populate("category", "name slug");

    const suggestions = [
      "Pink Rose Bouquet",
      "Birthday Gift Hamper",
      "Anniversary Red Roses",
      "Personalized Photo Frame Hamper",
      "Wedding Floral Garlands"
    ].filter((s) => s.toLowerCase().includes(q.toLowerCase()));

    return successResponse({ products, suggestions });
  } catch (err: any) {
    return errorResponse(err.message);
  }
}
