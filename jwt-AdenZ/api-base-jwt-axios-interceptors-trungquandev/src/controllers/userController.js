// Author: TrungQuanDev: https://youtube.com/@trungquandev
import { StatusCodes } from "http-status-codes";
import ms from "ms";
import { JwtProvider } from "~/providers/JwtProvider";

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
 * 2 cái chữ ký bí mật quan trọng trong dự án. Dành cho JWT - Jsonwebtokens
 * Lưu ý phải lưu vào biến môi trường ENV trong thực tế cho bảo mật.
 * Ở đây mình làm Demo thôi nên mới đặt biến const và giá trị random ngẫu nhiên trong code nhé.
 * Xem thêm về biến môi trường: https://youtu.be/Vgr3MWb7aOw
 */
const ACCESS_TOKEN_SECRET_SIGNATURE = "KBgJwUETt4HeVD05WaXXI9V3JnwCVP";
const REFRESH_TOKEN_SECRET_SIGNATURE = "fcCjhnpeopVn2Hg1jG75MUi62051yL";

const login = async (req, res) => {
  try {
    if (req.body.email !== MOCK_DATABASE.USER.EMAIL || req.body.password !== MOCK_DATABASE.USER.PASSWORD) {
      res.status(StatusCodes.FORBIDDEN).json({ message: "Your email or password is incorrect!" });
      return;
    }

    // Trường hợp nhập đúng thông tin tài khoản, tạo token và trả về cho phía Client
    //Tạo thông tin để đính kèm vào payload của Token
    const userInformation = {
      id: MOCK_DATABASE.USER.ID,
      email: MOCK_DATABASE.USER.EMAIL,
    };

    // Tạo Access Token
    const accessToken = await JwtProvider.generateToken(userInformation, ACCESS_TOKEN_SECRET_SIGNATURE, ms("15s"));

    // Tạo Refresh Token
    const refreshToken = await JwtProvider.generateToken(userInformation, REFRESH_TOKEN_SECRET_SIGNATURE, ms("7d"));

    // Trả về cho Client
    // tg sống của cookie khác với tg sống của token.
    res.cookie("accessToken", accessToken, { httpOnly: true, secure: true, sameSite: "none", maxAge: ms("7d") });
    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true, sameSite: "none", maxAge: ms("7d") });

    //trẻ về cho fe nếu họ cần lưu vào local storage
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
// const login = async (req, res) => {
//   try {
//     console.log("req.body", req.body);
//     if (req.body.email !== MOCK_DATABASE.USER.EMAIL || req.body.password !== MOCK_DATABASE.USER.PASSWORD) {
//       res.status(StatusCodes.FORBIDDEN).json({ message: "Your email or password is incorrect!" });
//       return;
//     }

//     // Trường hợp nhập đúng thông tin tài khoản, tạo token và trả về cho phía Client
//     //Tạo thông tin để đính kèm vào payload của Token
//     const userInformation = {
//       id: MOCK_DATABASE.USER.ID,
//       email: MOCK_DATABASE.USER.EMAIL,
//     };

//     // Tạo Access Token
//     const accessToken = await JwtProvider.generateToken(userInformation, ACCESS_TOKEN_SECRET_SIGNATURE, ms("15s"));

//     // Tạo Refresh Token
//     const refreshToken = await JwtProvider.generateToken(userInformation, REFRESH_TOKEN_SECRET_SIGNATURE, ms("7d"));

//     // Trả về cho Client
//     // tg sống của cookie khác với tg sống của token.
//     res.cookie("accessToken", accessToken, { httpOnly: true, secure: true, sameSite: "none", maxAge: ms("7d") });
//     res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true, sameSite: "none", maxAge: ms("7d") });

//     //trẻ về cho fe nếu họ cần lưu vào local storage
//     res.status(StatusCodes.OK).json({
//       result: {
//         message: "Login API success!",
//         ...userInformation,
//         accessToken,
//         refreshToken,
//       },
//     });
//   } catch (error) {
//     console.error("Error during login:", error); // Enhanced error logging
//     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error", error });
//   }
// };

const logout = async (req, res) => {
  try {
    // Do something
    res.status(StatusCodes.OK).json({ message: "Logout API success!" });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

const refreshToken = async (req, res) => {
  try {
    // Do something
    res.status(StatusCodes.OK).json({ message: " Refresh Token API success." });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export const userController = {
  login,
  logout,
  refreshToken,
};