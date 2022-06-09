import express from "express";
import {
  getAllAbility,
  createAbility,
  getAbilityById,
  saveAbility,
  //deleteAbility,
} from "../controllers/Ability.js";
//import //getAllEffect,
//createEffect,
//getEffectById,
//updateEffect,
//deleteEffect, //DELETE EFFECT IF EXISTS ON REMOVAL FROM SPECIAL ABILITY FORM
//"../controllers/EffectHelper.js";

const router = express.Router();

router.get("/", getAllAbility);
router.get("/:id", getAbilityById);
router.post("/", createAbility);
router.patch("/:id", saveAbility);
//router.delete("/:id", deleteAbility);

export default router;
