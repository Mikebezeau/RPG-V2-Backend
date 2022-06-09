import express from "express";

import {
  getAllItem,
  createItem,
  getItemById,
  updateItem,
  deleteItem,
} from "../controllers/Item.js";

const router = express.Router();

router.get("/", getAllItem);
router.get("/:id", getItemById);
router.post("/", createItem);
router.patch("/:id", updateItem);
router.delete("/:id", deleteItem);

export default router;
