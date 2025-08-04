import express from "express";
import { addProduct, addReview, deleteProduct, editProduct, getProduct, getProducts, getReviews } from "../controllers/product.controller.js";
import {verifyToken} from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/all", getProducts);
router.get("/reviews", getReviews);
router.get("/:id", getProduct);
router.post("/add", addProduct);
router.put("/:id", editProduct);
router.post("/review", addReview);
router.delete("/:id", deleteProduct);

export default router;
