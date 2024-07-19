const db = require("../models");
const Option = db.option;

// CRUD
exports.create = async (req, res, next) => {
  try {
    const newOption = new Option({
      size: req.body.size,
      color: req.body.color,
    });

    const result = await newOption.save();
    if (!result) {
      return res.status(400).json({ message: "Cannot create option" });
    }
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

//get all - lấy tất cả option
exports.getAll = async (req, res, next) => {
  try {
    const result = await Option.find();
    if (!result) {
      return res.status(404).json({ message: "Cannot find option" });
    }
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
