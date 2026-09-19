import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/connection";
import { CategoryModel } from "@/lib/db/models/Category";
import { ProductModel } from "@/lib/db/models/Product";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    await connectDB();
    const { slug } = await params;
    const category = await CategoryModel.findOne({ slug, status: "ACTIVE" });
    if (!category) {
      return errorResponse("Category not found", "NOT_FOUND", 404);
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "24");
    const skip = (page - 1) * limit;

    const query: any = { category: category._id, status: "ACTIVE" };

    const priceMin = searchParams.get("priceMin");
    const priceMax = searchParams.get("priceMax");
    if (priceMin || priceMax) {
      query.price = {};
      if (priceMin) query.price.$gte = Number(priceMin);
      if (priceMax) query.price.$lte = Number(priceMax);
    }

    const occasion = searchParams.get("occasion");
    if (occasion) {
      query.occasion = occasion;
    }

    const sortParam = searchParams.get("sort");
    let sort: any = { createdAt: -1 };
    if (sortParam === "price_asc") sort = { price: 1 };
    if (sortParam === "price_desc") sort = { price: -1 };
    if (sortParam === "rating") sort = { ratingAverage: -1 };
    if (sortParam === "bestseller") sort = { bestseller: -1, createdAt: -1 };

    const [products, total] = await Promise.all([
      ProductModel.find(query).sort(sort).skip(skip).limit(limit),
      ProductModel.countDocuments(query)
    ]);

    const relatedCategories = await CategoryModel.find({
      _id: { $ne: category._id },
      status: "ACTIVE"
    }).limit(6);

    return successResponse(
      {
        category,
        products,
        relatedCategories
      },
      {
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      }
    );
  } catch (err: any) {
    return errorResponse(err.message);
  }
}
