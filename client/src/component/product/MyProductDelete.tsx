import React, { useState } from 'react';
import { deleteMyProduct, editMyProduct, myProduct, myProductDelete, restoreMyProduct, restoreAllMyProduct, restoreMyProducts } from '../../redux/apiRequest';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

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

const MyProductDelete = () => {
    const currentUser = useSelector((state: any) => state.auth.login?.currentUser)
    const [userProducts, setUserProducts] = useState<Product[]>([]);

    const [loading, setLoading] = useState<boolean>(false)

    const navigate = useNavigate();

    const handleMyProduct = async () => {
        try {
            setLoading(true)
            const res = await myProductDelete(currentUser?.access_token, navigate)
            setLoading(false)
            setUserProducts(res?.data)
        } catch (e) {
            console.log(e)
        }

    }
    const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]); // Danh sách sản phẩm đã được chọn để xóa


    const handleSelectProduct = (productId: number) => {
        if (selectedProductIds.includes(productId)) {
            // Nếu sản phẩm đã được chọn, bỏ chọn nó
            setSelectedProductIds(selectedProductIds.filter((id) => id !== productId));
        } else {
            // Nếu sản phẩm chưa được chọn, thêm nó vào danh sách đã chọn
            setSelectedProductIds([...selectedProductIds, productId]);
        }
    };


    React.useEffect(() => {
        if (!currentUser) { navigate("/") }

        handleMyProduct()
    }, []);

    if (loading) {
        return (<>
            <div className='min-h-[calc(30vh)]'></div>
            <div className="flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 ">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
            </div>
        </>)
    }


    const handleRestore = async (productId: number) => {
        await restoreMyProduct(productId, currentUser.access_token, navigate)
        setTimeout(() => {
            handleMyProduct()
        }, 100);
    }

    const handleRestoreAll = async () => {
        await restoreAllMyProduct(currentUser.access_token, navigate)
        setTimeout(() => {
            handleMyProduct()
        }, 100);
    }


    function handleRestoreSelected(): void {
        if (selectedProductIds.length > 0) {
            console.log(selectedProductIds)
            restoreMyProducts(selectedProductIds, currentUser.access_token, navigate).then(() => handleMyProduct())
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
    }

    return (
        <div className="container mx-auto mt-8 ">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold mb-4">My Products</h2>
                <div className="flex gap-4">

                    <div className="flex gap-2">
                        {selectedProductIds.length > 0 && (
                            <button onClick={handleRestoreSelected} className='px-4 py-1 bg-lime-600 text-white'>
                                Restore Selected
                            </button>
                        )}
                        {userProducts.length ?
                            <button className='bg-purple-600 hover:bg-purple-400 px-2 py-1' onClick={handleRestoreAll}>Restore all</button>
                            : null}

                        <Link to="/myProduct" className='flex items-center gap-2 bg-green-500 text-black px-2 py-1 hover:bg-green-300'>
                            My Products
                        </Link>


                    </div>


                </div>


            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {userProducts?.length === 0 ?
                    <div className='min-h-[calc(22vh)]'>
                        My products delete are empty
                    </div>
                    : userProducts?.map((product: any) => (
                        (
                            <>
                                <div key={product.id} className="bg-white p-4 rounded shadow-md">
                                    <input
                                        type="checkbox"
                                        checked={selectedProductIds.includes(product.id)}
                                        onChange={() => handleSelectProduct(product.id)}
                                        className="mr-2"
                                    />
                                    <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                                    <p className="text-gray-600 mb-2">Price: ${product.price}</p>
                                    <p className="text-gray-600 mb-4">Type: {product.type}</p>
                                    <p className="text-gray-600">{product.desc}</p>
                                    <p className="text-gray-600">Discount: {product.discount}%</p>
                                    <img src={product.imageURL} alt={product.name} className="mt-2 object-contain h-[300px]" />
                                    <div className='flex mt-4'>
                                        <button onClick={() => handleRestore(product.id)} className='w-full bg-green-600 py-2 hover:bg-green-400'>Restore</button>
                                    </div>
                                </div>
                            </>
                        )
                    ))}
            </div>

        </div>
    );
};

export default MyProductDelete;
