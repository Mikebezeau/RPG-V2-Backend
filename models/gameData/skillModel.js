import { Sequelize } from "sequelize";
import db from "../../config/database.js";

const { DataTypes } = Sequelize;

const Skill = db.define("skill", {
  skill_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  attribute_id: {
    type: DataTypes.INTEGER,
  },
  skill_name: {
    type: DataTypes.STRING(100),
  },
  skill_description: {
    type: DataTypes.STRING(1000),
  },
  can_untrained: {
    type: DataTypes.INTEGER,
  },
});

export { Skill };
