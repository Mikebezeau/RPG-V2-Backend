import express from "express";

import {
  getAllFeat,
  createFeat,
  getFeatById,
  updateFeat,
  //deleteFeat,
} from "../controllers/Feat.js";

const router = express.Router();

router.get("/", getAllFeat);
router.get("/:id", getFeatById);
router.post("/", createFeat);
router.patch("/:id", updateFeat);
//router.delete("/:id", deleteFeat);

export default router;
