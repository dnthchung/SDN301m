import authorizedAxiosInstance from "~/utils/authorizedAxios";
import { API_ROOT } from "~/utils/constants";

export const handleLogoutAPI = async () => {
  //Cách 1 : header - dùng localStorage - chỉ cần xóa thông tin user trong localStorage
  //nếu dùng cookie thì không cần 3 dòng này nữa
  localStorage.removeItem("userInfo");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");

  //Cách 2:  cookie - dùng http only cookie - cần gửi request lên server để xóa cookie trong headers của BE
  return await authorizedAxiosInstance.delete(`${API_ROOT}/v1/users/logout`);
};

export const handleCallRefreshTokenAPI = async (refreshToken) => {
  return await authorizedAxiosInstance.put(`${API_ROOT}/v1/users/refresh_token`, {
    refreshToken,
  });
};
