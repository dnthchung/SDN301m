const db = require("../models");
const Topping = db.topping;

// CRUD
exports.create = async (req, res, next) => {
  try {
    const newTopping = new Topping({
      type: req.body.type,
      price_extra: req.body.price_extra,
    });

    const result = await newTopping.save();
    if (!result) {
      return res.status(400).json({ message: "Cannot create topping" });
    }
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const result = await Topping.find();
    if (!result) {
      return res.status(404).json({ message: "Cannot find topping" });
    }
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

//update - thay thế toàn bộ thông tin của 1 topping tìm được bằng toppingId ( có thể là :id)
exports.update = async (req, res, next) => {
  try {
    const toppingId = req.params.id;
    const updatedTopping = {
      name: req.body.name,
      price_extra: req.body.price_extra,
    };

    const result = await Topping.findByIdAndUpdate(toppingId, updatedTopping, { new: true });
    if (!result) {
      return res.status(404).json({ message: "Cannot update new all data 1 topping" });
    }
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

//delete - xóa 1 topping tìm được bằng toppingId ( có thể là :id)
exports.delete = async (req, res, next) => {
  try {
    const toppingId = req.params.id;
    const result = await Topping.findByIdAndRemove(toppingId);
    if (!result) {
      return res.status(404).json({ message: "Cannot delete topping" });
    }
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
