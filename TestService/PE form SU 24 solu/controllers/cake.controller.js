// const db = require("../models");
// const Cake = db.cake;

// // CRUD
// exports.create = async (req, res, next) => {
//   try {
//     console.log(req.body);
//     const newCake = new Cake({
//       type: req.body.type,
//       name: req.body.name,
//       price: req.body.price,
//       topping: req.body.topping,
//       option: req.body.option,
//     });

//     const result = await newCake.save();
//     if (!result) {
//       return res.status(400).json({ message: "Cannot create cake" });
//     }
//     return res.status(201).json(result);
//   } catch (error) {
//     next(error);
//   }
// };

// Helper function to generate a random number between 1 and 1 million
function getRandomNumber() {
  return Math.floor(Math.random() * 1000000) + 1;
}

// Helper function to extract the short name from full name
function getShortName(fullName) {
  const nameParts = fullName.split(" ");
  const shortName = nameParts[nameParts.length - 1] + nameParts[0];
  return shortName.toLowerCase();
}

//  dd/mm/yyyy
function formatDate(date) {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

//get employee by :dept - dept is an ObjectId of the Department, return information of all employees by _id of the department in database, using GET method.
//ex: /employees/65d6d2e6eee18931e983e2e8
async function getEmployees(req, res) {
  try {
    const departmentId = req.params.dept;
    // Find employees = department ID
    const employees = await Employee.find({ department: departmentId }).populate("department").exec();
    const formattedEmployees = employees.map((employee) => ({
      _id: employee._id,
      name: employee.name,
      dob: formatDate(employee.dob),
      gender: employee.gender,
      position: employee.position,
    }));

    res.status(200).json(formattedEmployees);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred while retrieving employees" });
  }
}
modul;
