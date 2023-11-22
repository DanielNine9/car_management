import React, { useState, useEffect } from "react";
import {
  useLocation,
  useNavigate,
  useNavigation,
  useParams,
} from "react-router-dom";
import {
  buyAPI,
  formatDate,
  getProduct,
  getUserGlobal,
} from "../../redux/apiRequest";
import Loading from "../Loading";
import { useSelector } from "react-redux";

interface Product {
  id: number;
  name: string;
  price: number;
  local: string;
  source: string;
  type: string;
  sellerId: number;
  imageURL: string;
  desc: string;
  discount: number;
  orderCount: number;
  created_at: string;
}

interface User {
  username: string;
  email: string;
  address: string;
  role: string;
  imageURL: string;
  created_at: string;
}

const ViewDetail: React.FC = () => {
  const currentUser = useSelector(
    (state: any) => state.auth.login?.currentUser
  );
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [productData, setProductData] = useState<Partial<Product>>({});
  const [user, setUser] = useState<Partial<User>>({});
  const { productId } = useParams();
  const currentLocation = useLocation();

  const getProductDetail = async () => {
    try {
      setLoading(true);
      const res = await getProduct(productId as string);
      const resUser = await getUserGlobal(res?.data?.sellerId);
      setProductData(res?.data);
      setUser(resUser?.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getProductDetail();
  }, []);

  if (loading) {
    return <Loading />;
  }

  function handleAddToCart() {
    if (!currentUser) {
      return navigate("/login", { state: currentLocation.pathname });
    }
    buyAPI(currentUser.access_token, String(productData.id), navigate);
  }
  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:col-span-1">
              <div className="relative h-[360px] w-[540px]">
                <img
                  src={productData.imageURL}
                  alt={productData.name}
                  className="w-full rounded-lg h-full object-contain shadow-md"
                />
                <div className="">
                  Created on date:{" "}
                  {productData.created_at &&
                    formatDate(productData.created_at as string)}
                </div>
                <div className="bg-red-500 text-white text-4xl px-2 font-semibold absolute top-0 right-0 p-1 rounded-tr-lg">
                  {(productData.discount as number) * 100}%
                </div>
              </div>
              <p className="text-gray-600 mt-4">Seller:</p>
              <div className="">
                <div className="flex items-end gap-4">
                  <img
                    className="w-[50px] h-[50px] object-cover shadow"
                    src={
                      user.role == "SELLER"
                        ? "https://cdn1.iconfinder.com/data/icons/professional-avatar-14/130/professional-30-512.png"
                        : user.role == "ADMIN"
                        ? "https://cdn4.iconfinder.com/data/icons/jobs-and-occupations-3/64/Salesman-seller-transaction-advice-job-avatar-profession-occupation-512.png"
                        : "https://cdn-icons-png.flaticon.com/512/3607/3607444.png"
                    }
                    alt={user.username}
                  />
                  {user.username}
                </div>
              </div>

              {/* <div className="mt-4 grid grid-cols-3 gap-2">

                                {productData.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={productData.name}
                                        className={`cursor-pointer w-full h-[100px] rounded-md ${image === currentImage ? 'border-2 border-blue-500' : ''
                                            }`}
                                        onClick={() => setCurrentImage(image)}
                                    />
                                ))}
                            </div> */}
            </div>
            <div className="md:col-span-1 flex flex-col justify-between">
              <div>
                <h1 className="text-3xl font-semibold mb-2">
                  {productData.name}
                </h1>
                <p className="text-gray-600 mb-1">Type: {productData.type}</p>
                <p className="text-gray-600 mb-1">Local: {productData.local}</p>
                <p className="text-2xl font-semibold mb-4">
                  Price:{" "}
                  <del className="text-[16px] text-gray-400">
                    ${productData.price}
                  </del>{" "}
                  ${productData.price as number - ((productData.price as number) *
                    (productData.discount as number))}
                </p>
                <p className="max-h-[264px] overflow-y-scroll">
                  {productData.desc}
                </p>
                <p className="text-gray-600 mb-4">{productData.source}</p>
                <p className="text-gray-600 mb-4">
                  Order count: {productData.orderCount}
                </p>
              </div>

              <div className="text-right">
                <button
                  className="mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-full "
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetail;
