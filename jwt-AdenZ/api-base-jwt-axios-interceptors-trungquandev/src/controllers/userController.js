// Author: TrungQuanDev: https://youtube.com/@trungquandev
import { StatusCodes } from "http-status-codes";
import { JwtProvider } from "~/providers/JwtProvider";
import ms from "ms";
import "dotenv/config";
/**
 * Mock nhanh thông tin user thay vì phải tạo Database rồi query.
 * Nếu muốn học kỹ và chuẩn chỉnh đầy đủ hơn thì xem Playlist này nhé:
 * https://www.youtube.com/playlist?list=PLP6tw4Zpj-RIMgUPYxhLBVCpaBs94D73V
 */
const MOCK_DATABASE = {
  USER: {
    ID: "trungquandev-sample-id-12345678",
    EMAIL: "trungquandev.official@gmail.com",
    PASSWORD: "trungquandev@123",
  },
};

/**
 * 2 cái chữ ký bí mật quan trọng trong dự án. Dành cho JWT - Json web tokens
 * Lưu ý phải lưu vào biến môi trường ENV trong thực tế cho bảo mật.
 * Ở đây mình làm Demo thôi nên mới đặt biến const và giá trị random ngẫu nhiên trong code nhé.
 * Xem thêm về biến môi trường: https://youtu.be/Vgr3MWb7aOw
 */
const ACCESS_TOKEN_SECRET_SIGNATURE = "KBgJwUETt4HeVD05WaXXI9V3JnwCVP";
const REFRESH_TOKEN_SECRET_SIGNATURE = "fcCjhnpeopVn2Hg1jG75MUi62051yL";

const login = async (req, res) => {
  try {
    if (
      req.body.email !== MOCK_DATABASE.USER.EMAIL ||
      req.body.password !== MOCK_DATABASE.USER.PASSWORD
    ) {
      res.status(StatusCodes.FORBIDDEN).json({ message: "Your email or password is incorrect!" });
      return;
    }

    // Trường hợp nhập đúng thông tin tài khoản, tạo token và trả về cho phía Client
    //Tạo thông tin để đính kèm vào payload của Token
    const userInformation = {
      id: MOCK_DATABASE.USER.ID,
      email: MOCK_DATABASE.USER.EMAIL,
    };

    // Tạo Access Token - 5s het han - '1h' - thời gian sống của token đê kiểu ntn hoặc '1h', còn để kiểu ms là đi
    const accessToken = await JwtProvider.generateToken(
      userInformation,
      ACCESS_TOKEN_SECRET_SIGNATURE,
      // "1m",
      5,
    );

    // Tạo Refresh Token - 1h
    const refreshToken = await JwtProvider.generateToken(
      userInformation,
      REFRESH_TOKEN_SECRET_SIGNATURE,
      3600,
    );

    // Cookie này là ở host của BE, nên phải set secure: true, sameSite: "none" để tránh lỗi CORS.
    //Ngoài ra bên FE thì cần khai báo cái credentials true là FE đã lấy dc token trong cookie từ BE (nhớ là cần khai báo cookie parser trong server.js của BE)
    // tg sống của cookie khác với tg sống của token.
    //maxAge để như kiểu dưới, sửa là đi
    //hiểu đnư giản đây là cách save token vào cookie của BE, để xác nhận quyền thì cái middleware sẽ lấy token từ cookie này (phía be) ra và xác thực
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: ms("10m"),
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: ms("1h"),
    });

    //trẻ về cho fe nếu họ cần lưu vào local storage

    // console.log("------------- login func:  Token Check --------------");
    // console.log("Cookie --", req);
    // console.log("accessTokenFromCookie --", accessTokenFromCookie);
    // console.log("accessTokenFromHeader --", accessTokenFromHeader);
    // console.log("-----------------------------");

    res.status(StatusCodes.OK).json({
      result: {
        message: "Login API success!",
        ...userInformation,
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

const logout = async (req, res) => {
  try {
    //xóa cookie
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.status(StatusCodes.OK).json({ message: "Logout API success!" });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

const refreshToken = async (req, res) => {
  try {
    // Cách 1: Lấy refresh token luôn từ Cookie đã đính kèm vào request
    const refreshTokenFromCookie = req.cookies;

    // Cách 2: Từ local storage phía FE sẽ truyền vào body khi gọi API
    const refreshTokenFromBody = req.body?.refreshToken;

    console.log(
      "================================== CHECK TOKEN GET FROM COOKIE AND BODY IN REFRESH TOKEN ==================================",
    );
    console.log("refreshTokenFromCookie", refreshTokenFromCookie);
    console.log("refreshTokenFromBody", refreshTokenFromBody);

    // // Verify / giải mã cái refresh token xem có hợp lệ không - use 1 trong 2 cách trên
    // const decoded = await JwtProvider.verifyToken(
    //   refreshTokenFromBody,
    //   process.env.REFRESH_TOKEN_SECRET_SIGNATURE,
    // );

    // // Đoạn này vì chúng ta chỉ lưu những thông tin unique và cố định của user trong token rồi, vì vậy có thể lấy luôn từ decoded ra, tiết kiệm query vào DB để lấy data mới.
    // const userInfo = {
    //   id: decoded.id,
    //   email: decoded.email,
    // };

    // // Tạo accessToken mới - user info từ decoded
    // const accessToken = await JwtProvider.generateToken(
    //   userInfo,
    //   process.env.ACCESS_TOKEN_SECRET_SIGNATURE,
    //   "10s",
    // );

    // // Res lại cookie accessToken mới cho trường hợp sử dụng cookie
    // res.cookie("accessToken", accessToken, {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: "none",
    //   maxAge: ms("10m"),
    // });

    // // Trả về accessToken mới cho trường hợp FE cần update lại trong Local storage

    // res.status(StatusCodes.OK).json({ accessToken });
  } catch (error) {
    //trong trường hợp refresh token là 1 cái chuỗi linh tinh
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Refresh token failed!" });
  }
};

export const userController = {
  login,
  logout,
  refreshToken,
};
