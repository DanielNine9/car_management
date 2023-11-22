import React from "react";

const ChooseColor = () => {
    const [color, setColor] = React.useState(1);

    const imgs = [
        "https://images.autofun.vn/file1/1a441601f0f24a30b98bb5da30616a4e_1125x630.jpg",
        "https://fordhaiphong.vn/image/catalog/san-pham/FORD-EVEREST-TITANIUM--2023.png",
        "https://img.tinxe.vn/resize/1000x-/2023/01/21/0MQViQLm/ford-everest-wildtrak-2023-1-d184.jpg",
        "https://images2.thanhnien.vn/Uploaded/chicuong/2022_11_01/ford-everest-2023-1-2629.jpg"
    ]

  return (
    <div className="wrapper text-center w-full">
      <h2 className="text-center text-3xl text-primary_color font-semibold">
        Khám phá ngoại thất & tùy chọn màu sắc Ford Everest Wildtrak Thế Hệ Mới
        360°
      </h2>
      <img
        src={imgs[color-1]}
        alt=""
        className="w-full bg-cover h-[700px]" 
      />
      <div className="flex gap-10 text-center bg-gray-300 px-4 justify-center py-6 my-3">
        <div onClick={() => setColor(1)} className={`${color === 1 ? "border-black border" : ""} rounded-full h-[50px] w-[50px] overflow-hidden`}>
          <img
            className="cursor-pointer w-full h-full"
            src="https://www.gpas-cache.ford.com/colourchip/PNZAT_AbsoluteBlack.jpg"
            alt=""
          />
        </div>

        <div onClick={() => setColor(2)} className={`${color === 2 ? "border-black border" : ""} rounded-full h-[50px] w-[50px] overflow-hidden`}>
          <img
            className="cursor-pointer w-full h-full"
            src="https://www.gpas-cache.ford.com/colourchip/PMYE9_SnowflakeWhite_AlabasterWhite.jpg"
            alt=""
          />
        </div>
        <div onClick={() => setColor(3)} className={`${color === 3 ? "border-black border" : ""} rounded-full h-[50px] w-[50px] overflow-hidden`}>
          <img
            className="cursor-pointer w-full h-full"
            src="https://www.gpas-cache.ford.com/colourchip/PN4FU_LuxeYellow.jpg"
            alt=""
          />
        </div>
        <div onClick={() => setColor(4)} className={`${color === 4 ? "border-black border" : ""} rounded-full h-[50px] w-[50px] overflow-hidden`}>
          <img
            className="cursor-pointer w-full h-full"
            src="https://www.gpas-cache.ford.com/colourchip/PN4GR_SedonaOrange.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default ChooseColor;
