import db from "../config/database.js";
import { QueryTypes } from "sequelize";
import { Ability, AbilityEffect } from "../models/abilityModel.js";
import { Effect, EffectAc, EffectAction } from "../models/effectModel.js";
import EffectHelper from "./helpers/EffectHelper.js";
import { SPECIAL_TYPE } from "../constants.js";

export const getAllAbility = async (req, res) => {
  try {
    const ability = await Ability.findAll();
    res.json(ability);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getAbilityById = async (req, res) => {
  try {
    const ability = await Ability.findAll({
      logging: false,
      where: {
        ability_id: req.params.id,
      },
      include: [
        {
          model: Effect,
          include: [
            {
              model: EffectAc,
            },
            {
              model: EffectAction,
            },
          ],
        },
      ],
    });
    res.json(ability[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const createAbility = async (req, res) => {
  try {
    await Ability.create(req.body);
    res.json({
      message: "Ability Created",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const saveAbility = async (req, res) => {
  let abilityId = req.params.id;
  let ability = req.body.ability;
  try {
    await Ability.update(ability, {
      where: {
        ability_id: abilityId,
      },
    });

    EffectHelper.deleteOldEffect(
      db,
      QueryTypes,
      SPECIAL_TYPE.ability,
      abilityId,
      Effect,
      effects
    );

    //delete all records in ability_effect relationship table for this ability_id
    AbilityEffect.destroy({ where: { ability_id: abilityId } });

    const effects = req.body.ability.effects;

    effects.map((effect) => {
      EffectHelper.saveEffect(
        db,
        SPECIAL_TYPE.ability,
        abilityId,
        Effect,
        effect
      );
    });

    res.json({
      message: "Ability Updated",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const deleteAbility = async (req, res) => {
  try {
    await Ability.destroy({
      where: {
        ability_id: req.params.id,
      },
    });
    res.json({
      message: "Ability Deleted",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
