import { OrderModel, IOrderDocument } from "../models/Order";
import { ProductModel } from "../models/Product";
import { AuditLogModel } from "../models/AuditLog";
import { calculateCartPricing, CartItemInput } from "./pricing.service";
import { VALID_ORDER_TRANSITIONS, OrderStatus } from "@/lib/config";
import { generateOrderNumber } from "@/lib/utils";

export interface CreateOrderParams {
  customerId?: string;
  customerDetails: {
    name: string;
    email: string;
    phone: string;
  };
  shippingAddress: {
    name: string;
    phone: string;
    street: string;
    landmark?: string;
    city: string;
    state: string;
    pincode: string;
  };
  items: CartItemInput[];
  giftMessage?: string;
  deliverySlot: {
    date: string;
    slotId: string;
    slotName: string;
    fee: number;
  };
  paymentMethod: "RAZORPAY" | "COD";
  couponCode?: string;
}

export async function createOrder(params: CreateOrderParams): Promise<IOrderDocument> {
  // 1. Calculate and verify pricing server-side
  const pricing = await calculateCartPricing(params.items, params.couponCode, params.deliverySlot.fee);

  // 2. Validate stock availability
  for (const item of pricing.items) {
    const product = await ProductModel.findById(item.productId);
    if (!product || product.stock < item.quantity) {
      throw new Error(`Insufficient inventory for item: ${item.name}`);
    }
  }

  // 3. Generate unique order number
  const orderNumber = generateOrderNumber();

  const initialStatus: OrderStatus = params.paymentMethod === "COD" ? "CONFIRMED" : "PENDING_PAYMENT";
  const initialPaymentStatus = params.paymentMethod === "COD" ? "AUTHORIZED" : "PENDING";

  const order = new OrderModel({
    orderNumber,
    customer: params.customerId || null,
    customerDetails: params.customerDetails,
    shippingAddress: params.shippingAddress,
    items: pricing.items.map((i) => ({
      product: i.productId,
      variantId: i.variantId,
      name: i.name,
      sku: i.sku,
      price: i.price,
      quantity: i.quantity,
      image: i.image,
      personalizationText: i.personalizationText
    })),
    giftMessage: params.giftMessage,
    deliverySlot: params.deliverySlot,
    pricing: {
      subtotal: pricing.subtotal,
      discount: pricing.discount,
      deliveryFee: pricing.deliveryFee,
      tax: pricing.tax,
      total: pricing.total
    },
    couponApplied: pricing.couponApplied,
    paymentMethod: params.paymentMethod,
    paymentStatus: initialPaymentStatus,
    orderStatus: initialStatus,
    statusHistory: [
      {
        status: initialStatus,
        timestamp: new Date(),
        note: `Order created via ${params.paymentMethod}`,
        changedBy: "SYSTEM"
      }
    ]
  });

  await order.save();

  // Deduct inventory if COD (for Razorpay, inventory is deducted on verification)
  if (params.paymentMethod === "COD") {
    for (const item of pricing.items) {
      await ProductModel.findByIdAndUpdate(item.productId, {
        $inc: { stock: -item.quantity }
      });
    }
  }

  return order;
}

export async function transitionOrderStatus(
  orderId: string,
  newStatus: OrderStatus,
  changedBy = "ADMIN",
  note?: string
): Promise<IOrderDocument> {
  const order = await OrderModel.findById(orderId);
  if (!order) {
    throw new Error("Order not found");
  }

  const currentStatus = order.orderStatus as OrderStatus;
  const allowedTransitions = VALID_ORDER_TRANSITIONS[currentStatus] || [];

  if (!allowedTransitions.includes(newStatus)) {
    throw new Error(`Invalid status transition from ${currentStatus} to ${newStatus}`);
  }

  const oldStatus = order.orderStatus;
  order.orderStatus = newStatus;
  order.statusHistory.push({
    status: newStatus,
    timestamp: new Date(),
    note: note || `Status changed from ${oldStatus} to ${newStatus}`,
    changedBy
  });

  await order.save();

  await AuditLogModel.create({
    action: "ORDER_STATUS_CHANGED",
    module: "ORDERS",
    recordId: order._id.toString(),
    oldValue: { status: oldStatus },
    newValue: { status: newStatus },
    userAgent: changedBy
  });

  return order;
}

export async function trackOrder(orderNumber: string, contact: string): Promise<IOrderDocument | null> {
  const cleanOrderNumber = orderNumber.trim();
  const cleanContact = contact.trim().toLowerCase();

  const order = await OrderModel.findOne({
    orderNumber: cleanOrderNumber,
    $or: [{ "customerDetails.email": cleanContact }, { "customerDetails.phone": cleanContact }]
  }).populate("items.product", "name images slug");

  return order;
}
