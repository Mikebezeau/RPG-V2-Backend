import { Sequelize } from "sequelize";
import db from "../../config/database.js";

const { DataTypes } = Sequelize;

const Trait = db.define("trait", {
  trait_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  trait_type_id: {
    type: DataTypes.INTEGER,
  },
  trait_name: {
    type: DataTypes.STRING(100),
  },
});

const TraitType = db.define("trait_type", {
  trait_type_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  trait_type_name: {
    type: DataTypes.STRING(45),
  },
});

Trait.hasOne(TraitType, {
  foreignKey: "trait_type_id",
  sourceKey: "trait_type_id",
});
TraitType.belongsTo(Trait, {
  foreignKey: "trait_type_id",
});

export { Trait, TraitType };
