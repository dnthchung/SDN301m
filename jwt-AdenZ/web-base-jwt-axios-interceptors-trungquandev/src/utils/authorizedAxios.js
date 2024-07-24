// Author: TrungQuanDev: https://youtube.com/@trungquandev
import axios from "axios";
//khởi tạo 1 đối tượng axios (authorizedAxiosInstance) mục đích để custom và cấu hình chung cho dự án

let authorizedAxiosInstance = axios.create();

export default authorizedAxiosInstance;
