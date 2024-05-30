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
    throw new Error(error.toString() + "haha");
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
    return userFound ? userFound : { status: 0, message: "Delete failed!" };
  } catch (error) {
    throw new Error(`Error fetching user: ${error.message}`);
  }
};

//Edit/ Update an user by id - ADMIN
/**
 * { _id: id }: The query to find the document. It looks for a document with the _id matching the given id.
 * { name, price, description, images, comments, category }: The update object. This specifies the fields to be updated and their new values.
 * { new: true }: An options object. The { new: true } option tells Mongoose to return the updated document rather than the original document.
 */
const updateUserById2 = async (id) => {
  try {
    var { email, password, name, age, phone, type, role } = userData;
    // find user by id
    var userFound = await User.findById(id);
    if (userFound != null) {
      // update user
      userFound.email = email ? email : userFound.email;
      userFound.password = password ? password : userFound.password;
      userFound.name = name ? name : userFound.name;
      userFound.age = age ? age : userFound.age;
      userFound.phone = phone ? phone : userFound.phone;
      userFound.type = type ? type : userFound.type;
      // userFound.role = role ? role : userFound.role;
      var result = await userFound.save();

      return result
        ? { status: 1, message: "Update successfully!" }
        : { status: 0, message: "Update failed!" };
    } else {
      return { status: 0, message: "User not found!" };
    }
  } catch (error) {
    return { status: -1, error: error.message, message: "Update failed!" };
  }
};

//Delete a user by id - USER | delete account
const deleteAnUserById = async (id) => {
  try {
    const doit = await User.findByIdAndDelete({ _id: id });
    return doit
      ? { status: 1, message: "Delete successfully!" }
      : { status: 0, message: "Delete failed!" };
  } catch (error) {
    return { status: -1, error: error.message, message: "Delete failed!" };
  }
};

//Update role for a user by id - ADMIN
const updateRoleUserById = async (id, role) => {
  try {
    //find user by id
    var userFound = await User.findById(id);
    //update role for user
    if (userFound) {
      userFound.role = role ? role : userFound.role;
      var result = await userFound.save();
      return result
        ? { status: 1, message: "Update role successfully!" }
        : { status: 0, message: "Update role failed!" };
    } else {
      return { status: 0, message: "User not found!" };
    }
  } catch (error) {
    return {
      status: -1,
      error: error.message,
      message: "Update role for user failed!",
    };
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
