// repositories/user.repo.js

import User from "../models/user.model.js";
import Role from "../models/role.model.js";

// Create a new user
const createUser = async ({
  email,
  password,
  name,
  age,
  phone,
  type,
  role,
}) => {
  try {
    // Find the role by name
    const roleDoc = await Role.findOne({ name: role });
    if (!roleDoc) {
      throw new Error(`Role ${role} not found`);
    }

    // Create a new user
    const newUser = await User.create({
      email,
      password,
      name,
      age,
      phone,
      type,
      role: roleDoc._id,
    });
    return newUser._doc;
  } catch (error) {
    throw new Error(error);
  }
};

export default {
  createUser,
};
