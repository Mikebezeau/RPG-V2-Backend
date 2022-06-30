import { Skill } from "../../models/gameData/skillModel.js";

export const getAllSkill = async (req, res) => {
  try {
    const skill = await Skill.findAll({
      order: [["skill_name", "ASC"]],
    });
    res.json(skill);
  } catch (error) {
    res.json({ message: error.message });
  }
};
