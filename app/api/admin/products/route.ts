import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/connection";
import { ProductModel } from "@/lib/db/models/Product";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET() {
  try {
    await connectDB();
    const products = await ProductModel.find().populate("category", "name slug").sort({ createdAt: -1 });
    return successResponse(products);
  } catch (err: any) {
    return errorResponse(err.message);
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const product = await ProductModel.create(body);
    return successResponse(product, {}, 201);
  } catch (err: any) {
    return errorResponse(err.message, "BAD_REQUEST", 400);
  }
}
