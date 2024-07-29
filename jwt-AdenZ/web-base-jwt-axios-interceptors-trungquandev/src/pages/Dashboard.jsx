// Author: TrungQuanDev: https://youtube.com/@trungquandev
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import authorizedAxiosInstance from "~/utils/authorizedAxios";
import { handleLogoutAPI } from "~/apis";

import { toast } from "react-toastify";
import { API_ROOT } from "~/utils/constants";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  //fetch data
  useEffect(() => {
    const fetchData = async () => {
      //bỏ try catch vì đã bắt lỗi ở axiosInstance
      const res = await authorizedAxiosInstance.get(`${API_ROOT}/v1/dashboards/access`);
      const userInfoFromLocalStorage = JSON.parse(localStorage.getItem("userInfo"));
      // console.log("userInfoFromLocalStorage", userInfoFromLocalStorage);
      setUser(res.data);
    };
    fetchData();
  }, []);
  //handle logout
  const handleLogout = async () => {
    //call api logout
    const res = await handleLogoutAPI();
    //nếu mà dùng cookie thì cần xóa user info trong localStorage - mở comment dòng dưới
    // localStorage.removeItem("userInfo");

    setUser(null);
    toast.success(res.data.message);
    navigate("/login");
  };

  if (!user) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          width: "100vw",
          height: "100vh",
        }}
      >
        <CircularProgress />
        <Typography>Loading dashboard user...</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: "1120px",
        marginTop: "1em",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        padding: "0 1em",
      }}
    >
      <Alert severity="info" sx={{ ".MuiAlert-message": { overflow: "hidden" } }}>
        Đây là trang Dashboard sau khi user:&nbsp;
        <Typography variant="span" sx={{ fontWeight: "bold", "&:hover": { color: "#fdba26" } }}>
          {user?.email}
        </Typography>
        &nbsp; đăng nhập thành công thì mới cho truy cập vào.
      </Alert>

      {/* //log out button  */}
      <Button variant="contained" type="button" color="info" size="large" sx={{ mt: 2, maxWidth: "min-content", alignSelf: "flex-end" }} onClick={handleLogout}>
        logout
      </Button>
      <Divider sx={{ my: 2 }} />
    </Box>
  );
}

export default Dashboard;
