import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connection";
import { OrderModel } from "@/lib/db/models/Order";
import { verifyWebhookSignature } from "@/lib/db/services/razorpay.service";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const signature = req.headers.get("x-razorpay-signature");
    const rawBody = await req.text();

    if (process.env.RAZORPAY_WEBHOOK_SECRET && signature) {
      const isValid = await verifyWebhookSignature(rawBody, signature);
      if (!isValid) {
        return NextResponse.json({ success: false, message: "Invalid webhook signature" }, { status: 400 });
      }
    }

    const body = JSON.parse(rawBody);
    const event = body.event;

    if (event === "payment.captured") {
      const paymentEntity = body.payload?.payment?.entity;
      if (paymentEntity?.order_id) {
        const order = await OrderModel.findOne({ razorpayOrderId: paymentEntity.order_id });
        if (order && order.paymentStatus !== "PAID") {
          order.paymentStatus = "PAID";
          order.orderStatus = "CONFIRMED";
          await order.save();
        }
      }
    }

    return NextResponse.json({ status: "ok" });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: { message: err.message } }, { status: 500 });
  }
}
