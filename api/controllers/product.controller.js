import prisma from "../lib/prisma.js";
import multer from "multer";
import path from "path";
import fs from "fs";

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// ✅ Add Product Controller (with multer upload middleware)
export const addProduct = [
  upload.single("image"),
  async (req, res) => {
    try {
      const { title, description, price, sellerId, category, stock } = req.body;
      const imagePath = req.file ? `/uploads/${req.file.filename}` : "";

      // Check if the seller exists and is verified
      const seller = await prisma.seller.findUnique({
        where: { id: sellerId },
      });


      if (!seller.isVerified) {
        return res
          .status(403)
          .json({
            message:
              "Your seller account is under verification. You cannot add products yet.",
          });
      }

      // Proceed to create product
      const product = await prisma.product.create({
        data: {
          title,
          description,
          price: parseFloat(price),
          sellerId,
          category,
          stock: parseInt(stock),
          image: imagePath,
        },
      });

      res.status(201).json({ message: "Product added successfully", product });
    } catch (error) {
      console.error("Add Product Error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
];

// ✅ GET SINGLE PRODUCT BY ID
export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        seller: {
          select: {
            id: true,
            name: true,
            shopName: true,
          },
        },
        reviews: true,
      },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Get Product Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// EDIT PRODUCT
export const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, category, stock } = req.body;

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        title: title || product.title,
        description: description || product.description,
        price: price ? parseFloat(price) : product.price,
        category: category || product.category,
        stock: stock || product.stock,
      },
    });

    res
      .status(200)
      .json({ message: "Product updated", product: updatedProduct });
  } catch (error) {
    console.error("Edit Product Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        seller: {
          select: {
            id: true,
            shopName: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc", // newest first
      },
    });

    res.status(200).json(products);
  } catch (err) {
    console.error("Failed to get products:", err);
    res
      .status(500)
      .json({ message: "Something went wrong while fetching products." });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Optional: delete the image file from the server if stored locally
    // (assuming image path is like /uploads/filename.ext)
    if (existingProduct.image) {
      const imagePath = `public${existingProduct.image}`;
      try {
        fs.unlinkSync(imagePath);
      } catch (err) {
        console.warn("Image deletion failed:", err.message);
      }
    }

    await prisma.product.delete({
      where: { id },
    });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete Product Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const addReview = async (req, res) => {
  const { customerId, productId, comment, customerName } = req.body;

  if (!customerId || !productId || !comment || !customerName) {
    return res.status(400).json({
      message:
        "All fields (customerId, productId, comment, customerName) are required.",
    });
  }

  try {
    // Check for existing review by same user for the same product
    const existingReview = await prisma.review.findFirst({
      where: { customerId, productId },
    });

    if (existingReview) {
      return res.status(400).json({
        message: "You have already submitted a review for this product.",
      });
    }

    // Check if the order for this product has been delivered to the user
    const deliveredOrder = await prisma.order.findFirst({
      where: {
        customerId,
        productId,
        status: "delivered",
      },
    });

    if (!deliveredOrder) {
      return res.status(403).json({
        message: "Only products from delivered orders can be reviewed.",
      });
    }

    // Create review
    const review = await prisma.review.create({
      data: {
        customerId,
        productId,
        comment,
        customerName,
      },
    });

    res.status(201).json(review);
  } catch (err) {
    console.error("Add review failed:", err);
    res
      .status(500)
      .json({ message: "Something went wrong while submitting the review." });
  }
};
