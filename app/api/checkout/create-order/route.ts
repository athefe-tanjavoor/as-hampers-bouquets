import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/connection";
import { checkoutSchema } from "@/lib/validation";
import { createOrder } from "@/lib/db/services/order.service";
import { createRazorpayOrder } from "@/lib/db/services/razorpay.service";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const parseResult = checkoutSchema.safeParse(body);

    if (!parseResult.success) {
      return errorResponse("Invalid form input", "VALIDATION_FAILED", 400);
    }

    const {
      name,
      email,
      phone,
      street,
      landmark,
      city,
      state,
      pincode,
      deliveryDate,
      deliverySlotId,
      giftMessage,
      paymentMethod,
      items,
      couponCode
    } = parseResult.data;

    const order = await createOrder({
      customerDetails: { name, email, phone },
      shippingAddress: { name, phone, street, landmark, city, state, pincode },
      items,
      giftMessage,
      deliverySlot: {
        date: deliveryDate,
        slotId: deliverySlotId,
        slotName: deliverySlotId.toUpperCase(),
        fee: 0
      },
      paymentMethod,
      couponCode
    });

    let razorpayPayload = null;
    if (paymentMethod === "RAZORPAY") {
      razorpayPayload = await createRazorpayOrder(order.pricing.total, order.orderNumber);
      order.razorpayOrderId = razorpayPayload.id;
      await order.save();
    }

    return successResponse(
      {
        order,
        razorpayOrder: razorpayPayload
      },
      {},
      201
    );
  } catch (err: any) {
    return errorResponse(err.message, "CHECKOUT_ERROR", 400);
  }
}
