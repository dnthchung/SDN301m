// Author: TrungQuanDev: https://youtube.com/@trungquandev
import axios from "axios";
import { handleLogoutAPI, handleCallRefreshTokenAPI } from "~/apis";

//khởi tạo 1 đối tượng axios (authorizedAxiosInstance) mục đích để custom và cấu hình chung cho dự án
let authorizedAxiosInstance = axios.create();

//thời gian chờ tối đa của 1 request : 10p
authorizedAxiosInstance.defaults.timeout = 100 * 60 * 10;
//withCredentials: true -> để sẽ cho phép axios tự động đính kèm và gửi cookie trong mọi request lên BE

//phục vụ cho trường hợp chúng ta sử dụng JWT token (refresh và access) theo cơ chế httpOnly cookie
authorizedAxiosInstance.defaults.withCredentials = true;

//interceptors: cho phép chúng ta can thiệp vào quá trình gửi và nhận dữ liệu của axios
// Add a request interceptor : cho phép chúng ta can thiệp vào giữa các api request trước khi nó được gửi đi
authorizedAxiosInstance.interceptors.request.use(
  (config) => {
    // Lấy access token từ localStorage và đính kèm vào header của mỗi request
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      // console.log("accessToken", accessToken);
      // Cần thêm "Bearer " vì chúng ta nên tuân thủ theo tiêu chuẩn OAuth 2.0 trong việc xác định loại token đang sử dụng
      // Bearer là định nghĩa loại token dành cho việc xác thực và ủy quyền, tham khảo các loại token khác như: Basic token, Digest token, OAuth token, ...vv
      // config.headers["Authorization"] = `Bearer ${accessToken}`;
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Khởi tạo một cái promise cho việc gọi api refresh_token
// Mục đích tạo Promise này để khi nhận yêu cầu refreshToken đầu tiên thì hold lại việc gọi API refresh_token cho tới khi xong xuôi thì mới retry lại những api bị lỗi trước đó thay vì cứ thế gọi lại refreshTokenAPI liên tục với mỗi request lỗi.
// tránh trường hợp gọi nhiều lần refreshTokenAPI cùng 1 lúc - solve cái vấn đề mà bên FE có quá nhiều request cùng lúc cần call api, mà các api đó cần token để xác thực
let refreshTokenPromise = null;

// Add a response interceptor : cho phép chúng ta can thiệp vào giữa các api response nhận từ BE
authorizedAxiosInstance.interceptors.response.use(
  (response) => {
    // mọi status code nằm trong khoảng 200-299 -> success
    // Do something with response data
    return response;
  },
  (error) => {
    // mọi status code nằm trong khoảng 200-299 -> error sẽ vào đây
    /**======================== xử lý auto refresh token =================== */
    //Nếu 401 từ BE => refresh token hết hạn => log out luôn
    if (error.response?.status === 401) {
      handleLogoutAPI().then(() => {
        //nếu mà dùng cookie thì cần xóa user info trong localStorage - mở comment dòng dưới
        // localStorage.removeItem("userInfo");

        //điều hướng dùng js thuần vì đây là .js file không phải .jsx file => dùng hook hơi trôn
        location.href = "/login";
      });
    }
    //Nếu 410 -> mã GONE -> sẽ không hiển thị lỗi này -> để sd khi mà access token hết hạn -> để api biết đay là lỗi access token hết hạn -> cần phải TỰ ĐỘNG refresh token
    //Đầu tiên lấy được các request API đang bị lỗi thông qua error.config
    const originalRequest = error.config;
    console.log("originalRequest", originalRequest);
    // if (error.response?.status === 410 && !originalRequest._retry) { //- đến vid 10 -> ko cần đoạn này nữa
    if (error.response?.status === 410 && originalRequest) {
      // gán thêm giá trị _retry luôn = true trong khoảng thời gian chờ, để việc refresh token này chỉ luôn gọi 1 lần tại 1 thời điểm
      originalRequest._retry = true; //- đến vid 10 -> ko cần đoạn này nữa

      if (!refreshTokenPromise) {
        //lấy refresh token từ localStorage
        const refreshToken = localStorage.getItem("refreshToken");
        //call api refresh token
        refreshTokenPromise = handleCallRefreshTokenAPI(refreshToken)
          .then((res) => {
            //lấy và gán lại access token mới từ response trả về vào localStorage (cho trương hợp dùng localStorage)
            const { accessToken } = res.data;
            localStorage.setItem("accessToken", accessToken);
            //gán lại access token mới vào header của axios
            authorizedAxiosInstance.defaults.headers.authorization = `Bearer ${accessToken}`;

            //Đồng thời lưu ý là access token cũng đã được update lại ở cookie (httpOnly cookie)
            //Chuyển step này xuống dưới return - Bước cuối quan trọng : return lại axios instance kết hợp với cái original config để gọi lại NHỮNG API BAN ĐÂU BỊ LỖI
            // return authorizedAxiosInstance(originalRequest);
          })
          .catch((_error) => {
            //nếu nhận bất kỳ lỗi nào từ việc call api refresh token thì cũng phải log out luôn
            handleLogoutAPI().then(() => {
              //nếu mà dùng cookie thì cần xóa user info trong localStorage - mở comment dòng dưới
              // localStorage.removeItem("userInfo");

              //điều hướng dùng js thuần vì đây là .js file không phải .jsx file => dùng hook hơi trôn
              location.href = "/login";
            });

            return Promise.reject(_error);
          })
          .finally(() => {
            //dù api refresh token thành công hay thất bại thì cũng phải gán lại refreshTokenPromise = null để cho phép gọi lại api refresh token tiếp theo
            refreshTokenPromise = null;
          });
      }

      //Cuối cùng mới return lại cái promise của refreshTokenPromise trong trường hợp success
      return refreshTokenPromise.then(() => {
        //quan trọng : return lại axios instance kết hợp với cái original config để gọi lại NHỮNG API BAN ĐÂU BỊ LỖI
        return authorizedAxiosInstance(originalRequest);
      });
    }

    /** Xử lý tập trung phần hiển thị thông báo lỗi trả về của mọi API ở đây(viết 1 dùng cả dời -> clean code) */
    //Nhận tất cả mọi mã code lỗi từ BE trừ 410(GONE)
    if (error.response?.status !== 410) {
      toast.error(error.response?.data?.message || error?.message);
    }
    return Promise.reject(error);
  },
);

export default authorizedAxiosInstance;
