import React, { ReactElement } from 'react';
import { Product } from './type';
import { Link, useNavigate } from 'react-router-dom';
import ProductDetail from './ProductDetail';
import { useSelector } from 'react-redux';

const ProductItem: React.FC<Product> = (product: Product): ReactElement => {
    const navigate = useNavigate()
    const handleViewDetail = () => {
        navigate(`/view-detail/${product.id}`)
    }

    const isVietnamese = useSelector(
        (state: any) => state?.auth?.translate?.isVietnamese
      );
  
    return (
        <div className="border rounded pb-4 shadow-md flex flex-col items-center transition-transform transform hover:scale-105">
            <img src={product.imageURL} alt={product.name} className="w-full h-[200px] object-contain mb-4" />
            <h3 className="text-lg font-semibold mb-2">{product.name.length > 20 ? product.name.slice(0, 20) + "..." : product.name}</h3>
            <p className="text-gray-600">
                <del className='text-[14px] text-gray-400'>${(product.price).toFixed(2)}</del>  ${(product.price - (product.price * product.discount)).toFixed(2)}
            </p>
            {product.discount > 0 && (
                <p className="text-green-500">{isVietnamese ? "Giảm: ": "Discount"}: {(product.discount * product.price).toFixed(2)}</p>
            )}
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-4" onClick={handleViewDetail}>
                {isVietnamese ? "Xem chi tiết": "View Detail"}
            </button>
        </div>
    );
};

export default ProductItem;
