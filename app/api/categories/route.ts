import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/connection";
import { CategoryModel } from "@/lib/db/models/Category";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET() {
  try {
    await connectDB();
    const categories = await CategoryModel.find({ status: "ACTIVE" }).sort({ sortOrder: 1 });
    return successResponse(categories);
  } catch (err: any) {
    return errorResponse(err.message);
  }
}
