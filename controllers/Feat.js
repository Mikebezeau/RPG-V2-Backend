import { Feat, FeatRequire } from "../models/featModel.js";

import { Trait } from "../models/gameData/traitModel.js";

export const getAllFeat = async (req, res) => {
  try {
    const feat = await Feat.findAll({
      logging: false,
      include: [
        {
          model: FeatRequire,
          //  required: false
        },
        {
          model: Trait,
        },
      ],
    });
    res.json(feat);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getFeatById = async (req, res) => {
  try {
    const feat = await Feat.findAll({
      logging: false,
      where: {
        feat_id: req.params.id,
      },
    });
    res.json(feat[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const createFeat = async (req, res) => {
  try {
    await Feat.create(req.body);
    res.json({
      message: "Feat Created",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const updateFeat = async (req, res) => {
  try {
    await Feat.update(req.body, {
      where: {
        feat_id: req.params.id,
      },
    });
    res.json({
      message: "Feat Updated",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const deleteFeat = async (req, res) => {
  try {
    await Feat.destroy({
      where: {
        feat_id: req.params.id,
      },
    });
    res.json({
      message: "Feat Deleted",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
