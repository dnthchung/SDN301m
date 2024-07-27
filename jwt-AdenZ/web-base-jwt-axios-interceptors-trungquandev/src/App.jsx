// Author: TrungQuanDev: https://youtube.com/@trungquandev
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Login from "~/pages/Login";
import Dashboard from "~/pages/Dashboard";

/**
 * Giải pháp Clean Code trong việc xác định các route nào cần đăng nhập tài khoản xong thì mới cho truy cập
 * Sử dụng <Outlet /> của react-router-dom để hiển thị các Child Route (xem cách sử dụng trong App() bên dưới)
 * https://reactrouter.com/en/main/components/outlet
 * Một bài hướng dẫn khá đầy đủ:
 * https://www.robinwieruch.de/react-router-private-routes/
 */
const ProtectedRoutes = () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  if (!user) {
    /**
     * -replace = true: replace the current entry in the history stack with the new location so that the user won't be able to go back to the login page
     * -state: pass a message to the login page
     */
    return <Navigate to="/login" replace={true} />;
  }
  return <Outlet />;
};

const UnauthorizedRoutes = () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  if (user) {
    return <Navigate to="/dashboard" replace={true} />;
  }
  return <Outlet />;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace={true} />} />

      {/* public route */}

      {/* private route */}
      <Route element={<UnauthorizedRoutes />}>
        <Route path="/login" element={<Login />} />
      </Route>

      {/* private route */}
      <Route element={<ProtectedRoutes />}>
        {/* Outlet của react-router-dom sẽ chạy vào các child route trong này */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
