import { Router } from "express";
import { trackOrder } from "../services/order.service";

const router = Router();

router.get("/track", async (req, res) => {
  try {
    const { orderNumber, contact } = req.query;
    if (!orderNumber || !contact) {
      return res.status(400).json({
        success: false,
        error: { code: "BAD_REQUEST", message: "Order number and email/phone are required to track order" }
      });
    }

    const order = await trackOrder(orderNumber as string, contact as string);
    if (!order) {
      return res.status(404).json({
        success: false,
        error: {
          code: "ORDER_NOT_FOUND",
          message: "We couldn't find an order matching those details. Please verify your order number and contact info."
        }
      });
    }

    res.json({
      success: true,
      data: {
        orderNumber: order.orderNumber,
        status: order.orderStatus,
        paymentStatus: order.paymentStatus,
        deliverySlot: order.deliverySlot,
        createdAt: order.createdAt,
        items: order.items,
        pricing: order.pricing,
        shippingAddress: {
          name: order.shippingAddress.name,
          city: order.shippingAddress.city,
          state: order.shippingAddress.state,
          pincode: order.shippingAddress.pincode
        },
        statusHistory: order.statusHistory
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { code: "SERVER_ERROR", message: err.message } });
  }
});

export default router;
