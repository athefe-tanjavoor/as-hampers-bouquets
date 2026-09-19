import { z } from "zod";

export const checkoutSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please provide a valid email address"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Please provide a valid 10-digit Indian phone number"),
  street: z.string().min(5, "Delivery address is required"),
  landmark: z.string().optional(),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  pincode: z.string().regex(/^[1-9][0-9]{5}$/, "Please enter a valid 6-digit PIN code"),
  deliveryDate: z.string().min(10, "Please select a valid delivery date"),
  deliverySlotId: z.string().min(1, "Please select a delivery slot"),
  giftMessage: z.string().max(250, "Gift message cannot exceed 250 characters").optional(),
  paymentMethod: z.enum(["RAZORPAY", "COD"]),
  items: z.array(
    z.object({
      productId: z.string(),
      variantId: z.string().optional(),
      quantity: z.number().int().positive(),
      personalizationText: z.string().max(100).optional()
    })
  ).min(1, "Cart cannot be empty"),
  couponCode: z.string().optional()
});

export const pincodeCheckSchema = z.object({
  pincode: z.string().regex(/^[1-9][0-9]{5}$/, "Please enter a valid 6-digit PIN code")
});

export const corporateEnquirySchema = z.object({
  company: z.string().min(2, "Company name is required"),
  contactPerson: z.string().min(2, "Contact person name is required"),
  email: z.string().email("Valid corporate email is required"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Valid phone number is required"),
  quantity: z.string().min(1, "Estimated quantity is required"),
  deliveryCity: z.string().min(2, "Delivery city is required"),
  requiredDate: z.string().optional(),
  occasion: z.string().min(2, "Occasion is required"),
  budgetRange: z.string().optional(),
  customizationRequirements: z.string().min(10, "Please share some details about your requirements")
});

export const weddingEnquirySchema = z.object({
  name: z.string().min(2, "Your name is required"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Valid phone number is required"),
  email: z.string().email("Valid email is required"),
  eventDate: z.string().min(5, "Event date is required"),
  eventType: z.string().min(2, "Event type is required"),
  venueCity: z.string().min(2, "City and venue details are required"),
  budget: z.string().optional(),
  requirements: z.string().min(10, "Please describe your floral requirements")
});

export const reviewSubmitSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  customerName: z.string().min(2, "Name is required"),
  rating: z.number().int().min(1).max(5),
  title: z.string().min(3, "Title must be at least 3 characters"),
  comment: z.string().min(10, "Review comment must be at least 10 characters")
});
