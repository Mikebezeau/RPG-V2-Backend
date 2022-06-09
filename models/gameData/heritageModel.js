import { Sequelize } from "sequelize";
import db from "../../config/database.js";

const { DataTypes } = Sequelize;

const Heritage = db.define("heritage", {
  heritage_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  ancestry_id: {
    type: DataTypes.INTEGER,
  },
  heritage_name: {
    type: DataTypes.STRING(100),
  },
  heritage_description: {
    type: DataTypes.STRING(3000),
  },
});

export { Heritage };
