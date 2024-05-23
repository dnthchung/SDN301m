import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = 5500;

app.use(express.json());
//store all refresh token collect from people when they login (database)
let refreshTokens = [];

app.post("/login", (req, res) => {
  //authentication user -> xác thực các thông tin mà người dùng nhập vô như ussername, password
  //authorization user
  // ở phạm vi này chúng ta sẽ không xác thực thông tin người dùng, giả sử người dùng đã đăng nhập thành công
  //username : "test"
  const data = req.body;
  console.log(data);
  //token nếu như bị đnh cắp sẽ rất nguy hiểm -> phải set thời gian exprise cho token
  const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30s",
  });
  const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET);
  //put token to refreshTokens
  refreshTokens.push(refreshToken);
  res.json({
    accessToken,
    refreshToken,
  });
});

app.post("/refresh", (req, res) => {
  //refresh token
  const refreshToken = req.body.token;
  //unauthorized error
  if (!refreshToken) return res.sendStatus(401);
  //check token in refreshTokens (exist or not)
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
    if (err) return res.sendStatus(403);
    const accessToken = jwt.sign(
      { username: data.username },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "30s",
      }
    );
    res.json({
      accessToken,
    });
  });
});

app.post("/logout", (req, res) => {
  //remove token from refreshTokens
  const refreshToken = req.body.token;
  refreshTokens.filter((refreshToken) => refreshToken !== refreshToken);
  res.sendStatus(200);
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
