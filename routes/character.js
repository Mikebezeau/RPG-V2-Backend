import express from "express";

import {
  getAllCharacter,
  createCharacter,
  getCharacterById,
  updateCharacter,
  deleteCharacter,
} from "../controllers/Character.js";

const router = express.Router();

router.get("/", getAllCharacter);
router.get("/:id", getCharacterById);
router.post("/", createCharacter);
router.patch("/:id", updateCharacter);
router.delete("/:id", deleteCharacter);

export default router;
