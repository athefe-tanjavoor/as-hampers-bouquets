import { Router } from "express";
import { HomepageSectionModel } from "../models/HomepageSection";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const sections = await HomepageSectionModel.find({ isActive: true }).sort({ sortOrder: 1 });
    res.json({ success: true, data: sections });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { code: "SERVER_ERROR", message: err.message } });
  }
});

export default router;
