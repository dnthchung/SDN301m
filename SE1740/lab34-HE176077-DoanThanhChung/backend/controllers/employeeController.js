const db = require("../models");
const Employee = db.employee;

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
module.exports = {
  getEmployees,
};
