import mongoose, { Schema, Document } from "mongoose";
import { ORDER_STATUSES, OrderStatus } from "@/lib/config";

export interface IOrderDocument extends Document {
  orderNumber: string;
  customer?: mongoose.Types.ObjectId;
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
  items: Array<{
    product: mongoose.Types.ObjectId;
    variantId?: string;
    name: string;
    sku: string;
    price: number;
    quantity: number;
    image: string;
    personalizationText?: string;
  }>;
  giftMessage?: string;
  deliverySlot?: {
    date: string;
    slotId: string;
    slotName: string;
    fee: number;
  };
  pricing: {
    subtotal: number;
    discount: number;
    deliveryFee: number;
    tax: number;
    total: number;
  };
  couponApplied?: {
    code: string;
    discountAmount: number;
  };
  paymentMethod: "RAZORPAY" | "COD";
  paymentStatus: "PENDING" | "AUTHORIZED" | "PAID" | "FAILED" | "REFUNDED";
  orderStatus: OrderStatus;
  statusHistory: Array<{
    status: OrderStatus;
    timestamp: Date;
    note?: string;
    changedBy?: string;
  }>;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  cancellationReason?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  variantId: { type: String },
  name: { type: String, required: true },
  sku: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
  image: { type: String, required: true },
  personalizationText: { type: String }
});

const OrderSchema = new Schema<IOrderDocument>(
  {
    orderNumber: { type: String, required: true, unique: true, index: true },
    customer: { type: Schema.Types.ObjectId, ref: "User", default: null, index: true },
    customerDetails: {
      name: { type: String, required: true },
      email: { type: String, required: true, index: true },
      phone: { type: String, required: true, index: true }
    },
    shippingAddress: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      street: { type: String, required: true },
      landmark: { type: String },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true, index: true }
    },
    items: [OrderItemSchema],
    giftMessage: { type: String },
    deliverySlot: {
      date: { type: String, required: true },
      slotId: { type: String, required: true },
      slotName: { type: String, required: true },
      fee: { type: Number, default: 0 }
    },
    pricing: {
      subtotal: { type: Number, required: true },
      discount: { type: Number, default: 0 },
      deliveryFee: { type: Number, default: 0 },
      tax: { type: Number, default: 0 },
      total: { type: Number, required: true }
    },
    couponApplied: {
      code: { type: String },
      discountAmount: { type: Number, default: 0 }
    },
    paymentMethod: { type: String, enum: ["RAZORPAY", "COD"], required: true },
    paymentStatus: {
      type: String,
      enum: ["PENDING", "AUTHORIZED", "PAID", "FAILED", "REFUNDED"],
      default: "PENDING",
      index: true
    },
    orderStatus: {
      type: String,
      enum: ORDER_STATUSES,
      default: "PENDING_PAYMENT",
      index: true
    },
    statusHistory: [
      {
        status: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
        note: { type: String },
        changedBy: { type: String }
      }
    ],
    razorpayOrderId: { type: String, index: true },
    razorpayPaymentId: { type: String },
    cancellationReason: { type: String },
    notes: { type: String }
  },
  { timestamps: true }
);

OrderSchema.index({ createdAt: -1, orderStatus: 1 });

export const OrderModel =
  mongoose.models.Order || mongoose.model<IOrderDocument>("Order", OrderSchema);
