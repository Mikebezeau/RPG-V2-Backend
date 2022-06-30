import {
  Ancestry,
  AncestryAttributeBoostFlaw,
} from "../../models/gameData/ancestryModel.js";

export const getAllAncestry = async (req, res) => {
  try {
    const ancestry = await Ancestry.findAll({
      include: [
        {
          model: AncestryAttributeBoostFlaw,
        },
      ],
      order: [["ancestry_name", "ASC"]],
    });
    res.json(ancestry);
  } catch (error) {
    res.json({ message: error.message });
  }
};
