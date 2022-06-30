import {
  CharClass,
  ClassAbility,
  ClassAttributeBoost,
  ClassSpecialty,
} from "../../models/gameData/charClassModel.js";

import { Ability } from "../../models/abilityModel.js";

export const getAllCharClass = async (req, res) => {
  try {
    const charClass = await CharClass.findAll({
      logging: false,
      include: [
        {
          model: ClassAttributeBoost,
        },
        {
          model: Ability,
        },
        {
          model: ClassSpecialty,
          include: [
            {
              model: Ability,
            },
          ],
        },
      ],
      order: [["class_name", "ASC"]],
    });
    res.json(charClass);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getCharClassById = async (req, res) => {
  try {
    const charClass = await CharClass.findAll({
      logging: false,
      where: {
        class_id: req.params.id,
      },
      include: [
        {
          model: ClassAttributeBoost,
        },
      ],
    });
    res.json(charClass[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};
