import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Footer = () => {
  const isVietnamese = useSelector(
    (state: any) => state?.auth?.translate?.isVietnamese
  );
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        <div className="footer-contact">
          <h3 className="text-xl font-semibold mb-4">{isVietnamese ? "Liên hệ với chúng tôi": "Contact Us"}</h3>
          <p>{isVietnamese ? "Địa chỉ" : "Address"}: Thường Thạnh, Cần Thơ</p>
          <p>Email: huydqpc07859@fpt.edu.vn</p>
          <p>{isVietnamese ? "Số điện thoại": "Phone"}: 0944242140</p>
        </div>
        <div className="footer-social">
          <h3 className="text-xl font-semibold mb-4">{isVietnamese ?"Kết nối với chúng tôi qua" : "Connect with Us"}</h3>
          <Link to="#" className="block mb-2">Facebook</Link>
          <Link to="#" className="block mb-2">Twitter</Link>
          <Link to="#" className="block mb-2">Instagram</Link>
        </div>
        <div className="footer-about">
          <h3 className="text-xl font-semibold mb-4">{isVietnamese ? "Thông tin thêm: ": "About Us"}</h3>
          <p>{isVietnamese ? "Nhà phát triển": "Development"}: </p>
          <p>Front end: Đinh Quốc Huy <br /> Back end: Đinh Quốc Tiến</p>

        </div>
      </div>
      <div className="mt-8 text-center">
        <p>&copy; 2023 Shop Cars.{isVietnamese ? "Đã đăng ký bản quyền": "All rights reserved"}.</p>
      </div>
    </footer>
  );
};

export default Footer;
