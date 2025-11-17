const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

// Route đọc file không tồn tại
app.get("/read-file", (req, res) => {
  const content = fs.readFileSync("./khong-ton-tai.txt", "utf8");
  res.send(content);
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

/**
 * Log : PS D:\github-hblab\SDN301m\HB1_NODEJS\week2\code\d3\node-error-demo> node server.js
Server is running on http://localhost:3000
Error: ENOENT: no such file or directory, open 'D:\github-hblab\SDN301m\HB1_NODEJS\week2\code\d3\node-error-demo\khong-ton-tai.txt'
    at Object.readFileSync (node:fs:441:20)
    at D:\github-hblab\SDN301m\HB1_NODEJS\week2\code\d3\node-error-demo\server.js:9:22
    at Layer.handleRequest (D:\github-hblab\SDN301m\HB1_NODEJS\week2\code\d3\node-error-demo\node_modules\router\lib\layer.js:152:17)
    at next (D:\github-hblab\SDN301m\HB1_NODEJS\week2\code\d3\node-error-demo\node_modules\router\lib\route.js:157:13)
    at Route.dispatch (D:\github-hblab\SDN301m\HB1_NODEJS\week2\code\d3\node-error-demo\node_modules\router\lib\route.js:117:3)
    at handle (D:\github-hblab\SDN301m\HB1_NODEJS\week2\code\d3\node-error-demo\node_modules\router\index.js:435:11)
    at Layer.handleRequest (D:\github-hblab\SDN301m\HB1_NODEJS\week2\code\d3\node-error-demo\node_modules\router\lib\layer.js:152:17)
    at D:\github-hblab\SDN301m\HB1_NODEJS\week2\code\d3\node-error-demo\node_modules\router\index.js:295:15
    at processParams (D:\github-hblab\SDN301m\HB1_NODEJS\week2\code\d3\node-error-demo\node_modules\router\index.js:582:12)
    at next (D:\github-hblab\SDN301m\HB1_NODEJS\week2\code\d3\node-error-demo\node_modules\router\index.js:291:5)
 */
