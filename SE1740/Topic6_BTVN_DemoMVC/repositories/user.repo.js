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

// Get all users
// Population có thể tự động tạo đường dẫn với các document với nhau. Nó có liên kết 1 document, nhiều document, các đối tượng (object) đơn giản, các đối tượng lồng nhau hoặc là trả tất cả các đối tượng trong 1 lần truy vấn.
const getAllUsers = async () => {
  try {
    const users = await User.find().populate("role");
    return users;
  } catch (error) {
    throw new Error(`Error fetching users: ${error.message}`);
  }
};

//Get user by id
//exec(): Executes the query and returns a promise, allowing you to handle the result or error using .then() and .catch() or await and try/catch
const getAnUserById = async (id) => {
  try {
    const userFound = await User.findOne({ _id: id }).populate("role").exec();
    return userFound;
  } catch (error) {
    throw new Error(`Error fetching user: ${error.message}`);
  }
};

//Edit/ Update an user by id
/**
 * { _id: id }: The query to find the document. It looks for a document with the _id matching the given id.
 * { name, price, description, images, comments, category }: The update object. This specifies the fields to be updated and their new values.
 * { new: true }: An options object. The { new: true } option tells Mongoose to return the updated document rather than the original document.
 */
const updateUserById = async (
  id,
  { email, password, name, age, phone, type, role }
) => {
  try {
    // Find the role by name
    // const roleDoc = await Role.findOne({ name: role });
    // if (!roleDoc) {
    //   throw new Error(`Role ${role} not found`);
    // }
    // Update user by id
    const userUpdated = await User.findByIdAndUpdate(
      { _id: id },
      { email, password, name, age, phone, type, role },
      { new: true }
    );
    return userUpdated;
  } catch (error) {
    throw new Error(error);
  }
};

export default {
  createUser,
  getAllUsers,
  getAnUserById,
  updateUserById,
};
