import db from "../config/database.js";
import { Effect, EffectAc, EffectAction } from "../models/effectModel.js";
import EffectHelper from "./helpers/EffectHelper.js";
/*
export const getAllEffect = async (req, res) => {
  try {
    const effect = await Effect.findAll({ logging: false });
    res.json(effect);
  } catch (error) {
    res.json({ message: error.message });
  }
};
*/

export const getEffectById = async (req, res) => {
  try {
    const effect = await Effect.findAll({
      where: {
        effect_id: req.params.id,
      },
      include: [
        {
          model: EffectAc,
        },
        {
          model: EffectAction,
        },
      ],
    });
    res.json(effect[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const createEffect = async (req, res) => {
  try {
    await Effect.create(req.body.effect, {
      include: [
        {
          model: EffectAc,
        },
        {
          model: EffectAction,
        },
      ],
    });
    res.json({
      message: "Effect Created",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
/*
export const updateEffect = async (req, res) => {
  const id = req.params.id;
  try {
    await Effect.update(req.body.effect, {
      where: {
        effect_id: id,
      },
    });

    //delete all sub effects
    await EffectHelper.deleteSubEffect(db, id);

    let query = "";

    req.body.effect.effect_acs.map(async (effect_ac, i) => {
      query += `INSERT INTO effect_ac (effect_ac_index, effect_id, value) 
      VALUES (${i}, ${id}, ${effect_ac.value});`;
    });

    req.body.effect.effect_actions.map(async (effect_action, i) => {
      query += `INSERT INTO effect_action (effect_action_index, effect_id, action_penalty_const_value,action_bonus_const_value) 
      VALUES (${i}, ${id}, ${effect_action.action_penalty_const_value}, ${effect_action.action_bonus_const_value});`;
    });

    await db.query(query);

    res.json({
      message: "Effect Updated",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
*/
export const deleteEffect = async (req, res) => {
  try {
    await Effect.destroy({
      where: {
        effect_id: req.params.id,
      },
    });
    await EffectHelper.deleteSubEffect(db, id);
    res.json({
      message: "Effect Deleted",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
