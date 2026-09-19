import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/connection";
import { BlogPostModel } from "@/lib/db/models/BlogPost";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();
    const post = await BlogPostModel.findByIdAndUpdate(id, body, { new: true });
    if (!post) return errorResponse("Article not found", "NOT_FOUND", 404);
    return successResponse(post);
  } catch (err: any) {
    return errorResponse(err.message, "BAD_REQUEST", 400);
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    await BlogPostModel.findByIdAndDelete(id);
    return successResponse({ message: "Article deleted" });
  } catch (err: any) {
    return errorResponse(err.message);
  }
}
