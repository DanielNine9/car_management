import React, { ReactElement, useState, useEffect } from "react";
import { Product } from "./type";
import ProductItem from "./ProductItem";
import { getAllProducts } from "../../redux/apiRequest";
// import Loading from '../Loading';
import Empty from "./Empty";
import { useSelector } from "react-redux";

const Filter: React.FC = (): ReactElement => {
  const isVietnamese = useSelector(
    (state: any) => state?.auth?.translate?.isVietnamese
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10; // Show 20 products per page

  // Your products data
  const [products, setProducts] = useState<Product[]>([]);
  // const [loading, setLoading] = useState<boolean>(false)
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    setTimeout(async () => {
      try {
        // setLoading(true)
        const res = await getAllProducts();
        // setLoading(false)
        setProducts(res?.data);
      } catch (e) {
        console.log(e);
      }
    }, 100);
  };

  // if (loading) {
  //     return <Loading />
  // }

  const filteredProducts = products.filter((product) => {
    const nameMatches = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const priceInRange =
      (minPrice === "" || product.price >= parseFloat(minPrice)) &&
      (maxPrice === "" || product.price <= parseFloat(maxPrice));
    const categoryMatches = category === "" || product.type === category;
    return nameMatches && priceInRange && categoryMatches;
  });

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

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
    <div className="bg-gray-100 min-h-screen py-12 px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
          {isVietnamese ? "Tìm xe mà bạn thích": "Find your favorite car"}
        </h1>

        <div className="flex items-center space-x-4 mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-1/3 px-4 py-2 rounded shadow border border-gray-300 focus:outline-none focus:border-blue-500"
            placeholder="Search for products..."
          />
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="Min Price"
            className="w-1/6 px-4 py-2 rounded shadow border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Max Price"
            className="w-1/6 px-4 py-2 rounded shadow border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-1/4 px-4 py-2 rounded shadow border border-gray-300 focus:outline-none focus:border-blue-500"
          >
            <option value="">{isVietnamese ? "Tất cả loại xe": "All Categories"}</option>
            <option value="two">{isVietnamese ? "2 chỗ" : "Two seats"}</option>
            <option value="four">{isVietnamese ? "4 chỗ" : "Four seats"}</option>
            <option value="seven">{isVietnamese ? "7 chỗ" : "Seven seats"}</option>
            <option value="five">{isVietnamese ? "5 chỗ" : "Five seats"}</option>

            {/* Add more category options */}
          </select>
        </div>
        {products.length === 0 ? (
          <Empty />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {currentProducts.map((product) => (
                <ProductItem key={product.id} {...product} />
              ))}
            </div>

            <div className="mt-8 flex justify-center space-x-4">
              {currentPage > 1 && (
                <button
                  onClick={prevPage}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                >
                 {isVietnamese ? "Trang trước":"Previous"}
                </button>
              )}
              {currentPage < totalPages && (
                <button
                  onClick={nextPage}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                >
                 {isVietnamese ? "Trang sau":"Next"}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Filter;
