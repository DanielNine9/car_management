import React, { ChangeEvent, useState } from "react";
import {
  deleteMyProduct,
  deleteMyProducts,
  editMyProduct,
  myProduct,
} from "../../redux/apiRequest";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

interface Product {
  id: number;
  name: string;
  price: number;
  local: string;
  source: string;
  type: string;
  sellerId: number;
  delete: boolean;
  created_at: string;
  desc: string;
  discount: number;
  imageURL: string;
}

const MyProduct = () => {
  const isVietnamese = useSelector(
    (state: any) => state?.auth?.translate?.isVietnamese
  );
  const currentUser = useSelector(
    (state: any) => state.auth.login?.currentUser
  );
  const [userProducts, setUserProducts] = useState<Product[]>([]);
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]); // Danh sách sản phẩm đã được chọn để xóa

  const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState<number | null>(null);
  const [editOverlay, setEditOverlay] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<String>("")
  const navigate = useNavigate();
  const [editProduct, setEditProduct] = useState<Partial<Product>>({});
  const handleMyProduct = async () => {


    setTimeout(async () => {
      getProducts()
    }, 100);
  };

  const getProducts = async () => {
    try {
      setLoading(true);
      const res = await myProduct(currentUser?.access_token, navigate);
      setLoading(false);
      setUserProducts(res?.data);
    } catch (e) {
      console.log(e);
    }

  }

  React.useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }

    handleMyProduct();
  }, []);

  if (loading) {
    return (
      <>
        <div className="min-h-[calc(30vh)]"></div>
        <div className="flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 ">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
        </div>
      </>
    );
  }

  const handleDelete = (id: number) => {
    setDeleteConfirmationOpen(true);
    setDeleteProductId(id);
  };

  const confirmDelete = () => {
    if (deleteProductId !== null) {
      deleteMyProduct(deleteProductId, currentUser.access_token, navigate)
        .then(() => {
          setUserProducts(
            userProducts.filter((pre: any) => pre.id !== deleteProductId)
          );
          setDeleteConfirmationOpen(false);
        })
        .catch((error) => {
          console.error("Error deleting product:", error);
          setDeleteConfirmationOpen(false);
        });
    }
  };
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setError("")
    var { name, value } = e.target;
    if (name === "price") {
      if (isNaN(parseFloat(value)) || parseFloat(value) < 0) {
        value = Math.abs(parseFloat(value)).toString();
      }
    }
    console.log(value)
    setEditProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const cancelDelete = () => {
    // Close the confirmation dialog without performing any action.
    setDeleteConfirmationOpen(false);
  };
  const handleEdit = (product: Product) => {
    setEditProduct(product);
    setEditOverlay(true);
  };

  async function handleSave(e: any): Promise<void> {
    // alert("vao day")
    e.preventDefault()
    if (editProduct.name === "") {
      const mess = isVietnamese ? "Tên không được bỏ trống" : "Name cannot be empty";
      setError(mess);
      return;
    }

    if (editProduct.price != undefined && editProduct.price == 0) {
      var mess = isVietnamese ? "Giá không được bỏ trống" : "Price is not empty"
      setError(mess)
      return;
    }

    if (editProduct.source === "") {
      const mess = isVietnamese ? "Nguồn gốc không được bỏ trống" : "Source cannot be empty";
      setError(mess);
      return;
    }

    if (editProduct.desc == "") {
      var mess = isVietnamese ? "Vui lòng nhập mô tả chỏ sản phẩm" : "Description can not empty"
      setError(mess)
      return;
    }

    if (editProduct.discount != undefined && editProduct.discount < 0 || editProduct.price != undefined && editProduct.price < 0) {
      const mess = isVietnamese ? "Giá hoặc giảm giá không được âm" : "Price or discount cannot be negative";
      setError(mess);
      return;
    }

    if (editProduct.discount != undefined && editProduct.discount > 1) {
      const mess = isVietnamese ? "Giảm giá không được lớn hơn 1" : "Discount cannot be greater than 1";
      setError(mess);
      return;
    }

    if (editProduct.imageURL != undefined && editProduct.imageURL === "") {
      const mess = isVietnamese ? "Vui lòng nhập link ảnh" : "Please enter the image link";
      setError(mess);
      return;
    }

    try {
      await editMyProduct(
        editProduct,
        editProduct.id as number,
        currentUser.access_token,
        navigate
      );
      setEditOverlay(false);
      handleMyProduct();
      await getProducts()
    } catch (error) {
      // Handle error from editMyProduct
      console.error("Error while editing product:", error);
      // For example:
      // setError("Failed to save product. Please try again.");
    }
  }


  // Hàm xử lý khi người dùng chọn hoặc bỏ chọn một sản phẩm để xóa
  const handleSelectProduct = (productId: number) => {
    if (selectedProductIds.includes(productId)) {
      // Nếu sản phẩm đã được chọn, bỏ chọn nó
      setSelectedProductIds(
        selectedProductIds.filter((id) => id !== productId)
      );
    } else {
      // Nếu sản phẩm chưa được chọn, thêm nó vào danh sách đã chọn
      setSelectedProductIds([...selectedProductIds, productId]);
    }
  };

  // Hàm xử lý khi người dùng nhấn nút "Delete All"
  const handleDeleteSelectedProducts = async () => {
    // Gửi danh sách sản phẩm đã chọn đến API để xóa
    if (selectedProductIds.length > 0) {
      deleteMyProducts(
        selectedProductIds,
        currentUser.access_token,
        navigate
      ).then(() => handleMyProduct());
      // deleteMyProduct(selectedProductIds, currentUser.access_token, navigate)
      //     .then(() => {
      //         // Sau khi xóa thành công, cập nhật danh sách sản phẩm hiển thị
      //         setUserProducts(userProducts.filter((product) => !selectedProductIds.includes(product.id)));
      //         setSelectedProductIds([]); // Đặt lại danh sách đã chọn về rỗng
      //     })
      //     .catch((error) => {
      //         console.error('Error deleting selected products:', error);
      //     });
    }
  };

  function handleCancel() {
    setEditOverlay(false);
  }
  return (
    <div className="container mx-auto mt-8 ">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold mb-4">{isVietnamese ? "Sản phẩm của tôi" : "My Products"}</h2>

        <div className="flex gap-2">
          {selectedProductIds.length > 0 && (
            <button
              onClick={handleDeleteSelectedProducts}
              className="px-4 py-1 bg-red-600 text-white"
            >
              {isVietnamese ? "Xóa những sản phẩm đã chọn" : "Delete Selected"}
            </button>
          )}
          <Link
            to="/myProductDelete"
            className="flex items-center gap-2 bg-green-500 text-black px-2 py-1 hover:bg-green-300"
          >
            <FontAwesomeIcon icon={faTrash} />
            {isVietnamese ? "Sản phẩm đã xóa" : "Products are deleted"}
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {userProducts?.length === 0 ? (
          <div className="min-h-[calc(22vh)]">{isVietnamese ? "Chưa đăng sản phẩm nào" : "My product is empty"}</div>
        ) : (
          userProducts?.map((product: any) => (
            <div key={product.id} className="bg-white p-4 rounded shadow-md">
              <input
                type="checkbox"
                checked={selectedProductIds.includes(product.id)}
                onChange={() => handleSelectProduct(product.id)}
                className="mr-2"
              />
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>

              <p className="text-gray-600 mb-2">{isVietnamese ? "Giá" : "Price"}: ${product.price}</p>
              <p className="text-gray-600 mb-4">{isVietnamese ? "Kiểu" : "Type"}: {product.type}</p>
              <p className="text-gray-600">
                {isVietnamese ? "Mô tả" : "Description"}:{" "}
                {product.desc.length >= 20
                  ? product.desc.slice(0, 20) + "..."
                  : product.desc}
              </p>
              <p className="text-gray-600">{isVietnamese ? "" : ""}Discount: {product.discount}%</p>
              <img
                src={product.imageURL}
                alt={product.name}
                className="mt-2 w-[300px] h-[200px] object-contain"
              />
              <div className="flex justify-between mt-4">
                <button
                  className="px-4 py-1 bg-red-600 text-white"
                  onClick={() => handleDelete(product.id)}
                >
                  {isVietnamese ? "Xóa" : "Delete"}
                </button>

                <button
                  className="px-4 py-1 bg-blue-400 text-white"
                  onClick={() => handleEdit(product)}
                >
                  {isVietnamese ? "Chỉnh sửa" : "Edit"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {isDeleteConfirmationOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-4 rounded shadow-md">
            <p className="text-lg font-semibold mb-2">
              {isVietnamese ? "Bạn có chắc muốn xóa sản phẩm này" : "Are you sure you want to delete this product?"}
            </p>
            <div className="flex justify-between mt-4">
              <button
                className="px-4 py-1 bg-gray-400 text-white"
                onClick={cancelDelete}
              >
                {isVietnamese ? "Hủy" : "Cancel"}
              </button>
              <button
                className="px-4 py-1 bg-red-600 text-white"
                onClick={confirmDelete}
              >
                {isVietnamese ? "Đồng ý" : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
      {editOverlay && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 ">

          <div className="bg-white p-4 rounded shadow-md w-2/3 overflow-y-scroll h-full">
            <h2 className="text-2xl text-red-500">{error}</h2>

            <h2 className="text-lg font-semibold mb-4">{isVietnamese ? "Chỉnh sửa sản phẩm" : "Edit Product"}</h2>
            <div className="mb-4">{isVietnamese ? "" : ""}
              <label className="block text-gray-600 mb-1">{isVietnamese ? "Tên sản phẩm" : "Name"}</label>
              <input
                type="text"
                name="name"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                value={editProduct.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 mb-1">{isVietnamese ? "Giá sản phẩm" : "Price"}</label>
              <input
                type="number"
                name="price"
                min={0}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                value={editProduct.price}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600 mb-1">{isVietnamese ? "Nguồn gốc" : "Source"}</label>
              <input
                type="text"
                name="source"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                value={editProduct.source}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 mb-1">{isVietnamese ? "Loại xe" : "Type"}</label>
              <select
                name="type"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                value={editProduct.type}
                onChange={handleInputChange}
              >
                <option value="two">{isVietnamese ? "2 chỗ" : "Two seats"}</option>
                <option value="four">{isVietnamese ? "4 chỗ" : "Four seats"}</option>
                <option value="seven">{isVietnamese ? "7 chỗ" : "Seven seats"}</option>
                <option value="five">{isVietnamese ? "5 chỗ" : "Five seats"}</option>
                {/* ... thêm các tùy chọn khác */}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 mb-1">{isVietnamese ? "Mô tả" : "Description"}</label>
              <textarea
                name="desc"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                value={editProduct.desc}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 mb-1">{isVietnamese ? "Giảm giá" : "Discount"}</label>
              <input
                type="number"
                name="discount"
                min={0}
                max={1}
                step={0.1}
                placeholder="0"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                value={editProduct.discount}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 mb-1">{isVietnamese ? "Hình ảnh" : "Image"}</label>
              <input
                type="text"
                name="imageURL"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                value={editProduct.imageURL}
                onChange={handleInputChange}
              />
              <img
                className="w-[200px] h-[200px] bg-contain"
                src={editProduct.imageURL}
                alt={editProduct.name}
              />
            </div>
            <area
              placeholder={editProduct.desc}
              shape=""
              coords=""
              href=""
              alt=""
            />
            <div className="flex justify-between">
              <button
                className="bg-gray-400 text-white px-4 py-1 rounded hover:bg-gray-500"
                onClick={handleCancel}
              >
                {isVietnamese ? "Hủy bỏ" : "Cancel"}
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                onClick={handleSave}
              >
                {isVietnamese ? "Lưu" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProduct;
