import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// ✅ Get a single seller by ID
export const getSeller = async (req, res) => {
  const { id } = req.params;

  console.log(id)

  try {
    const seller = await prisma.seller.findUnique({
      where: { id },
      include: {
        products: true,
        orders: true
      },
    });

    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    res.status(200).json(seller);
  } catch (error) {
    console.error("Error fetching seller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Get a single customer by ID
export const getCustomer = async (req, res) => {
  const { id } = req.params;

  try {
    const customer = await prisma.customer.findUnique({
      where: { id },
      include: {
        orders: true,
      },
    });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json(customer);
  } catch (error) {
    console.error("Error fetching customer:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// ✅ Get all users (sellers + customers)
export const getAllUsers = async (req, res) => {
  try {
    const [sellers, customers] = await Promise.all([
      prisma.seller.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          admin: false, // not available directly, we'll add manually
          isVerified: true,     
          shopName: true,
          createdAt: true,
        },
      }),
      prisma.customer.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
        },
      }),
    ]);

    const users = [
      ...sellers.map((s) => ({ ...s, role: "seller" })),
      ...customers.map((c) => ({ ...c, role: "customer" })),
    ];

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const verifySeller = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedUser = await prisma.seller.update({
      where: { id },
      data: { isVerified: true },
    });

    res.status(200).json({ message: "Seller verified successfully", user: updatedUser });
  } catch (error) {
    console.error("Error verifying seller:", error);
    res.status(500).json({ message: "Failed to verify seller" });
  }
};
