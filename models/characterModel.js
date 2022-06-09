import { Sequelize } from "sequelize";
import db from "../config/database.js";

import { Ancestry } from "./gameData/ancestryModel.js";
import { Background } from "./gameData/backgroundModel.js";
import { Heritage } from "./gameData/heritageModel.js";
import { CharClass, ClassSpecialty } from "./gameData/charClassModel.js";

const { DataTypes } = Sequelize;

const Character = db.define("master_character", {
  character_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  npc_template_id: {
    type: DataTypes.INTEGER,
  },
  character_type: {
    type: DataTypes.INTEGER,
  },
  campaign_id: {
    type: DataTypes.INTEGER,
  },
  ancestry_id: {
    type: DataTypes.INTEGER,
  },
  heritage_id: {
    type: DataTypes.INTEGER,
  },
  class_id: {
    type: DataTypes.INTEGER,
  },
  class_specialty_id: {
    type: DataTypes.INTEGER,
  },
  background_id: {
    type: DataTypes.INTEGER,
  },
  level: {
    type: DataTypes.INTEGER,
  },
  experience: {
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING(100),
  },
  description: {
    type: DataTypes.STRING(3000),
  },
  gender: {
    type: DataTypes.STRING(100),
  },
  height: {
    type: DataTypes.STRING(100),
  },
  weight: {
    type: DataTypes.STRING(100),
  },
  age: {
    type: DataTypes.INTEGER,
  },
  deity_id: {
    type: DataTypes.INTEGER,
  },
  sprite_id: {
    type: DataTypes.INTEGER,
  },
  thumb_pic_num: {
    type: DataTypes.INTEGER,
  },
  portrait_pic_num: {
    type: DataTypes.INTEGER,
  },
  full_pic_num: {
    type: DataTypes.INTEGER,
  },
  start_area_id: {
    type: DataTypes.INTEGER,
  },
  start_x: {
    type: DataTypes.INTEGER,
  },
  start_y: {
    type: DataTypes.INTEGER,
  },
});

const CharAttributeBoost = db.define("character_attribute_boost", {
  character_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  attribute_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  boost_type_const_value: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  level: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
});

Character.hasMany(CharAttributeBoost, {
  foreignKey: "character_id",
  sourceKey: "character_id",
});
CharAttributeBoost.belongsTo(Character, {
  foreignKey: "character_id",
  targetKey: "character_id",
});

const CharSkill = db.define("character_skill", {
  character_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  skill_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  skill_rank: {
    type: DataTypes.INTEGER,
  },
});

Character.hasMany(CharSkill, {
  foreignKey: "character_id",
  sourceKey: "character_id",
});
CharSkill.belongsTo(Character, {
  foreignKey: "character_id",
  targetKey: "character_id",
});

Ancestry.hasMany(Character, {
  foreignKey: "ancestry_id",
  sourceKey: "ancestry_id",
});
Character.belongsTo(Ancestry, {
  foreignKey: "ancestry_id",
  targetKey: "ancestry_id",
});

Background.hasMany(Character, {
  foreignKey: "background_id",
  sourceKey: "background_id",
});
Character.belongsTo(Background, {
  foreignKey: "background_id",
  targetKey: "background_id",
});

Heritage.hasMany(Character, {
  foreignKey: "heritage_id",
  sourceKey: "heritage_id",
});
Character.belongsTo(Heritage, {
  foreignKey: "heritage_id",
  targetKey: "heritage_id",
});

CharClass.hasMany(Character, { foreignKey: "class_id", sourceKey: "class_id" });
Character.belongsTo(CharClass, {
  foreignKey: "class_id",
  targetKey: "class_id",
});

ClassSpecialty.hasMany(Character, {
  foreignKey: "class_specialty_id",
  sourceKey: "class_specialty_id",
});
Character.belongsTo(ClassSpecialty, {
  foreignKey: "class_specialty_id",
  targetKey: "class_specialty_id",
});

export { Character, CharAttributeBoost, CharSkill };
