import { Router } from "express";
import { BlogPostModel } from "../models/BlogPost";
import { ProductModel } from "../models/Product";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const query: any = { status: "PUBLISHED" };
    if (req.query.category) query.category = req.query.category;

    const [posts, total] = await Promise.all([
      BlogPostModel.find(query).sort({ publishedAt: -1 }).skip(skip).limit(limit),
      BlogPostModel.countDocuments(query)
    ]);

    res.json({
      success: true,
      data: posts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { code: "SERVER_ERROR", message: err.message } });
  }
});

router.get("/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const post = await BlogPostModel.findOne({ slug, status: "PUBLISHED" });
    if (!post) {
      return res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: "Article not found" } });
    }

    // Related articles
    const relatedPosts = await BlogPostModel.find({
      _id: { $ne: post._id },
      category: post.category,
      status: "PUBLISHED"
    }).limit(3);

    // Recommended products for blog
    const recommendedProducts = await ProductModel.find({ status: "ACTIVE", bestseller: true }).limit(4);

    res.json({
      success: true,
      data: {
        post,
        relatedPosts,
        recommendedProducts
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { code: "SERVER_ERROR", message: err.message } });
  }
});

export default router;
