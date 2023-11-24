import React from 'react'
import { useSelector } from 'react-redux';

type Props = {}

const Empty = (props: Props) => {
    const isVietnamese = useSelector(
        (state: any) => state?.auth?.translate?.isVietnamese
      );
    return (
        <div>
            <div className="bg-white p-4 rounded shadow-md">
                <p className="text-xl font-semibold mb-2">{isVietnamese ? "Shop hiện chưa có sản phẩm": "Shop is empty"}.</p>
                <p className="text-gray-500">{isVietnamese ? "Thêm một số sản phẩm vào giỏ hàng của bạn trước khi thanh toán" : "Add some products to your cart before checking out"}.</p>
            </div>

        </div>
    )
}

export default Empty