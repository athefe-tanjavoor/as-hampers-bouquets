import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/connection";
import { ProductModel } from "@/lib/db/models/Product";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "24");
    const skip = (page - 1) * limit;

    const query: any = { status: "ACTIVE" };

    const category = searchParams.get("category");
    if (category) query.category = category;

    const occasion = searchParams.get("occasion");
    if (occasion) query.occasion = occasion;

    const recipient = searchParams.get("recipient");
    if (recipient) query.recipient = recipient;

    if (searchParams.get("bestseller") === "true") query.bestseller = true;
    if (searchParams.get("featured") === "true") query.featured = true;

    const priceMin = searchParams.get("priceMin");
    const priceMax = searchParams.get("priceMax");
    if (priceMin || priceMax) {
      query.price = {};
      if (priceMin) query.price.$gte = Number(priceMin);
      if (priceMax) query.price.$lte = Number(priceMax);
    }

    const sortParam = searchParams.get("sort");
    let sort: any = { createdAt: -1 };
    if (sortParam === "price_asc") sort = { price: 1 };
    if (sortParam === "price_desc") sort = { price: -1 };
    if (sortParam === "rating") sort = { ratingAverage: -1 };
    if (sortParam === "newest") sort = { createdAt: -1 };

    const [products, total] = await Promise.all([
      ProductModel.find(query).populate("category", "name slug").sort(sort).skip(skip).limit(limit),
      ProductModel.countDocuments(query)
    ]);

    return successResponse(products, {
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (err: any) {
    return errorResponse(err.message);
  }
}
