const http = require("http");

//Ví dụ cụ thể:
//Xây dựng các API sau:
//GET /students: Lấy danh sách sinh viên
//POST /students: Thêm 1 student vào danh sách

let data = [
  { id: 1, name: "Nguyen Van A", age: 20 },
  { id: 2, name: "Nguyen Van B", age: 21 },
  { id: 3, name: "Nguyen Van C", age: 22 },
];

//create a server :
const server = http.createServer((req, res) => {
  //nơi chứa các xử lý của server, nhận request và trả về response
  console.log("Request received");

  //nhận request từ client
  //   const { method, url } = req;
  //xử lý request
  //GET /students
  if (req.url === "/students" && req.method === "GET") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data));
    return;
  }

  //trả về response cho client
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.end("Hello World meo meo ă\n");
});

//make server listen to port request
let port = 3001;
let host = "localhost";
server.listen(port, host, () => {
  console.log(`Server is running on port ${port}`);
});
