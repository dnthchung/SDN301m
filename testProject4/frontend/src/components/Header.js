// src/components/Header.js
import React from "react";

function Header() {
  return (
    <header className="bg-red-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">HK Mobile</div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="hover:underline">
                Điện thoại
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Máy tính bảng
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Đồng hồ
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Laptop
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Âm thanh
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Phụ kiện
              </a>
            </li>
          </ul>
        </nav>
        <div className="flex items-center space-x-4">
          <a href="#" className="hover:underline">
            Lịch sử mua hàng
          </a>
          <a href="#" className="hover:underline">
            Giỏ hàng
          </a>
          <a href="#" className="hover:underline">
            Đăng nhập/Đăng ký
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
