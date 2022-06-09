import { Sequelize } from "sequelize";
import db from "../config/database.js";

import { Trait } from "./gameData/traitModel.js";

const { DataTypes } = Sequelize;

const Feat = db.define("feat", {
  feat_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  feat_name: {
    type: DataTypes.STRING(50),
  },
  req_level: {
    type: DataTypes.INTEGER,
  },
  description: {
    type: DataTypes.STRING(3000),
  },
  o_licence: {
    type: DataTypes.BOOLEAN,
    defaultValue: 0,
  },
});

const FeatRequire = db.define("feat_require", {
  feat_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  feat_req_type_const_value: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  req_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  req_val: {
    type: DataTypes.INTEGER,
  },
  req_is_or: {
    type: DataTypes.BOOLEAN,
  },
});

Feat.hasMany(FeatRequire, { foreignKey: "feat_id" });

const FeatTrait = db.define("feat_trait", {
  feat_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  trait_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  trait_level: {
    type: DataTypes.INTEGER,
  },
});

Feat.belongsToMany(Trait, {
  through: FeatTrait,
  foreignKey: "feat_id",
  otherKey: "trait_id",
});
Trait.belongsToMany(Feat, {
  through: FeatTrait,
  foreignKey: "trait_id",
  otherKey: "feat_id",
});

export { Feat, FeatRequire, FeatTrait };
