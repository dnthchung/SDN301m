const jwt = require("jsonwebtoken");

//middleware function => có th hiểu rằng thằng này là kiểu check xem token có hợp lệ không , nếu có thì chạy đến next() => chạy tiếp function đang dở dang
function authenticateToken(req, res, next) {
  //get token from header gửi lên từ client
  const authHeader = req.headers["authorization"];
  //authorization khi gửi ln từ phía client sẽ có dạng "Bearer [token]" nên cần split ra để lấy token
  const token = authHeader && authHeader.split(" ")[1];

  //check token có hay không
  if (!token) return res.sendStatus(401);
  //nếu có token thì verify token xem token hợp lệ không
  //(err,user) => err is the error and user is the payload, user is the payload
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    // jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
    //log err and data to see what is in there
    console.log("========== Authenticate Token ==========");
    console.log("err", err);
    // console.log(data.user);
    //lỗi thì trả về 403 => là lỗi (forbidden) ko có quyền truy suất vô route mà người dùng đang truy xuất
    if (err) return res.sendStatus(401);
    //problem here
    // req.user = data.user;
    req.user = user;
    next();
  });
}

module.exports = {
  authenticateToken,
};
