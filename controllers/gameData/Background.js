import {
  Background,
  BackgroundAttributeBoost,
} from "../../models/gameData/backgroundModel.js";

export const getAllBackground = async (req, res) => {
  try {
    const background = await Background.findAll({
      include: [
        {
          model: BackgroundAttributeBoost,
        },
      ],
    });
    res.json(background);
  } catch (error) {
    res.json({ message: error.message });
  }
};
