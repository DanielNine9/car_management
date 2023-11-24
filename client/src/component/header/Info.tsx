import React from 'react';
import { useSelector } from 'react-redux';

const Info = () => {
  const isVietnamese = useSelector(
    (state: any) => state?.auth?.translate?.isVietnamese
  );
  return (
    <div className="flex justify-between text-sm mb-2">
      <div className="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
          />
        </svg>
        <p>{isVietnamese ? "Địa chỉ": "Address"}: Ninh Kiều, Cần Thơ, Thường Thạnh</p>
      </div>
      <div className="flex items-center">
        <p className="border-r pr-2 mr-2">Email: huydqpc07859@fpt.edu.vn</p>
        <p>{isVietnamese ? "Số điện thoại": "Phone"}: 0944242140</p>
      </div>
    </div>
  );
};

export default Info;
