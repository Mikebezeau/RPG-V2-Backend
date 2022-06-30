import { Heritage } from "../../models/gameData/heritageModel.js";

export const getAllHeritage = async (req, res) => {
  try {
    const heritage = await Heritage.findAll({
      order: [["heritage_name", "ASC"]],
    });
    res.json(heritage);
  } catch (error) {
    res.json({ message: error.message });
  }
};
