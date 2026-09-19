import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/connection";
import { ReviewModel } from "@/lib/db/models/Review";
import { reviewSubmitSchema } from "@/lib/validation";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");

    const query: any = { status: "APPROVED" };
    if (productId) query.product = productId;

    const reviews = await ReviewModel.find(query).sort({ createdAt: -1 });
    return successResponse(reviews);
  } catch (err: any) {
    return errorResponse(err.message);
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const parse = reviewSubmitSchema.safeParse(body);

    if (!parse.success) {
      return errorResponse("Validation error", "VALIDATION_FAILED", 400);
    }

    const { productId, customerName, rating, title, comment } = parse.data;

    const review = await ReviewModel.create({
      product: productId,
      customerName,
      rating,
      title,
      comment,
      isVerifiedPurchase: true,
      status: "APPROVED"
    });

    return successResponse(review, { message: "Thank you for your feedback! Your review has been submitted." }, 201);
  } catch (err: any) {
    return errorResponse(err.message);
  }
}
