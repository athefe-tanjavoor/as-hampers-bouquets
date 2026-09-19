import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/connection";
import { trackOrder } from "@/lib/db/services/order.service";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const orderNumber = searchParams.get("orderNumber");
    const contact = searchParams.get("contact");

    if (!orderNumber || !contact) {
      return errorResponse("Order number and email/phone are required to track order", "BAD_REQUEST", 400);
    }

    const order = await trackOrder(orderNumber, contact);
    if (!order) {
      return errorResponse(
        "We couldn't find an order matching those details. Please verify your order number and contact info.",
        "ORDER_NOT_FOUND",
        404
      );
    }

    return successResponse({
      orderNumber: order.orderNumber,
      status: order.orderStatus,
      paymentStatus: order.paymentStatus,
      deliverySlot: order.deliverySlot,
      createdAt: order.createdAt,
      items: order.items,
      pricing: order.pricing,
      shippingAddress: {
        name: order.shippingAddress.name,
        city: order.shippingAddress.city,
        state: order.shippingAddress.state,
        pincode: order.shippingAddress.pincode
      },
      statusHistory: order.statusHistory
    });
  } catch (err: any) {
    return errorResponse(err.message);
  }
}
