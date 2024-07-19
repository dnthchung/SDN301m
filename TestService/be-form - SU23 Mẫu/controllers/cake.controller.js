const db = require("../models");
const Cake = db.cake;
const Option = db.option;
// CRUD
exports.create = async (req, res, next) => {
  try {
    console.log(req.body);
    const newCake = new Cake({
      type: req.body.type,
      name: req.body.name,
      price: req.body.price,
      topping: req.body.topping,
      option: req.body.option,
    });

    const result = await newCake.save();
    if (!result) {
      return res.status(400).json({ message: "Cannot create cake" });
    }
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

//get all - lấy tất cả cake - riềng attribute topping (ref) -> trả về id
exports.getAll = async (req, res, next) => {
  try {
    const result = await Cake.find();
    if (!result) {
      return res.status(404).json({ message: "Cannot find cake" });
    }
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

//get all - lấy tất cả cake - riềng attribute topping (ref) -> trả về 1 attribute của topping
// populate("topping", "type") -> (tên model ref, attribute cần lấy)
// nếu không muốn lấy _id thì
exports.getAll2 = async (req, res, next) => {
  try {
    const result = await Cake.find()
      .populate({
        path: "topping",
        select: "type price_extra -_id",
      })
      .populate("option", "size -_id");
    if (!result) {
      return res.status(404).json({ message: "Cannot find cake" });
    }
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

exports.getAll3 = async (req, res, next) => {
  try {
    const result = await Cake.find()
      .populate({
        path: "topping",
        select: "type price_extra -_id",
      })
      .populate("option", "size -_id")
      .lean(); // Convert Mongoose documents to plain JavaScript objects

    if (!result) {
      return res.status(404).json({ message: "Cannot find cake" });
    }

    // Transform the result to change option object to option value
    const transformedResult = result.map((cake) => ({
      ...cake,
      option: cake.option.size,
    }));

    return res.status(200).json(transformedResult);
  } catch (error) {
    next(error);
  }
};

exports.getAll5 = async (req, res, next) => {
  try {
    const result = await Cake.find();
    const result2 = await Cake.find().populate("option").populate({
      path: "topping",
      select: "type price_extra -_id ",
    });
    console.log(result2);

    if (!result) {
      return res.status(404).json({ message: "Cannot find cake" });
    }

    const newResult = result2.map((cake) => {
      return {
        type: cake.type,
        name: cake.name,
        price: cake.price,
        topping: cake.topping,
        optionID: cake.option._id,
        optionSize: cake.option.size,
      };
    });

    return res.status(200).json(newResult);
  } catch (error) {
    next(error);
  }
};

/**
 * Get all cakes with pagination.
 */
exports.getAllWithPagination = async (req, res, next) => {
  try {
    //khai báo page, limit, skip (đều lấy từ url)
    //ví dụ : http://localhost:9999/cake/getAllWithPagination?page=1&limit=5  <- lấy từ url
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
    const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page if not specified
    const skip = (page - 1) * limit;

    // Get total number of cakes
    const totalCakes = await Cake.countDocuments();
    const totalPages = Math.ceil(totalCakes / limit);

    // Get cakes with pagination
    const cakes = await Cake.find().skip(skip).limit(limit).populate("topping").populate("option");

    if (!cakes) {
      return res.status(404).json({ message: "Cannot find cakes" });
    }

    return res.status(200).json({
      page,
      totalPages,
      limit,
      totalCakes,
      cakes,
    });
  } catch (error) {
    next(error);
  }
};

//update - thay thế toàn bộ thông tin của 1 cake tìm được bằng cakeId ( có thể là :id)
exports.update = async (req, res, next) => {
  try {
    //get data from request
    const cakeId = req.params.cakeId;
    const updatedCake = {
      type: req.body.type,
      name: req.body.name,
      price: req.body.price,
    };

    const result = await Cake.findByIdAndUpdate(
      cakeId,
      {
        $set: { updatedCake },
        $addToSet: { topping: req.body.topping },
      },
      { new: true },
    );

    if (!result) {
      return res.status(404).json({ message: "Cannot update new all data 1 cake" });
    }
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

//delete - xóa 1 cake tìm được bằng cakeId ( có thể là :id)
exports.delete = async (req, res, next) => {
  try {
    const cakeId = req.params.id;
    const result = await Cake.findByIdAndDelete(cakeId);
    if (!result) {
      return res.status(404).json({ message: "Cannot delete cake" });
    }
    return res.status(200).json({ message: "Delete cake successfully" });
  } catch (error) {
    next(error);
  }
};
