import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/connection";
import { ProductModel } from "@/lib/db/models/Product";
import { ReviewModel } from "@/lib/db/models/Review";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    await connectDB();
    const { slug } = await params;

    const product = await ProductModel.findOne({ slug, status: "ACTIVE" })
      .populate("category", "name slug")
      .populate("relatedProducts", "name slug price salePrice images ratingAverage reviewCount");

    if (!product) {
      return errorResponse("Product not found", "NOT_FOUND", 404);
    }

    // Fetch approved reviews
    const reviews = await ReviewModel.find({ product: product._id, status: "APPROVED" }).sort({ createdAt: -1 });

    // Fallback related products
    let related = product.relatedProducts;
    if (!related || related.length === 0) {
      related = await ProductModel.find({
        category: (product.category as any)?._id || product.category,
        _id: { $ne: product._id },
        status: "ACTIVE"
      }).limit(4);
    }

    return successResponse({
      product,
      reviews,
      relatedProducts: related
    });
  } catch (err: any) {
    return errorResponse(err.message);
  }
}
