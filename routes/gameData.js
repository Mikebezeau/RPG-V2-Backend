import express from "express";

import { getAllAncestry } from "../controllers/gameData/Ancestry.js";
import { getAllBackground } from "../controllers/gameData/Background.js";
import { getAllCharClass } from "../controllers/gameData/CharClass.js";
import { getAllHeritage } from "../controllers/gameData/Heritage.js";
import { getAllSkill } from "../controllers/gameData/Skill.js";
import { getAllTrait } from "../controllers/gameData/Trait.js";

const router = express.Router();

router.get("/ancestry", getAllAncestry);
router.get("/background", getAllBackground);
router.get("/charClass", getAllCharClass);
router.get("/heritage", getAllHeritage);
router.get("/skill", getAllSkill);
router.get("/trait", getAllTrait);

export default router;
