import prisma from "../lib/prisma.js"; // adjust the path to your Prisma client

export const createOrder = async (req, res) => {
  try {
    const { productId, quantity, address, customerId, title } = req.body;

    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { seller: true },
    });

    if (!product) return res.status(404).json({ message: "Product not found" });

    if (quantity > product.stock)
      return res.status(400).json({ message: "Insufficient stock" });

    if (!customerId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Customer ID missing" });
    }

    const newOrder = await prisma.order.create({
      data: {
        customerId,
        sellerId: product.sellerId,
        productId,
        quantity,
        address,
        title,
        total: quantity * product.price,
      },
    });

    // Reduce stock
    await prisma.product.update({
      where: { id: productId },
      data: {
        stock: product.stock - quantity,
      },
    });

    res.status(201).json({ message: "Order placed", order: newOrder });
  } catch (error) {
    console.error("Create order failed:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const validStatuses = ["pending", "delivered", "cancelled"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status." });
    }

    const updated = await prisma.order.update({
      where: { id },
      data: { status },
    });

    res.json({ message: `Order status updated to ${status}`, order: updated });
  } catch (err) {
    console.error("Status update error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
};

export const getOrder = async (req, res) => {
  const { customerId, productId } = req.query;

  if (!customerId || !productId) {
    return res.status(400).json({ error: "Missing customerId or productId" });
  }

  try {
    const orders = await prisma.order.findMany({
      where: {
        customerId,
        productId,
        status: "delivered", // Optional: If you only want delivered here
      },
    });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
