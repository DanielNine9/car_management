import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteOrderAPI,
  deleteOrderBySeller,
  getTotalAPI,
  myCartAPI,
  myCustomer,
  myCustomerAdmin,
  successOrder,
  updateMyCartAPI,
} from "../../redux/apiRequest";

interface Product {
  quantity: number;
  username: string;
  id: number;
  name: string;
  imageURL: string;
  success: boolean;
  productId: number;
}

const ProductSold: React.FC = () => {
  const isVietnamese = useSelector(
    (state: any) => state?.auth?.translate?.isVietnamese
  );
  const currentUser = useSelector(
    (state: any) => state.auth.login?.currentUser
  );
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState<Product[]>([]);

  const [editedProduct, setEditedProduct] = useState<Product | null>(null);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const getMyCart = async () => {
    setTimeout(async () => {
      if (currentUser?.access_token) {
        try {
          var res: any;
          setLoading(true);
          if (currentUser.role == "ADMIN") {
            console.log("vao day");
            res = await myCustomerAdmin(currentUser?.access_token);
          } else {
            res = await myCustomer(currentUser?.access_token);
          }
          console.log(res);
          setLoading(false);
          setCartItems(res?.data);
        } catch (e) {
          console.log(e);
        }
      }
    }, 100);
  };

  const [editQuantity, setEditQuantity] = useState<number>();

  useEffect(() => {
    if (!currentUser) {
    }
    getMyCart();
  }, []);

  const handleViewItem = async (userId: number, productId: number) => {
    console.log(currentUser);
    var result = await successOrder(
      currentUser.access_token,
      userId,
      productId
    );
    if (result?.data) {
      getMyCart();
    }
  };

  const handleRemoveItem = async (userId: number, productId: number) => {
    console.log("remove Item")
    await deleteOrderBySeller(currentUser.access_token, userId, productId);
    getMyCart();
  };

  const handleConfirm = async (cartId: number) => {
    if (editQuantity) {
      await updateMyCartAPI(
        currentUser?.access_token,
        cartId,
        editQuantity as number
      );
      setEditedProduct(null);
      getMyCart();
      setConfirmVisible(false);
    }
  };

  console.log(cartItems);
  
  return (
    <div className="p-4 container max-w-[1200px] mx-auto min-h-[300px]">
      <Link to="/">{isVietnamese ? "Trở về trang chủ" : "Home"}</Link>
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold mb-4">{isVietnamese ? "Sản phẩm đã bán" : "Product Sold"} </h2>
        <div className="mt-4 text-xl font-semibold">
          {isVietnamese ? "Tổng số lượng sản phẩm đã bán" : "Total Quantity Sold:"} {" "}
          {cartItems
            .map((product) => Number(product.quantity))
            .reduce((total, quantity) => total + quantity, 0)}
        </div>
      </div>

      {!currentUser || cartItems.length == 0 ? (
        "Your cart is empty."
      ) : (
        <>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left py-2">{isVietnamese ? "Id" : "Id"}</th>
                <th className="text-left py-2">{isVietnamese ? "Tên sản phẩm" : "Name car"} </th>
                <th className="text-left py-2">{isVietnamese ? "Hình ảnh" : "Image"}</th>
                <th className="text-left py-2">{isVietnamese ? "Tên khách hàng" : "Customer name"} </th>
                <th className="text-left py-2">{isVietnamese ? "Số lượng" : "Quantity"}</th>
                <th className="text-left py-2">{isVietnamese ? "Trạng thái" : "Stutus"}</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((product, index) => (
                <tr key={index} className="border-t">
                  <td className="py-4">{index + 1}</td>
                  <td className="py-4">{product.name}</td>
                  <td className="py-4">
                    <img
                      src={product.imageURL}
                      alt={product.name}
                      className="border border-gray-200 w-20 h-20 object-cover rounded"
                    />
                  </td>
                  <td className="py-4">{product.username}</td>
                  <td className="py-4">{product.quantity}</td>

                  {product.success == true ? (
                    <td className="py-4">
                      <button className="bg-green-600 text-white px-2 py-1 rounded">
                        {isVietnamese ? "Hoàn thành giao dịch" : "Exchange completed"} 
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded ml-2"
                        onClick={() =>
                          handleRemoveItem(product.id, product.productId)
                        }
                      >
                        {isVietnamese ? "Hủy" : "Remove"}
                      </button>
                    </td>
                  ) : (
                    <td className="py-4">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
                        onClick={() =>
                          handleViewItem(product.id, product.productId)
                        }
                      >
                        {isVietnamese ? "Xác nhận đã hoàn thành giao dịch" : "Confirm"}
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded ml-2"
                        onClick={() =>
                          handleRemoveItem(product.id, product.productId)
                        }
                      >
                        {isVietnamese ? "Hủy" : "Remove"}
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default ProductSold;
