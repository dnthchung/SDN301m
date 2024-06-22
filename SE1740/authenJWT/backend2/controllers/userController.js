const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  //trong project anỳ ko xóa thật, mà chỉ shơ là đã xóa thui
  deleteUser: async (req, res) => {
    try {
      //   await User.findByIdAndDelete(req.params.id);
      const userFound = await User.findById(req.params.id);
      return res.status(200).json({ message: "User deleted ok" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

module.exports = userController;
