import express from "express";
import { createTransaction, getTransactions, getTransactionById, updateTransaction, deleteTransaction } from '../controllers/transactionController.js';

import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Transactions are public endpoints in the finance project
router.post("/", verifyToken, createTransaction);
router.get("/", verifyToken, getTransactions);
router.get("/:id", verifyToken, getTransactionById);
router.put("/:id", verifyToken, updateTransaction);
router.delete("/:id", verifyToken, deleteTransaction);

export default router;
