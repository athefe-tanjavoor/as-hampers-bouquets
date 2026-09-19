import { Router } from "express";
import { calculateCartPricing } from "../services/pricing.service";
import { CouponModel } from "../models/Coupon";

const router = Router();

router.post("/recalculate", async (req, res) => {
  try {
    const { items, couponCode, deliveryCharge } = req.body;
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.json({
        success: true,
        data: {
          items: [],
          subtotal: 0,
          discount: 0,
          deliveryFee: 0,
          tax: 0,
          total: 0
        }
      });
    }

    const pricing = await calculateCartPricing(items, couponCode, deliveryCharge);
    res.json({ success: true, data: pricing });
  } catch (err: any) {
    res.status(400).json({ success: false, error: { code: "PRICING_ERROR", message: err.message } });
  }
});

router.post("/coupon/validate", async (req, res) => {
  try {
    const { code, subtotal } = req.body;
    if (!code) {
      return res.status(400).json({ success: false, error: { code: "BAD_REQUEST", message: "Coupon code required" } });
    }

    const coupon = await CouponModel.findOne({
      code: code.trim().toUpperCase(),
      isActive: true,
      endDate: { $gte: new Date() }
    });

    if (!coupon) {
      return res.status(404).json({ success: false, error: { code: "INVALID_COUPON", message: "Coupon is invalid or expired." } });
    }

    if (coupon.minOrderAmount && (subtotal || 0) < coupon.minOrderAmount) {
      return res.status(400).json({
        success: false,
        error: {
          code: "MIN_ORDER_UNMET",
          message: `Minimum order amount of ₹${coupon.minOrderAmount} required for this coupon.`
        }
      });
    }

    res.json({
      success: true,
      data: {
        code: coupon.code,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
        maxDiscountAmount: coupon.maxDiscountAmount
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { code: "SERVER_ERROR", message: err.message } });
  }
});

export default router;
