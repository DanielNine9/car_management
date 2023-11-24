import React from 'react';
import { useSelector } from 'react-redux';

const Contact = () => {
  const isVietnamese = useSelector(
    (state: any) => state?.auth?.translate?.isVietnamese
  );
  return (
    <div className="p-4  container max-w-[1200px] mx-auto min-h-[300px]">
      <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
      <p className="mb-2">{isVietnamese ? "Nếu bạn có bất kỳ câu hỏi hoặc thắc mắc nào, vui lòng liên hệ với chúng tôi" 
      : "If you have any questions or inquiries, please feel free to reach out to us"}:</p>
      <ul className="list-disc list-inside">
        <li>Email: huydqpc07859@fpt.edu.vn</li>
        <li>Phone: 0944242140</li>
        <li>Address: Thường Thạnh, Ninh Kiều, Cần Thơ</li>
      </ul>
    </div>
  );
};

export default Contact;
