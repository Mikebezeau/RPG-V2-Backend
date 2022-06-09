import { Trait, TraitType } from "../../models/gameData/traitModel.js";

export const getAllTrait = async (req, res) => {
  try {
    const trait = await Trait.findAll({
      logging: false,
      include: [
        {
          model: TraitType,
          //  required: false
        },
      ],
    });
    res.json(trait);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getTraitById = async (req, res) => {
  try {
    const trait = await Trait.findAll({
      logging: false,
      where: {
        trait_id: req.params.trait_id,
      },
    });
    res.json(trait[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const createTrait = async (req, res) => {
  try {
    await Trait.create(req.body);
    res.json({
      message: "Trait Created",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const updateTrait = async (req, res) => {
  try {
    await Trait.update(req.body, {
      where: {
        trait_id: req.params.trait_id,
      },
    });
    res.json({
      message: "Trait Updated",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const deleteTrait = async (req, res) => {
  try {
    await Trait.destroy({
      where: {
        trait_id: req.params.id,
      },
    });
    res.json({
      message: "Trait Deleted",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
