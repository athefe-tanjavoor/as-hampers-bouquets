import mongoose, { Schema, Document } from "mongoose";

export interface IDeliveryZoneDocument extends Document {
  pincode: string;
  city: string;
  state: string;
  deliveryCharge: number;
  freeDeliveryThreshold: number;
  isSameDayAvailable: boolean;
  cutoffTime: string;
  activeSlots: Array<{
    id: string;
    label: string;
    startTime: string;
    endTime: string;
    cutoffHour: number;
    additionalFee: number;
  }>;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const DeliverySlotOptionSchema = new Schema({
  id: { type: String, required: true },
  label: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  cutoffHour: { type: Number, default: 12 },
  additionalFee: { type: Number, default: 0 }
});

const DeliveryZoneSchema = new Schema<IDeliveryZoneDocument>(
  {
    pincode: { type: String, required: true, unique: true, index: true },
    city: { type: String, required: true, index: true },
    state: { type: String, required: true },
    deliveryCharge: { type: Number, default: 99 },
    freeDeliveryThreshold: { type: Number, default: 1499 },
    isSameDayAvailable: { type: Boolean, default: true },
    cutoffTime: { type: String, default: "17:00" },
    activeSlots: [DeliverySlotOptionSchema],
    isActive: { type: Boolean, default: true, index: true }
  },
  { timestamps: true }
);

export const DeliveryZoneModel =
  mongoose.models.DeliveryZone ||
  mongoose.model<IDeliveryZoneDocument>("DeliveryZone", DeliveryZoneSchema);
