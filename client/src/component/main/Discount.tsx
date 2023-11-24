import React, { useState, useEffect } from 'react';
import ProductItem from './ProductItem';
import { Product } from './type'
import { getBestDiscountProduct } from '../../redux/apiRequest';
// import Loading from '../Loading';
import Empty from './Empty';
import { useSelector } from 'react-redux';


const Discount: React.FC = () => {
  const isVietnamese = useSelector(
    (state: any) => state?.auth?.translate?.isVietnamese
  );

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = async () => {
    setTimeout(async () => {
      try {
        setLoading(true)
        const res = await getBestDiscountProduct()
        setLoading(false)
        setProducts(res?.data)
      } catch (e) {
        console.log(e)
      }
    }, 100);
  }

  // if (loading) {
  //   return <Loading />
  // }




  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="bg-[#f2f2f2]">
      <div className="container bg-white rounded-sm mx-auto p-4">
        <h1 className="text-3xl font-semibold text-gray-800 mb-8">{isVietnamese ? "Top 10 sản phẩm giảm giá nhiều nhất": "Top 10 Most Discounted Products"}</h1>
        <div className="bg-yellow-500 text-white py-2 px-4 rounded-md shadow-md mb-6 text-center">
          <p className="text-lg">🔥 {isVietnamese ? "Giảm tới 50% cho các mặt hàng được chọn": "Special Offer! Up to 50% off on selected items"}</p>
        </div>
        {products.length === 0 ? (
          <Empty />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {currentProducts.map(product => (
                <ProductItem key={product.id} {...product} />
              ))}
            </div>
            <div className="mt-8 flex justify-center space-x-4">
              {currentPage > 1 && (
                <button onClick={prevPage} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
                  {isVietnamese ? "Trang trước": "Previous Page"}
                </button>
              )}
              {currentPage < totalPages && (
                <button onClick={nextPage} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
                  {isVietnamese ? "Trang sau": "Next Page"}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Discount;
