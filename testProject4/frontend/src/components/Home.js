// src/components/Footer.js
import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-8">
      <div className="container mx-auto grid grid-cols-3 gap-8">
        <div>
          <h2 className="text-lg font-bold">HK Mobile</h2>
          <p className="mt-4">
            Success or failure in business depends more on attitude in thinking
            than in ability to think.
          </p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:underline">
              Facebook
            </a>
            <a href="#" className="hover:underline">
              Twitter
            </a>
            <a href="#" className="hover:underline">
              Instagram
            </a>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-bold">Về chúng tôi</h2>
          <ul className="mt-4 space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Khách hàng đánh giá
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Liên hệ
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Hỏi đáp
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-bold">Chính sách</h2>
          <ul className="mt-4 space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Chính sách vận chuyển
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Chính sách bảo hành
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-8 text-center">
        <p>© 2024 HK Mobile. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
