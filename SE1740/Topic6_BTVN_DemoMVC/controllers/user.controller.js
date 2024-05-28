import { UserRepo } from "../repositories/index.js";

// Create a new user
// POST
// http://localhost:9999/user
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
    res.status(500).json({ message: error.message });
  }
};

export default {
  createUser,
};
