import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/connection";
import { BlogPostModel } from "@/lib/db/models/BlogPost";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET() {
  try {
    await connectDB();
    const posts = await BlogPostModel.find().sort({ createdAt: -1 });
    return successResponse(posts);
  } catch (err: any) {
    return errorResponse(err.message);
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const post = await BlogPostModel.create(body);
    return successResponse(post, {}, 201);
  } catch (err: any) {
    return errorResponse(err.message, "BAD_REQUEST", 400);
  }
}
