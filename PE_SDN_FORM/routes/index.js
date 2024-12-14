// ==================== / GỌI TÊN ROUTER VỪA EXPORT /==============================|
const employeeRouter = require("./employeeRoute");
const departmentRouter = require("./departmentRoute");

// ================ /EXPORT ROUTER TRÊN RA  / ================================|
module.exports = { employeeRouter, departmentRouter };
