// Author: TrungQuanDev: https://youtube.com/@trungquandev
import axios from "axios";

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

// Add a response interceptor : cho phép chúng ta can thiệp vào giữa các api response nhận từ BE
authorizedAxiosInstance.interceptors.response.use(
  (response) => {
    // mọi status code nằm trong khoảng 200-299 -> success
    // Do something with response data
    return response;
  },
  (error) => {
    // mọi status code nằm trong khoảng 200-299 -> error sẽ vào đây
    // phần này sẽ sử dụng để hiển thị các thông báo lỗi trả về tự mọi api ( viết 1 lần dùng chung cho cả dự án) -> tránh try catch nhiều, -> trừ những mục đặc biệt.
    //410 -> mã GONE -> sẽ không hiển thị lỗi này -> để sd khi mà access token hết hạn -> để api biết đay là lỗi access token hết hạn -> cần phải TỰ ĐỘNG refresh token

    if (error.response?.status === 410) {
      toast.error(error.response?.data?.message || error?.message);
    }
    return Promise.reject(error);
  },
);

export default authorizedAxiosInstance;
