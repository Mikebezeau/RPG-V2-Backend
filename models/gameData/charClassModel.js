import { Sequelize } from "sequelize";
import db from "../../config/database.js";

import { Ability } from "../abilityModel.js";

const { DataTypes } = Sequelize;

const CharClass = db.define("class", {
  class_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  class_name: {
    type: DataTypes.STRING(45),
  },
  class_description: {
    type: DataTypes.STRING(3000),
  },
  magic_attribute_id: {
    type: DataTypes.INTEGER,
  },
  magic_type_id: {
    type: DataTypes.INTEGER,
  },
  fort_rank: {
    type: DataTypes.INTEGER,
  },
  ref_rank: {
    type: DataTypes.INTEGER,
  },
  will_rank: {
    type: DataTypes.INTEGER,
  },
  hp_per_level: {
    type: DataTypes.INTEGER,
  },
  num_skill_first_level: {
    type: DataTypes.INTEGER,
  },
  perception_rank: {
    type: DataTypes.INTEGER,
  },
  magic_tradition_trait_id: {
    type: DataTypes.INTEGER,
  },
});

const ClassAttributeBoost = db.define("class_attribute_boost", {
  class_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  attribute_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
});

CharClass.hasMany(ClassAttributeBoost, {
  foreignKey: "class_id",
  sourceKey: "class_id",
});
ClassAttributeBoost.belongsTo(CharClass, {
  foreignKey: "class_id",
  targetKey: "class_id",
});

const ClassSpecialty = db.define("class_specialty", {
  class_specialty_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  class_id: {
    type: DataTypes.INTEGER,
  },
  class_specialty_name: {
    type: DataTypes.STRING(45),
  },
  class_specialty_description: {
    type: DataTypes.STRING(1000),
  },
});

CharClass.hasMany(ClassSpecialty, {
  foreignKey: "class_id",
  sourceKey: "class_id",
});
ClassSpecialty.belongsTo(CharClass, {
  foreignKey: "class_id",
  targetKey: "class_id",
});

const ClassSpecialtyAbility = db.define("class_specialty_ability", {
  class_specialty_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  ability_id: {
    type: DataTypes.INTEGER,
  },
  level_gained: {
    type: DataTypes.INTEGER,
  },
});

ClassSpecialty.belongsToMany(Ability, {
  through: ClassSpecialtyAbility,
  foreignKey: "class_specialty_id",
  otherKey: "ability_id",
});
Ability.belongsTo(ClassSpecialty, {
  through: ClassSpecialtyAbility,
  foreignKey: "ability_id",
  otherKey: "class_specialty_id",
});

export {
  CharClass,
  ClassAttributeBoost,
  ClassSpecialty,
  ClassSpecialtyAbility,
};
