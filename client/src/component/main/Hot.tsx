import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductItem from './ProductItem';
import { Product } from './type'
import { getBestSellingProduct } from '../../redux/apiRequest';
// import Loading from '../Loading';
import Empty from './Empty';


const PhoneShop: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  const [products, setProducts] = useState<Product[]>([])
  // const [loading, setLoading] = useState<boolean>(false)

  const getProducts = async () => {
    setTimeout(async () => {
      try {
        // setLoading(true)
        const res = await getBestSellingProduct()
        // setLoading(false)
        setProducts(res?.data)
      } catch (e) {
        console.log(e)
      }
    }, 100);

  }


  useEffect(() => {
    getProducts()
  }, [])

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
        <h1 className="text-3xl font-semibold text-gray-800 mb-8">Top 10 best sellings products</h1>
        <div className="bg-yellow-500 text-white py-2 px-4 rounded-md shadow-md mb-6 text-center">
          <p className="text-lg">🔥 Hot Sale! Up to 50% off on selected items</p>
        </div>
        {products.length === 0 ? (
          <Empty />
        ) : (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {currentProducts.map(product => (
                <ProductItem key={product.id} {...product} />
              ))}
            </div>
            <div className="mt-8 flex justify-center space-x-4">
              {currentPage > 1 && (
                <button onClick={prevPage} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
                  Previous
                </button>
              )}
              {currentPage < totalPages && (
                <button onClick={nextPage} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
                  Next
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </div >
  );
};

export default PhoneShop;
