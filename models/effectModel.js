import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Effect = db.define("effect", {
  effect_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  effect_name: {
    type: DataTypes.STRING(100),
  },
  effect_description: {
    type: DataTypes.STRING(3000),
  },
});

const EffectAc = db.define("effect_ac", {
  effect_ac_index: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  effect_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  value: {
    type: DataTypes.INTEGER,
  },
});

Effect.hasMany(EffectAc, {
  onDelete: "CASCADE",
  foreignKey: "effect_id",
  sourceKey: "effect_id",
});
EffectAc.belongsTo(Effect, {
  foreignKey: "effect_id",
  targetKey: "effect_id",
});

const EffectAction = db.define("effect_action", {
  effect_action_index: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  effect_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  action_penalty_const_value: {
    type: DataTypes.INTEGER,
  },
  action_bonus_const_value: {
    type: DataTypes.INTEGER,
  },
});

Effect.hasMany(EffectAction, {
  onDelete: "CASCADE",
  foreignKey: "effect_id",
  sourceKey: "effect_id",
});
EffectAction.belongsTo(Effect, {
  foreignKey: "effect_id",
  targetKey: "effect_id",
});

export { Effect, EffectAc, EffectAction };
