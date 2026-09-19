import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/connection";
import { BlogPostModel } from "@/lib/db/models/BlogPost";
import { ProductModel } from "@/lib/db/models/Product";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    await connectDB();
    const { slug } = await params;

    const post = await BlogPostModel.findOne({ slug, status: "PUBLISHED" });
    if (!post) {
      return errorResponse("Article not found", "NOT_FOUND", 404);
    }

    const relatedPosts = await BlogPostModel.find({
      _id: { $ne: post._id },
      category: post.category,
      status: "PUBLISHED"
    }).limit(3);

    const recommendedProducts = await ProductModel.find({ status: "ACTIVE", bestseller: true }).limit(4);

    return successResponse({
      post,
      relatedPosts,
      recommendedProducts
    });
  } catch (err: any) {
    return errorResponse(err.message);
  }
}
