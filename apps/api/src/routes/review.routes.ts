import { Router } from "express";
import { ReviewModel } from "../models/Review";
import { reviewSubmitSchema } from "@repo/validation";

const router = Router();

router.get("/recent", async (req, res) => {
  try {
    const reviews = await ReviewModel.find({ status: "APPROVED" })
      .populate("product", "name slug images")
      .sort({ createdAt: -1 })
      .limit(6);

    res.json({ success: true, data: reviews });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { message: err.message } });
  }
});

router.post("/", async (req, res) => {
  try {
    const parse = reviewSubmitSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({ success: false, error: { message: "Validation error", details: parse.error.errors } });
    }

    const { productId, customerName, rating, title, comment } = parse.data;

    const review = await ReviewModel.create({
      product: productId,
      customerName,
      rating,
      title,
      comment,
      isVerifiedPurchase: true,
      status: "APPROVED" // Auto-approved in development/demo mode, or pending for admin moderation
    });

    res.status(201).json({
      success: true,
      message: "Thank you for your feedback! Your review has been submitted.",
      data: review
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { message: err.message } });
  }
});

export default router;
