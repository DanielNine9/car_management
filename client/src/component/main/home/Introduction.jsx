import IntroductionItem from "./IntroductionItem";

const Introduction = () => {
  const datas = [
    {
      title: "Thiết kế ngoại thất táo bạo",
      desc: "Lưới tản nhiệt độc đáo của Everest Wildtrak gây ấn tượng với cản trước hình dạng chữ H, viền lưới tản nhiệt, gờ mép bánh xe, ốp mang cá được hoàn thiện với màu Xám đậm giúp chiếc xe nổi bật hơn. Bệ lên xuống tiện dụng và phong cách, cùng thanh giá nóc bằng hợp kim giúp chiếc xe có thiết kế ngoại thất táo bạo hơn. Logo Wildtrak được hiển thị trên nắp ca-pô, cửa trước và cửa sau xe.",
      img: "https://www.ford.com.vn/content/dam/ecomm/u704/release-3/vn/models/wildtrak/everest-wildtrak-grille.jpg.renditions.original.png"
    },
    {
      title: "Bánh xe 20 inch",
      desc: "Everest Wildtrak được trang bị mâm xe hợp kim 20 inch đa chấu với các chi tiết màu Xám đậm.",
      img: "https://www.ford.com.vn/content/dam/ecomm/u704/release-3/vn/models/wildtrak/everest-wildtrak-wheels.jpg.renditions.original.png"
    },
    {
      title: "Bảng Điều Khiển Kỹ thuật số Cao Cấp",
      desc: "Everest Wildtrak có nội thất cao cấp với trang bị màn hình cụm đồng hồ kỹ thuật số lớn 12,4 inch và có thể tùy chỉnh hiển thị thông tin theo ý muốn.",
      img: "https://www.ford.com.vn/content/dam/ecomm/u704/release-3/vn/models/wildtrak/everest-wildtrak-dashboard.jpg.renditions.original.png"
    },
    {
      title: "Nội thất sang trọng",
      desc: "Ghế lái và ghế hành khách phía trước có logo Wildtrak được thêu bằng đường chỉ khâu màu Cam Cyber nổi bật. Ghế bọc da sang trọng, êm ái mang đến cảm giác thoải mái cho cả gia đình và toàn bộ hành khách.",
      img: "https://www.ford.com.vn/content/dam/ecomm/u704/release-3/vn/models/wildtrak/everest-wildtrak-seats.jpg.renditions.original.png"
    },
  ];

  return (
    <div className="wrapper">
      <h1 className="text-center text-4xl text-primary_color my-4">
        Những tính năng nổi bật trên Ford Everest Wildtrak Thế Hệ Mới 2023
      </h1>
      <img
        src="https://www.ford.com.vn/content/dam/ecomm/u704/release-3/vn/models/wildtrak/vn-everest-wildtrak-banner-1.jpg.renditions.original.png"
        alt=""
      />
      <div className="flex justify-center gap-20 text-2xl my-10 ">
        <p className="border-r-2 border-primary_color pr-10">
          Giá niêm yết từ
          <br />
          <span className="text-primary_color font-semibold">1.499.000.000 VNĐ</span>
        </p>
        <p className="border-r-2 border-primary_color pr-10">
          Động cơ
          <br />
          <span className="text-primary_color font-semibold">2.0L Bi-Turbo</span>
        </p>
        <p>
          Kiểu Dáng Thân Xe
          <br />
          <span className="text-primary_color font-semibold">5 Cửa</span>
        </p>
      </div>

      <div className="grid grid-cols-2 grid-rows-2 gap-10">
        {datas.map((data, index) => (
          <IntroductionItem key={index} data={data} />
        ))}
      </div>
    </div>
  );
};

export default Introduction;
