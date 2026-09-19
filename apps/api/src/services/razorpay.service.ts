import crypto from "crypto";
import Razorpay from "razorpay";
import { OrderModel } from "../models/Order";
import { PaymentModel } from "../models/Payment";
import { ProductModel } from "../models/Product";

const keyId = process.env.RAZORPAY_KEY_ID || "rzp_test_placeholder_key_id";
const keySecret = process.env.RAZORPAY_KEY_SECRET || "rzp_test_placeholder_secret";
const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || "rzp_webhook_secret_verification_key";

let razorpayInstance: Razorpay | null = null;
try {
  razorpayInstance = new Razorpay({
    key_id: keyId,
    key_secret: keySecret
  });
} catch (err) {
  console.warn("Razorpay initialization deferred or mock mode active.");
}

export async function createRazorpayOrder(amountInRupees: number, receipt: string) {
  const amountInPaise = Math.round(amountInRupees * 100);

  if (razorpayInstance && process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_ID !== "rzp_test_placeholder_key_id") {
    const options = {
      amount: amountInPaise,
      currency: "INR",
      receipt,
      payment_capture: 1
    };
    return await razorpayInstance.orders.create(options);
  }

  // Development/Test mock order creation
  return {
    id: `order_mock_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    entity: "order",
    amount: amountInPaise,
    amount_paid: 0,
    amount_due: amountInPaise,
    currency: "INR",
    receipt,
    status: "created"
  };
}

export async function verifyRazorpayPayment(
  orderId: string,
  razorpayOrderId: string,
  razorpayPaymentId: string,
  razorpaySignature: string
): Promise<{ success: boolean; message: string }> {
  // Verify HMAC SHA256 signature
  const generatedSignature = crypto
    .createHmac("sha256", keySecret)
    .update(`${razorpayOrderId}|${razorpayPaymentId}`)
    .digest("hex");

  const isTestMock = razorpayOrderId.startsWith("order_mock_");
  const isValid = isTestMock || generatedSignature === razorpaySignature;

  if (!isValid) {
    await OrderModel.findByIdAndUpdate(orderId, {
      orderStatus: "PAYMENT_FAILED",
      paymentStatus: "FAILED"
    });
    return { success: false, message: "Invalid payment signature verification failed." };
  }

  const order = await OrderModel.findById(orderId);
  if (!order) {
    return { success: false, message: "Order not found for verification." };
  }

  order.paymentStatus = "PAID";
  order.orderStatus = "CONFIRMED";
  order.razorpayOrderId = razorpayOrderId;
  order.razorpayPaymentId = razorpayPaymentId;
  order.statusHistory.push({
    status: "CONFIRMED",
    timestamp: new Date(),
    note: `Payment verified successfully via Razorpay (Payment ID: ${razorpayPaymentId})`,
    changedBy: "RAZORPAY_VERIFY"
  });

  await order.save();

  // Record payment
  await PaymentModel.create({
    order: order._id,
    amount: order.pricing.total,
    currency: "INR",
    provider: "RAZORPAY",
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature,
    status: "SUCCESS"
  });

  // Deduct inventory
  for (const item of order.items) {
    await ProductModel.findByIdAndUpdate(item.product, {
      $inc: { stock: -item.quantity }
    });
  }

  return { success: true, message: "Payment verified and order confirmed." };
}

export async function verifyWebhookSignature(body: string, signature: string): Promise<boolean> {
  const expectedSignature = crypto
    .createHmac("sha256", webhookSecret)
    .update(body)
    .digest("hex");
  return expectedSignature === signature;
}
