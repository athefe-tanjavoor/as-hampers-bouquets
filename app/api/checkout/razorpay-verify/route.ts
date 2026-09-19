import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/connection";
import { verifyRazorpayPayment } from "@/lib/db/services/razorpay.service";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { orderId, razorpayOrderId, razorpayPaymentId, razorpaySignature } = body;

    if (!orderId || !razorpayOrderId || !razorpayPaymentId) {
      return errorResponse("Missing required payment verification parameters", "BAD_REQUEST", 400);
    }

    const result = await verifyRazorpayPayment(orderId, razorpayOrderId, razorpayPaymentId, razorpaySignature);
    if (!result.success) {
      return errorResponse(result.message, "PAYMENT_VERIFICATION_FAILED", 400);
    }

    return successResponse({ message: result.message });
  } catch (err: any) {
    return errorResponse(err.message);
  }
}
