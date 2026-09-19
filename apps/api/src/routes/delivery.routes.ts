import { Router } from "express";
import { checkPincodeServiceability } from "../services/delivery.service";

const router = Router();

router.get("/check-pincode", async (req, res) => {
  try {
    const pincode = req.query.pincode as string;
    if (!pincode) {
      return res.status(400).json({
        success: false,
        error: { code: "BAD_REQUEST", message: "Pincode is required" }
      });
    }

    const result = await checkPincodeServiceability(pincode);
    res.json({ success: true, data: result });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { code: "SERVER_ERROR", message: err.message } });
  }
});

export default router;
