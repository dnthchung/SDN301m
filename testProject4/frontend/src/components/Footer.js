// src/Footer.js
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGoogle,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 py-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <div className="text-2xl font-bold text-red-500">HK</div>
          <p className="mt-2">
            Success or failure in business depends more on attitude in thinking
            than in ability to think.
          </p>
          <div className="flex justify-center md:justify-start mt-4 space-x-4">
            <a href="#" aria-label="Facebook">
              <FontAwesomeIcon
                icon={faFacebook}
                size="lg"
                className="text-red-500"
              />
            </a>
            <a href="#" aria-label="Google">
              <FontAwesomeIcon
                icon={faGoogle}
                size="lg"
                className="text-red-500"
              />
            </a>
            <a href="#" aria-label="LinkedIn">
              <FontAwesomeIcon
                icon={faLinkedin}
                size="lg"
                className="text-red-500"
              />
            </a>
            <a href="#" aria-label="Twitter">
              <FontAwesomeIcon
                icon={faTwitter}
                size="lg"
                className="text-red-500"
              />
            </a>
          </div>
        </div>
        <div className="text-center md:text-left">
          <h2 className="text-lg font-bold">Về chúng tôi</h2>
          <ul className="mt-2">
            <li>
              <a href="#" className="hover:text-red-500">
                Khách hàng đánh giá
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-500">
                Liên hệ
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-500">
                Hỏi đáp
              </a>
            </li>
          </ul>
        </div>
        <div className="text-center md:text-left mt-4 md:mt-0">
          <h2 className="text-lg font-bold">Chính sách</h2>
          <ul className="mt-2">
            <li>
              <a href="#" className="hover:text-red-500">
                Chính sách vận chuyển
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-500">
                Chính sách bảo hành
              </a>
            </li>
          </ul>
        </div>
        <div className="text-center md:text-left mt-4 md:mt-0">
          <h2 className="text-lg font-bold">Tổng đài hỗ trợ (miễn phí gọi)</h2>
          <ul className="mt-2">
            <li>Gọi mua: 1800.xxxx (7:30 - 22:00)</li>
            <li>Kỹ thuật: 1800.xyyy (7:30 - 22:00)</li>
            <li>Khiếu nại: 1800.xzxz (8:00 - 21:30)</li>
            <li>Bảo hành: 1800.xyzt (8:00 - 21:00)</li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-10">
        <p className="text-sm text-gray-500">
          © 2021 HK Mobile. All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
