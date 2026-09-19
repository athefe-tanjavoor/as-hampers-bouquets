import { Router } from "express";
import { SEOPageModel } from "../models/SEOPage";

const router = Router();

router.get("/page", async (req, res) => {
  try {
    const path = (req.query.path as string) || "/";
    const page = await SEOPageModel.findOne({ path });
    if (!page) {
      return res.status(404).json({ success: false, error: { message: "SEO page record not found" } });
    }

    res.json({ success: true, data: page });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { message: err.message } });
  }
});

router.get("/all-paths", async (req, res) => {
  try {
    const pages = await SEOPageModel.find({}, "path updatedAt");
    res.json({ success: true, data: pages });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { message: err.message } });
  }
});

export default router;
