import { Skill } from "../../models/gameData/skillModel.js";

export const getAllSkill = async (req, res) => {
  try {
    const skill = await Skill.findAll({
      logging: false,
    });
    res.json(skill);
  } catch (error) {
    res.json({ message: error.message });
  }
};
