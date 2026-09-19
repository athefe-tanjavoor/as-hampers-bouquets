import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/connection";
import { BlogPostModel } from "@/lib/db/models/BlogPost";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const query: any = { status: "PUBLISHED" };
    const category = searchParams.get("category");
    if (category) query.category = category;

    const [posts, total] = await Promise.all([
      BlogPostModel.find(query).sort({ publishedAt: -1 }).skip(skip).limit(limit),
      BlogPostModel.countDocuments(query)
    ]);

    return successResponse(posts, {
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
