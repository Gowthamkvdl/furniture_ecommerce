
import express from "express";
import { getSeller, getCustomer, getAllUsers, verifySeller } from "../controllers/user.controller.js";
import {verifyToken} from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/seller/:id", getSeller);
router.put("/verify-seller/:id", verifySeller);
router.get("/customer/:id", getCustomer);
router.get("/", getAllUsers);

export default router;  