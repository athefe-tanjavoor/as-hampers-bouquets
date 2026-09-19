import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/connection";
import { OrderModel } from "@/lib/db/models/Order";
import { ProductModel } from "@/lib/db/models/Product";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [
      totalOrders,
      todayOrders,
      pendingOrders,
      processingOrders,
      outForDeliveryOrders,
      deliveredOrders,
      revenueResult,
      lowStockProducts,
      recentOrders
    ] = await Promise.all([
      OrderModel.countDocuments(),
      OrderModel.countDocuments({ createdAt: { $gte: today } }),
      OrderModel.countDocuments({ orderStatus: "PENDING_PAYMENT" }),
      OrderModel.countDocuments({ orderStatus: { $in: ["CONFIRMED", "PROCESSING", "PACKED"] } }),
      OrderModel.countDocuments({ orderStatus: { $in: ["DISPATCHED", "OUT_FOR_DELIVERY"] } }),
      OrderModel.countDocuments({ orderStatus: "DELIVERED" }),
      OrderModel.aggregate([
        { $match: { paymentStatus: "PAID" } },
        { $group: { _id: null, totalRevenue: { $sum: "$pricing.total" } } }
      ]),
      ProductModel.find({ stock: { $lte: 5 }, status: "ACTIVE" }).select("name stock price sku images"),
      OrderModel.find().sort({ createdAt: -1 }).limit(8)
    ]);

    const totalRevenue = revenueResult[0]?.totalRevenue || 0;

    return successResponse({
      metrics: {
        totalRevenue,
        totalOrders,
        todayOrders,
        pendingOrders,
        processingOrders,
        outForDeliveryOrders,
        deliveredOrders,
        lowStockCount: lowStockProducts.length
      },
      lowStockProducts,
      recentOrders
    });
  } catch (err: any) {
    return errorResponse(err.message);
  }
}
