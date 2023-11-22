import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";

const According = () => {
  const [open, setOpen] = React.useState(1);
  const [note, setNote] = React.useState(false);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <div className="wrapper">
      <h2 className="text-center text-3xl text-primary_color font-semibold">Những câu hỏi thường gặp về Ford Everest Widltrak Thế hệ Mới</h2>
      <Accordion open={open === 1}>
        <AccordionHeader className="text-primary_color" onClick={() => handleOpen(1)}>
          Xe Ford Everest Titanium 2023 có mấy màu?
        </AccordionHeader>
        <AccordionBody className="bg-gray-100 px-4">
          Phiên bản Ford Everest Titanium Thế hệ Mới được phân phối tại thị
          trường Việt Nam có 6 màu: <br />- Bạc <br />- Xám Meteor <br />- Nâu{" "}
          <br />- Đen <br />- Trắng tuyết
          <br />- Đỏ Cam Trong đó, với lựa chọn màu Trắng tuyết, Đỏ Cam, Khách
          hàng sẽ cần trả thêm 7.000.000 VNĐ. Khách hàng có 2 lựa chọn màu sắc
          về nội thất cho các bản Titanium là Đen Praline và Nâu hạt dẻ, trong
          đó với lựa chọn nội thất Nâu hạt dẻ, Khách hàng sẽ cần trả thêm
          7.000.000 VNĐ.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2}>
        <AccordionHeader className="text-primary_color" onClick={() => handleOpen(2)}>
          Tôi muốn tìm thông số kỹ thuật Ford Everest Titnaium 2023.
        </AccordionHeader>
        <AccordionBody className="bg-gray-100 px-4">
          Bạn có thể tìm hiểu chi tiết về thông số kỹ thuật, màu xe hay kích
          thước phiên bản Ford Everest Titanium 2023 bằng cách tải về
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 3}>
        <AccordionHeader className="text-primary_color" onClick={() => handleOpen(3)}>
          Giá lăn bánh xe Ford Everest Titnaium 2023 là bao nhiêu?
        </AccordionHeader>
        <AccordionBody className="bg-gray-100 px-4">
          Ford Everest Titanium+ Thế hệ Mới có mức giá khuyến nghị từ
          1.468.000.000 VNĐ. Xe Ford Everest Titanium Thế hệ Mới có mức giá
          khuyến nghị từ 1.299.000.000 VNĐ. Với lựa chọn màu sơn ngoại thất
          Trắng tuyết, Đỏ Cam hoặc trang bị nội thất Nâu Praline, Khách hàng sẽ
          cần trả thêm 7.000.000 VNĐ.
          <br />
          Giá lăn bánh sẽ phụ thuộc vào các yếu tố sau:
          <br />
          Giá bán thỏa thuận giữa Khách hàng và Đại lý; Chi phí thuế trước bạ từ
          10% - 12% tùy theo địa phương; Phí đăng ký xe: Tùy thuộc vào địa
          phương đăng ký; Phí biển số: Tùy thuộc vào địa phương;
          <br />
          Nhấp vào đây để nhận được báo giá lăn bánh xe ô tô Ford Everest
          Titanium+ và Tianium từ Đại lý Ford.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 4}>
        <AccordionHeader className="text-primary_color" onClick={() => handleOpen(4)}>
          Tôi muốn so sánh phiên bản Ford Everest Titanium+, Ford Everest
          Titanium và phiên bản Ford Everest Ambiente.
        </AccordionHeader>
        <AccordionBody className="bg-gray-100 px-4">
          Bạn có thể so sánh thông số kỹ thuật của phiên bản Ford Everest
          Titanium+, Titanium và phiên bản Ford Everest Ambiente Thế hệ Mới nhất
          tại trang So sánh xe. Về cơ bản, phiên bản Ford Everest Titanium và và
          phiên bản Ford Everest Ambiente khác nhau ở những điểm sau:
          <br />
          Động cơ và hệ truyền động: Phiên bản Ford Everest Titanium+ sử dụng
          động cơ tăng áp 2.0L Bi-turbo Số tự động 10 cấp điện tử; còn phiển bản
          Ford Everest Titanium và Ford Everest Ambiente đều được trang bị động
          cơ diesel 2.0L Single Turbo tăng áp Số tự động 6 cấp. Ford Everest
          Titanium+ được trang bị hệ thống truyền động 2 cầu bán thời gian 4x4
          trong khi Ford Everest Titanium và Ambiente chỉ có hệ thống truyền
          động 1 cầu 4x2.
          <br />
          Thiết kế ngoại thất: Ford Everest Titanium+ và Titanium có thiết kế
          ngoại thất cao cấp sang trọng với các chi tiết được mạ crôm như tay
          nắm cửa, giá nóc xe, cụm chữ TITANIUM 3D đằng sau xe cùng hệ thống đèn
          pha LED tự động, cửa sổ trời toàn cảnh và mâm xe hợp kim 20 inch. Ford
          Everest Ambiente có thiết kế ngoại thất đặc trưng với cụm đèn LED hình
          chữ C nhưng đơn giản hơn với các chi tiết như tay nắm cửa theo màu xe,
          giá nóc xe sơn màu đen và mâm xe hợp kim 18 inch.
          <br />
          Trang bị nội thất: Ford Everest Titanium+ và Titanium cho Khách hàng 2
          lựa chọn nội thất da cao cấp (Nội thất màu Đen Ebony và màu Nâu
          Praline) Ford Everest Ambiente chỉ có 1 lựa chọn nội thất.
          <br />
          Tính năng an toàn & thông minh: Cả hai phiên bản đều được trang bị các
          tính năng an toàn như hệ thống phanh ABS, EBD, ESP và hỗ trợ khởi hành
          ngang dốc. Ford Everest Titanium+ và Titanium được trang bị các tính
          năng an toàn và thông minh cao cấp hơn như hệ thống Camera toàn cảnh
          (Camera 360), Kiểm soát đổ đèo (chỉ có trên xe Titanium+), Cảnh báo
          điểm mù kết hợp Cảnh báo có xe cắt ngang, Cảnh báo va chạm và Hỗ trợ
          phanh khẩn cấp, Cảnh báo lệch làn đường và hỗ trợ giữ làn đường, Kiểm
          soát áp suất lốp…
          <br />
          Giá niêm yết
        </AccordionBody>
      </Accordion>

      <Accordion open={open === 5}>
        <AccordionHeader className="text-primary_color" onClick={() => handleOpen(5)}>
          Nên lựa chọn Ford Everest Titanium 1 cầu hay 2 cầu?
        </AccordionHeader>
        <AccordionBody className="bg-gray-100 px-4">
          Bạn nên lựa chọn Ford Everest Titanium 1 cầu hay 2 cầu tùy thuộc vào
          khả năng tài chính, nhu cầu sử dụng và yêu cầu khi di chuyển trên các
          bề mặt địa hình, điều kiện đường xá khác nhau.
          <br />
          Xe 1 cầu thông thường có giá niêm yết thấp hơn xe 2 cầu cùng loại. Tuy
          nhiên, xe 2 cầu cho khả năng vận hành linh hoạt hơn trên nhiều điều
          kiện địa hình và giúp tăng khả năng vượt địa hình so với các dòng xe 1
          cầu.
          <br />
          Phiên bản Ford Everest Wildtrak và Ford Everest Titanium+ là phiên bản
          được trang bị động cơ 2.0L Bi-turbo và hệ thống dẫn động 2 cầu bán
          thời gian 4x4 cùng hệ thống kiểm soát đường địa hình, màn hình
          offroad. Bạn có thể lựa chọn một trong 6 Chế độ Lái tùy chọn gồm Chế
          độ vận hành trên đường thông thường, Chế độ tiết kiệm, Chế độ kéo và
          chở nặng, Chế độ vận hành trên bề mặt trơn trượt, Chế độ vận hành trên
          Bùn lầy, Chế độ vận hành trên đường cát. Đọc thêm về Chế độ lái tùy
          chọn trên phiên bản xe Ford Everest 4x4 tại đây.
          <br />
          Phiên bản Ford Everest Titanium, Ford Everest Sport và Ford Everest
          Ambient là phiên bản bản được trang bị động cơ 2.0 Single Turbo và hệ
          thống dẫn động 1 cầu 4x2. Đây là sự kết hợp hiệu quả giúp khách hàng
          tiết kiệm chi phí sở hữu và chi phí nhiên liệu khi sử dụng xe trên
          điều kiện địa hình thông thường.
        </AccordionBody>
      </Accordion>

      <Accordion open={open === 6}>
        <AccordionHeader className="text-primary_color" onClick={() => handleOpen(6)}>
          Sử dụng Ford Everest Titanium+ và Tianium 2023 có tốn nhiên liệu
          không?
        </AccordionHeader>
        <AccordionBody className="bg-gray-100 px-4">
          Ford Everest Titanium+ được trang bị động cơ diesel 2.0L Bi-Turbo đã
          được cải tiến, cho công suất mạnh mẽ, vận hành tinh tế nhưng vẫn tiết
          kiệm nhiên liệu. Mức tiêu hao nhiên liệu của Ford Everest Titanium+
          2023 chỉ từ 7.45 L/100Km cho chu trình đô thị phụ.
          <br />
          - Chu trình tổ hợp: Mức tiêu hao nhiên liệu chỉ 8,43 L/100km
          <br />
          - Chu trình đô thị cơ bản: Mức tiêu hao nhiên liệu chỉ 10,09 L/100km
          <br />
          - Chu trình đô thị phụ: Mức tiêu hao nhiên liệu chỉ 7,45 L/100km
          <br />
          Phiên bản Ford Everest Titanium được trang bị động cơ diesel 2.0L
          Single Turbo là sự lựa chọn hợp lý giúp khách hàng tiết kiệm chi phí
          sở hữu và chi phí nhiên liệu. Mức tiêu hao nhiên liệu của Ford Everest
          Titanium 2023 chỉ từ 6,8 L/100Km cho chu trình đô thị phụ.
          <br />
          Quý khách hàng có thể tham khảo thông tin tiêu hao nhiên liệu của Ford
          Everest Titanium theo từng điều kiện đường xá dưới đây:
          <br />
          - Chu trình tổ hợp: Mức tiêu hao nhiên liệu chỉ 8,2 L/100km
          <br />
          - Chu trình đô thị cơ bản: Mức tiêu hao nhiên liệu chỉ 10,5 L/100km
          <br />- Chu trình đô thị phụ: Mức tiêu hao nhiên liệu chỉ 6,8 L/100km
        </AccordionBody>
      </Accordion>
      <img
        src="https://www.ford.com.vn/content/dam/ecomm/u704/release-3/vn/models/wildtrak/wildtrak-kba.jpg.renditions.original.png"
        alt=""
      />
      <Accordion open={note}>
        <AccordionHeader onClick={() => setNote(!note)} className="text-primary_color flex justify-center gap-4">
          LƯU Ý{!note ? <AiOutlineArrowDown /> : <AiOutlineArrowUp />}
        </AccordionHeader>
        <AccordionBody className="bg-gray-100 px-4 py-10 text-xl">
          Hình ảnh minh họa là phiên bản nước ngoài. Hình ảnh và màu sắc có thể
          không đúng so với thực tế. Một số tính năng có thể không được trang bị
          trên tất cả phiên bản trong một dòng sản phẩm.
        </AccordionBody>
      </Accordion>
    </div>
  );
};

export default According;
