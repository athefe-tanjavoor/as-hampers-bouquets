import { Router } from "express";
import { checkoutSchema } from "@repo/validation";
import { createOrder } from "../services/order.service";
import { createRazorpayOrder, verifyRazorpayPayment, verifyWebhookSignature } from "../services/razorpay.service";
import { OrderModel } from "../models/Order";

const router = Router();

router.post("/create-order", async (req, res) => {
  try {
    const parseResult = checkoutSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        success: false,
        error: { code: "VALIDATION_FAILED", message: "Invalid form input", details: parseResult.error.errors }
      });
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

    // Build order
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

    res.status(201).json({
      success: true,
      data: {
        order,
        razorpayOrder: razorpayPayload
      }
    });
  } catch (err: any) {
    res.status(400).json({ success: false, error: { code: "CHECKOUT_ERROR", message: err.message } });
  }
});

router.post("/razorpay-verify", async (req, res) => {
  try {
    const { orderId, razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;
    if (!orderId || !razorpayOrderId || !razorpayPaymentId) {
      return res.status(400).json({
        success: false,
        error: { code: "BAD_REQUEST", message: "Missing required payment verification parameters" }
      });
    }

    const result = await verifyRazorpayPayment(orderId, razorpayOrderId, razorpayPaymentId, razorpaySignature);
    if (!result.success) {
      return res.status(400).json({ success: false, error: { code: "PAYMENT_VERIFICATION_FAILED", message: result.message } });
    }

    res.json({ success: true, message: result.message });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { code: "SERVER_ERROR", message: err.message } });
  }
});

router.post("/webhook", async (req, res) => {
  try {
    const signature = req.headers["x-razorpay-signature"] as string;
    const rawBody = JSON.stringify(req.body);

    if (process.env.RAZORPAY_WEBHOOK_SECRET && signature) {
      const isValid = await verifyWebhookSignature(rawBody, signature);
      if (!isValid) {
        return res.status(400).json({ success: false, message: "Invalid webhook signature" });
      }
    }

    const event = req.body.event;
    if (event === "payment.captured") {
      const paymentEntity = req.body.payload?.payment?.entity;
      if (paymentEntity?.order_id) {
        const order = await OrderModel.findOne({ razorpayOrderId: paymentEntity.order_id });
        if (order && order.paymentStatus !== "PAID") {
          order.paymentStatus = "PAID";
          order.orderStatus = "CONFIRMED";
          await order.save();
        }
      }
    }

    res.json({ status: "ok" });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { message: err.message } });
  }
});

export default router;
