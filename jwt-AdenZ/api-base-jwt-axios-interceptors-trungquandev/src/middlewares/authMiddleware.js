// Author: TrungQuanDev: https://youtube.com/@trungquandev
import { StatusCodes } from "http-status-codes";
import "dotenv/config";
import { JwtProvider } from "../providers/JwtProvider";

/**
 * - access token sẽ dùng kiểu cách 2 - lưu vào cookie BE và lấy từ cookie BE / nghiên cứu thêm redis chứa access token
 * - refresh token sẽ save vào db, nào cần thì call ra xài
 */

//function remove Bearer from token get from header
const removeBearerFromToken = (token) => {
  if (token.includes("Bearer")) {
    return token.split("Bearer ")[1];
  }
  return token;
};

export const isAuthorized = async (req, res, next) => {
  /**
   * 2 cách để lấy accessToken từ Client gửi lên Server:
   * - Cách 1: Lấy accessToken từ request headers - trong trường hợp phía FE lưu vào Local Storage, và từ đó gửi lên thông qua Header Authorization
   * - Cách 2: Lấy accessToken nằm trong request cookies phía client - withCredentials trong file  authorizeAxios và credentials trong CORS
   */
  const accessTokenFromHeader = removeBearerFromToken(req.headers?.authorization); // cách 1 (nhớ chú ý cái tên key trong header phải viết hoa chữ cái đầu tiên)
  const accessTokenFromCookie = req.cookies?.accessToken; // cách 2

  if (!accessTokenFromCookie && !accessTokenFromHeader) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: "Unauthorized ( Token not found)" });
    return;
  }

  console.log("---");
  console.log("accessTokenFromCookie --", accessTokenFromCookie);
  console.log("accessTokenFromHeader --", accessTokenFromHeader);

  try {
    /**
     * Bước 01: Thực hiện giải mã token xem nó có hợp lệ hay là không
     * Bước 02: Quan trọng: Nếu như cái token hợp lệ, thì sẽ cần phải lưu thông tin giải mã được vào cái req.jwtDecoded, để sử dụng cho các tầng cần xử lý ở phía sau
     * Bước 03: Cho phép cái request đi tiếp
     */
    const accessTokenDecoded = await JwtProvider.verifyToken(
      accessTokenFromHeader,
      process.env.ACCESS_TOKEN_SECRET_SIGNATURE,
    );
    req.jwtDecoded = accessTokenDecoded;
    next();
  } catch (error) {
    console.log("error", error);
    /**
     * Trường hợp lỗi 01: Nếu cái accessToken nó bị hết hạn (expired) thì mình cần trả về một cái mã lỗi GONE - 410 cho phía FE biết để gọi api refreshToken
     * Trường hợp lỗi 02: Nếu như cái accessToken nó không hợp lệ do bất kỳ điều gì khác vụ hết hạn thì chúng ta cứ thẳng tay trả về mã 401 cho phía FE xử lý Logout / hoặc gọi API Logout tùy trường hợp
     * (nhiều trường hợp nhỡ bị bên nào đó dùng post man hay gì đó đủn token linh tinh lên thì chúng ta cần phải xử lý chung về 1 lỗi 401 - trường hợp 2)
     */
    if (error.message?.includes("jwt expired")) {
      res.status(StatusCodes.UNAUTHORIZED).json({ message: "Need to refresh token" });
      return;
    }

    res.status(StatusCodes.UNAUTHORIZED).json({ message: "Unauthorized ( Please log in.)" });
  }
};
