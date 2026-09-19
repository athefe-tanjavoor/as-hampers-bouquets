import { DeliveryZoneModel } from "../models/DeliveryZone";
import { BRAND_CONFIG, DEFAULT_DELIVERY_SLOTS } from "@/lib/config";

export interface PincodeCheckResponse {
  serviceable: boolean;
  city: string;
  state: string;
  deliveryCharge: number;
  freeDeliveryThreshold: number;
  isSameDayAvailable: boolean;
  availableSlots: Array<{
    id: string;
    label: string;
    startTime: string;
    endTime: string;
    additionalFee: number;
    isAvailableToday: boolean;
  }>;
  message?: string;
}

export async function checkPincodeServiceability(pincode: string): Promise<PincodeCheckResponse> {
  const cleanPincode = pincode.trim();
  const zone = await DeliveryZoneModel.findOne({ pincode: cleanPincode, isActive: true });

  const currentHour = new Date().getHours();

  if (zone) {
    const slots = (zone.activeSlots && zone.activeSlots.length > 0 ? zone.activeSlots : DEFAULT_DELIVERY_SLOTS).map(
      (slot: any) => {
        const isAvailableToday = zone.isSameDayAvailable && currentHour < (slot.cutoffHour || 14);
        return {
          id: slot.id,
          label: slot.label,
          startTime: slot.startTime,
          endTime: slot.endTime,
          additionalFee: slot.additionalFee || 0,
          isAvailableToday
        };
      }
    );

    return {
      serviceable: true,
      city: zone.city,
      state: zone.state,
      deliveryCharge: zone.deliveryCharge,
      freeDeliveryThreshold: zone.freeDeliveryThreshold || BRAND_CONFIG.freeDeliveryThreshold,
      isSameDayAvailable: zone.isSameDayAvailable,
      availableSlots: slots
    };
  }

  // Fallback check: Valid 6-digit Indian PIN code default service area
  if (/^[1-9][0-9]{5}$/.test(cleanPincode)) {
    const slots = DEFAULT_DELIVERY_SLOTS.map((slot) => ({
      id: slot.id,
      label: slot.label,
      startTime: slot.startTime,
      endTime: slot.endTime,
      additionalFee: slot.additionalFee,
      isAvailableToday: currentHour < slot.cutoffHour
    }));

    return {
      serviceable: true,
      city: BRAND_CONFIG.primaryCity,
      state: "Tamil Nadu",
      deliveryCharge: BRAND_CONFIG.standardDeliveryFee,
      freeDeliveryThreshold: BRAND_CONFIG.freeDeliveryThreshold,
      isSameDayAvailable: currentHour < 16,
      availableSlots: slots,
      message: `Standard delivery available in ${cleanPincode}`
    };
  }

  return {
    serviceable: false,
    city: "",
    state: "",
    deliveryCharge: 0,
    freeDeliveryThreshold: 0,
    isSameDayAvailable: false,
    availableSlots: [],
    message: "Invalid or unserviceable pincode. Please verify your address."
  };
}
