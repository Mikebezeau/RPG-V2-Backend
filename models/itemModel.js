import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const ItemArmor = db.define("item_armor", {
  item_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  ac_bonus: {
    type: DataTypes.INTEGER,
  },
  max_dex: {
    type: DataTypes.INTEGER,
  },
  skill_penalty: {
    type: DataTypes.INTEGER,
  },
  speed_penalty: {
    type: DataTypes.INTEGER,
  },
  req_strength: {
    type: DataTypes.INTEGER,
  },
  armor_category_const_value: {
    type: DataTypes.INTEGER,
  },
  armor_group_const_value: {
    type: DataTypes.INTEGER,
  },
});

const Item = db.define("item", {
  item_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  item_type_const_value: {
    type: DataTypes.INTEGER,
  },
  is_magical: {
    type: DataTypes.BOOLEAN,
  },
  name: {
    type: DataTypes.STRING(50),
  },
  description: {
    type: DataTypes.STRING(3000),
  },
  cost: {
    type: DataTypes.BOOLEAN,
  },
  hp: {
    type: DataTypes.INTEGER,
  },
  hardness: {
    type: DataTypes.INTEGER,
  },
  is_shoddy: {
    type: DataTypes.INTEGER,
  },
  bulk: {
    type: DataTypes.DECIMAL(4, 1),
  },
  req_hands_const_value: {
    type: DataTypes.INTEGER,
  },
  size_const_value: {
    type: DataTypes.INTEGER,
  },
  icon: {
    type: DataTypes.STRING(45),
  },
});

ItemArmor.hasOne(Item, { foreignKey: "item_id" });

export { ItemArmor, Item };
