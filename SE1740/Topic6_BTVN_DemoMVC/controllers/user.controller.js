import { UserRepo } from "../repositories/index.js";

// Create a new user
const createUser = async (req, res) => {
  try {
    // get data from request body
    const { email, password, name, age, phone, type, role } = req.body;
    // create a new user
    const newUser = await UserRepo.createUser({
      email,
      password,
      name,
      age,
      phone,
      type,
      role,
    });
    // send response to client
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.toString() });
  }
};

//Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await UserRepo.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get user by id
const getAnUserById = async (req, res) => {
  try {
    // const { id } = req.params;
    const id = req.params.id;
    const userFound = await UserRepo.getAnUserById(id);
    res.status(200).json(userFound);
  } catch (error) {
    res.status(500).json({ message: error.toString() });
  }
};

//Update/Edit an user by id
const updateUserById = async (req, res) => {
  try {
    // const { id } = req.params;
    // const { email, password, name, age, phone, type, role } = req.body;
    // const updatedUser = await UserRepo.updateUserById(id, {
    //   email,
    //   password,
    //   name,
    //   age,
    //   phone,
    //   type,
    //   role,
    // });
    const updatedUser2 = await UserRepo.updateUserById(req.params, req.body);
    res.status(200).json(updatedUser2);
  } catch (error) {
    res.status(500).json({ message: error.toString() });
  }
};

export default {
  createUser,
  getAllUsers,
  getAnUserById,
  updateUserById,
};
