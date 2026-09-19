import { Router } from "express";
import { BRAND_CONFIG, SITE_NAVIGATION, PRICE_COLLECTIONS, COLOR_TOKENS } from "@repo/config";

const router = Router();

router.get("/brand", (req, res) => {
  res.json({
    success: true,
    data: {
      brand: BRAND_CONFIG,
      navigation: SITE_NAVIGATION,
      priceCollections: PRICE_COLLECTIONS,
      colors: COLOR_TOKENS
    }
  });
});

export default router;
