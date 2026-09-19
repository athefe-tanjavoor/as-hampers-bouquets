import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/connection";
import { ProductModel } from "@/lib/db/models/Product";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const { stock } = await req.json();

    if (stock === undefined || isNaN(Number(stock))) {
      return errorResponse("Valid stock number required", "BAD_REQUEST", 400);
    }

    const product = await ProductModel.findByIdAndUpdate(
      id,
      { stock: Number(stock) },
      { new: true }
    );

    if (!product) return errorResponse("Product not found", "NOT_FOUND", 404);
    return successResponse(product);
  } catch (err: any) {
    return errorResponse(err.message, "BAD_REQUEST", 400);
  }
}
