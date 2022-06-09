import { Sequelize } from "sequelize";
import db from "../../config/database.js";

const { DataTypes } = Sequelize;

const Background = db.define("background", {
  background_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  background_name: {
    type: DataTypes.STRING(45),
  },
  background_description: {
    type: DataTypes.STRING(1000),
  },
});

const BackgroundAttributeBoost = db.define("background_attribute_boost", {
  background_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  attribute_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
});

Background.hasMany(BackgroundAttributeBoost, {
  foreignKey: "background_id",
  sourceKey: "background_id",
});
BackgroundAttributeBoost.belongsTo(Background, {
  foreignKey: "background_id",
  targetKey: "background_id",
});

export { Background, BackgroundAttributeBoost };
