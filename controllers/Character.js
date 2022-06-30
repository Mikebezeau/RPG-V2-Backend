import {
  Character,
  CharAttributeBoost,
  CharSkillIncrease,
} from "../models/characterModel.js";

import {
  Ancestry,
  AncestryAttributeBoostFlaw,
} from "../models/gameData/ancestryModel.js";

import {
  Background,
  BackgroundAttributeBoost,
} from "../models/gameData/backgroundModel.js";

import { Heritage } from "../models/gameData/heritageModel.js";

import {
  CharClass,
  ClassAttributeBoost,
  ClassSpecialty,
} from "../models/gameData/charClassModel.js";

import { Ability } from "../models/abilityModel.js";

export const getAllCharacter = async (req, res) => {
  try {
    const character = await Character.findAll({
      order: [["name", "ASC"]],
    });
    res.json(character);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getCharacterById = async (req, res) => {
  try {
    const character = await Character.findAll({
      where: {
        character_id: req.params.id,
      },
      include: [
        {
          model: Ancestry,
          include: [
            {
              model: AncestryAttributeBoostFlaw,
            },
          ],
        },
        {
          model: Background,
          include: [
            {
              model: BackgroundAttributeBoost,
            },
          ],
        },
        {
          model: Heritage,
        },
        {
          model: CharClass,
          include: [
            {
              model: ClassAttributeBoost,
            },
            {
              model: Ability,
            },
          ],
        },
        {
          model: ClassSpecialty,
          include: [
            {
              model: Ability,
            },
          ],
        },
        {
          model: CharAttributeBoost,
        },
        {
          model: CharSkillIncrease,
        },
      ],
    });
    res.json(character[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const createCharacter = async (req, res) => {
  try {
    await Character.create(req.body);
    res.json({
      message: "Character Created",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const updateCharacter = async (req, res) => {
  const characterId = req.params.id;
  try {
    await Character.update(req.body.character, {
      where: {
        character_id: characterId,
      },
    });

    //delete all records in ability_effect relationship table for this ability_id
    CharAttributeBoost.destroy({ where: { character_id: characterId } });

    const attributeBoosts = req.body.character.character_attribute_boosts;

    attributeBoosts.forEach((boost) => {
      CharAttributeBoost.create(boost);
    });

    res.json({
      message: "Character Updated:",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const deleteCharacter = async (req, res) => {
  try {
    await Character.destroy({
      where: {
        character_id: req.params.id,
      },
    });
    CharAttributeBoost.destroy({ where: { character_id: characterId } });

    res.json({
      message: "Character Deleted",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
