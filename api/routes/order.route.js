import express from "express";
import {
  createOrder,
  getOrder,
  updateOrderStatus,
} from "../controllers/order.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", getOrder);
router.post("/", createOrder);
router.put("/:id", updateOrderStatus); // update status manually

export default router;
