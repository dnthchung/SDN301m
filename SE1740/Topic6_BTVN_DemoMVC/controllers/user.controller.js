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
    if (userFound === 0) {
      res.status(404).json({ message: "User not found!" });
    } else {
      res.status(200).json(userFound);
    }
  } catch (error) {
    res.status(500).json({ message: error.toString() });
  }
};

// Update a user by id - USER - no ROLE
const updateUserById2 = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser2 = await UserRepo.updateUserById2(id, req.body);
    if (updatedUser2.status === 1) {
      res.status(200).json(updatedUser2);
    } else {
      res.status(400).json(updatedUser2);
    }
  } catch (error) {
    res.status(500).json({ message: error.toString() });
  }
};

//Delete a user by id - USER | delete account
const deleteAnUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await UserRepo.deleteAnUserById(id);
    if (deletedUser.status === 1) {
      res.status(200).json({ message: "Delete successfully!" });
    } else {
      res.status(400).json(deletedUser);
    }
  } catch (error) {
    res.status(500).json({ message: error.toString() });
  }
};

// Update role for a user by id - ADMIN
const updateRoleUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const updatedRole = await UserRepo.updateRoleUserById(id, role);
    if (updatedRole.status === 1) {
      res.status(200).json(updatedRole);
    } else {
      res.status(400).json(updatedRole);
    }
  } catch (error) {
    res.status(500).json({ message: error.toString() });
  }
};

export default {
  createUser,
  getAllUsers,
  getAnUserById,
  updateUserById2,
  deleteAnUserById,
  updateRoleUserById,
};
