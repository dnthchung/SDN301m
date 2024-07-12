const userRouter = require("./userRoute");
const authRouter = require("./authRoute");
const employeeRoute = require("./employeeRoute");
const departmentRoute = require("./departmentRoute");
const projectRoute = require("./projectRoute");
module.exports = {
  projectRoute,
  departmentRoute,
  employeeRoute,
  userRouter,
  authRouter,
};
