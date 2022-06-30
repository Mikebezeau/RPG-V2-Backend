import { Sequelize } from "sequelize";
import db from "../../config/database.js";

import { Ability } from "../abilityModel.js";

const { DataTypes } = Sequelize;

const Ancestry = db.define("ancestry", {
  ancestry_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  trait_id: {
    type: DataTypes.INTEGER,
  },
  size_id: {
    type: DataTypes.INTEGER,
  },
  ancestry_name: {
    type: DataTypes.STRING(100),
  },
  ancestry_description: {
    type: DataTypes.STRING(1000),
  },
  ancestry_hp: {
    type: DataTypes.INTEGER,
  },
  ancestry_speed: {
    type: DataTypes.INTEGER,
  },
  num_free_attr_boost: {
    type: DataTypes.INTEGER,
  },
});

//ancestry_attribute_boost_flaw

const AncestryAttributeBoostFlaw = db.define("ancestry_attribute_boost_flaw", {
  ancestry_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  attribute_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  is_flaw: {
    type: DataTypes.INTEGER,
  },
});

Ancestry.hasMany(AncestryAttributeBoostFlaw, {
  foreignKey: "ancestry_id",
  sourceKey: "ancestry_id",
});
AncestryAttributeBoostFlaw.belongsTo(Ancestry, {
  foreignKey: "ancestry_id",
  targetKey: "ancestry_id",
});

const AncestryAbility = db.define("ancestry_ability", {
  ancestry_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  ability_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
});

Ancestry.belongsToMany(Ability, {
  through: AncestryAbility,
  foreignKey: "ancestry_id",
  otherKey: "ability_id",
});
Ability.belongsTo(Ancestry, {
  through: AncestryAbility,
  foreignKey: "ability_id",
  otherKey: "ancestry_id",
});

export { Ancestry, AncestryAttributeBoostFlaw, AncestryAbility };
