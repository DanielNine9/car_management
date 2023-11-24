import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const isVietnamese = useSelector(
    (state: any) => state?.auth?.translate?.isVietnamese
  );
  return (
    <nav className="bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link
            to="/"
            className="text-white text-xl font-bold hover:text-gray-300 transition"
          >
            Cars
          </Link>
          <ul className="flex gap-6">
            <li>
              <Link
                to="/news"
                className="text-white hover:text-gray-300 transition"
              >
               {isVietnamese ? "Tin tức": "News"} 
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="text-white hover:text-gray-300 transition"
              >
                {isVietnamese ? "Trang chủ": "Home"} 
                
              </Link>
            </li>
            <li>
              <Link
                to="/hot"
                className="text-white hover:text-gray-300 transition"
              >
                {isVietnamese ? "Sản phẩm bán chạy": "Hot"} 
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-white hover:text-gray-300 transition"
              >
                {isVietnamese ? "Liên hệ chúng tôi": "Contact Us"} 
              </Link>
            </li>
            <li>
              <Link
                to="/feedback"
                className="text-white hover:text-gray-300 transition"
              >
                {isVietnamese ? "Nhận xét": "Feedback"} 
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
