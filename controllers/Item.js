import { ItemArmor, Item } from "../models/itemModel.js";

export const getAllItem = async (req, res) => {
  try {
    const item = await Item.findAll({ logging: false });
    res.json(item);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getItemById = async (req, res) => {
  try {
    const item = await Item.findAll({
      where: {
        item_id: req.params.id,
      },
    });
    res.json(item[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const createItem = async (req, res) => {
  try {
    await Item.create(req.body.item);
    res.json({
      message: "Item Created",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const updateItem = async (req, res) => {
  try {
    await Item.update(req.body.item, {
      where: {
        item_id: req.params.id,
      },
    });
    res.json({
      message: "Item Updated",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const deleteItem = async (req, res) => {
  try {
    await Item.destroy({
      where: {
        item_id: req.params.id,
      },
    });
    res.json({
      message: "Item Deleted",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
