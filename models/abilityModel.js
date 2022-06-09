import { Sequelize } from "sequelize";
import db from "../config/database.js";

import { Effect } from "./effectModel.js";

const { DataTypes } = Sequelize;

const Ability = db.define("ability", {
  ability_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  ability_name: {
    type: DataTypes.STRING(100),
  },
  ability_description: {
    type: DataTypes.STRING(3000),
  },
});

const AbilityEffect = db.define("ability_effect", {
  ability_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  effect_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
});

Ability.belongsToMany(Effect, {
  through: AbilityEffect,
  foreignKey: "ability_id",
  otherKey: "effect_id",
});
Effect.belongsToMany(Ability, {
  through: AbilityEffect,
  foreignKey: "effect_id",
  otherKey: "ability_id",
});

export { Ability, AbilityEffect };
