import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/connection";
import { CategoryModel } from "@/lib/db/models/Category";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET() {
  try {
    await connectDB();
    const categories = await CategoryModel.find().sort({ sortOrder: 1 });
    return successResponse(categories);
  } catch (err: any) {
    return errorResponse(err.message);
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const category = await CategoryModel.create(body);
    return successResponse(category, {}, 201);
  } catch (err: any) {
    return errorResponse(err.message, "BAD_REQUEST", 400);
  }
}
