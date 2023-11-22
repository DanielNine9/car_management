import React from "react";
import { FaShopify } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/apiRequest";

const Top = () => {
  const currentUser = useSelector(
    (state: any) => state?.auth?.login?.currentUser
  );
  // const currentUser = useSelector((state: any) => state?.login?.currentUser?.username)
  const [user, setUser] = useState<{
    username: string;
    role: string;
    imageURL: string;
  } | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setUser(currentUser);
  }, []);

  const handleLogout = () => {
    logout(currentUser.access_token, dispatch, navigate);
    setUser(null);
  };

  return (
    <div className="flex justify-between py-4">
      <div className="flex items-center gap-2 hover:cursor-pointer">
        <img
          src="https://static.vecteezy.com/system/resources/previews/003/275/730/original/shopping-bag-store-logo-online-shopping-logo-design-free-vector.jpg"
          alt="Logo"
          className="w-10 h-10 rounded-full"
        />
        <div className="flex items-center text-xl border-l-2 border-white pl-2 font-light">
          <Link to={"/"}>Cars</Link>
        </div>
      </div>
      <div className="flex gap-4 items-center">
        {user ? (
          <div className="relative group z-50">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="flex items-center gap-3 ">
                <img
                  className="w-10 h-10 rounded-full shadow"
                  src={
                    user.role == "SELLER"
                      ? "https://cdn1.iconfinder.com/data/icons/professional-avatar-14/130/professional-30-512.png"
                      : user.role == "ADMIN"
                      ? "https://cdn4.iconfinder.com/data/icons/jobs-and-occupations-3/64/Salesman-seller-transaction-advice-job-avatar-profession-occupation-512.png"
                      : "https://cdn-icons-png.flaticon.com/512/3607/3607444.png"
                  }
                  alt=""
                />
                <span className="text-lg font-medium">{user.username}</span>
              </div>
              <div className="h-[30px] w-[70px] right-0 bg-transparent absolute top-8"></div>
              <div className="group-hover:opacity-100 group-hover:block top-10 opacity-0 hidden absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg py-2 px-4 transition-opacity duration-300 z-10">
                <Link
                  to="/my-profile"
                  className="block text-gray-700 hover:text-blue-600 hover:underline"
                >
                  My Profile
                </Link>
                <hr className="my-2 border-t border-gray-300" />

                {user?.role == "ADMIN" ? (
                  <>
                    <Link
                      to="/user-management"
                      className="block text-gray-700 hover:text-blue-600 hover:underline"
                    >
                      User Management
                    </Link>
                    <Link
                      to="create-product"
                      className="block text-gray-700 hover:text-blue-600 hover:underline"
                    >
                      Create Product
                    </Link>
                    <Link
                      to="myProduct"
                      className="block text-gray-700 hover:text-blue-600 hover:underline"
                    >
                      My Products
                    </Link>
                  </>
                ) : user?.role == "SELLER" ? (
                  <>
                    <Link
                      to="create-product"
                      className="block text-gray-700 hover:text-blue-600 hover:underline"
                    >
                      Create Product
                    </Link>
                    <Link
                      to="myProduct"
                      className="block text-gray-700 hover:text-blue-600 hover:underline"
                    >
                      My Products
                    </Link>
                  </>
                ) : null}
                <hr className="my-2 border-t border-gray-300" />
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleLogout}
                    className="text-sm font-medium text-gray-700 hover:text-black cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <Link
              to={"/register"}
              className="p-2 px-4 text-sm font-medium border rounded border-gray-300 hover:bg-gray-200 transition hover:text-black"
            >
              Sign up
            </Link>
            <Link
              to={"/login"}
              state={location.pathname}
              className="bg-[#333] p-2 px-4 text-sm font-medium text-white rounded hover:bg-gray-800 transition"
            >
              Sign in
            </Link>
          </>
        )}

        <Link
          to="/cart"
          className="flex items-center gap-2 p-2 px-4 bg-red-400 rounded hover:bg-red-500 transition hover:cursor-pointer"
        >
          Cart
          <FaShopify />
        </Link>
      </div>
    </div>
  );
};

export default Top;
