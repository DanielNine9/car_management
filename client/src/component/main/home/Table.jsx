import React from "react";

const Table = () => {
  return (
    <div className="my-10 flex flex-col gap-4 wrapper">
      <h2 className="text-center text-3xl text-primary_color font-semibold">
      Mức tiêu thụ nhiên liệu Ford Everest Wildtrak 2023
      </h2>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-100">Loại xe</th>
            <th className="px-6 py-3 bg-gray-100">Chu trình tổ hợp</th>
            <th className="px-6 py-3 bg-gray-100">Chu trình đô thị cơ bản</th>
            <th className="px-6 py-3 bg-gray-100">Chu trình đô thị phụ</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-6 py-4 text-center">Ford Everest Wildtrak 2023</td>
            <td className="px-6 py-4 text-center">8,00</td>
            <td className="px-6 py-4 text-center">9,6</td>
            <td className="px-6 py-4 text-center">7,1</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;