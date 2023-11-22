// import React, { ReactElement } from 'react';
// import { useParams } from 'react-router-dom';
// import { Product } from './type'; // Đảm bảo bạn đã import kiểu Product

// interface ProductDetailProps {
//     products: Product[]; // Đảm bảo bạn truyền danh sách sản phẩm vào từ component cha
// }

// const ProductDetail: React.FC<ProductDetailProps> = ({ products }): ReactElement => {
//     const { id } = useParams<{ id: string }>(); // Lấy id sản phẩm từ tham số định tuyến

//     const product = products.find(product => product.id === parseInt(id)); // Tìm sản phẩm với id tương ứng

//     if (!product) {
//         return <div>Product not found</div>; // Xử lý trường hợp không tìm thấy sản phẩm
//     }

//     const { image, name, price, category, discount } = product;

//     return (
//         <div className="bg-white p-4 rounded-lg shadow-md">
//             <div className="relative">
//                 <img src={image} alt={name} className="w-full h-48 object-cover rounded-t-lg mb-4" />
//                 <span className="absolute top-0 right-0 bg-blue-500 text-white py-1 px-2 rounded-tl-lg rounded-br-md">
//                     {category}
//                 </span>
//             </div>
//             <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
//             <p className="text-gray-600">${price.toFixed(2)}</p>
//             {discount && discount > 0 ? (
//                 <p className="text-green-500">Sale: {discount}% off</p>
//             ) : (
//                 <p className="text-green-500">No sale</p>
//             )}
//         </div>
//     );
// };

// export default ProductDetail;
import React from 'react';
interface Product {
    id: number;
    name: string;
    price: number;
    local: string;
    source: string;
    type: string;
    sellerId: number;
    image: string;
}

const productData: Product = {
    id: 1,
    name: 'Example Product',
    price: 29.99,
    local: 'Local Source',
    source: 'Example Source',
    type: 'Example Type',
    sellerId: 123,
    image: 'https://via.placeholder.com/300',
};

const ProductDetail: React.FC = () => {
    return (
        <div className="container mx-auto p-4">
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="grid grid-cols-2 gap-8">
                    <div className="col-span-1">
                        <img src={productData.image} alt={productData.name} className="w-full rounded-lg shadow-md" />
                    </div>
                    <div className="col-span-1">
                        <h1 className="text-2xl font-semibold mb-2">{productData.name}</h1>
                        <p className="text-gray-600 mb-1">Type: {productData.type}</p>
                        <p className="text-gray-600 mb-1">Local: {productData.local}</p>
                        <p className="text-xl font-semibold mb-4">${productData.price}</p>
                        <p className="text-gray-600 mb-4">{productData.source}</p>
                        <p className="text-gray-600">Seller ID: {productData.sellerId}</p>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;


