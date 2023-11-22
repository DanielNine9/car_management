import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteOrderAPI, getTotalAPI, myCartAPI, updateMyCartAPI } from '../../redux/apiRequest';

interface Product {
    orderId: number,
    userId: number,
    id: number,
    delete: boolean,
    created_at: string,
    quantity: number,
    name: string,
    price: number,
    local: string,
    source: string,
    type: string,
    sellerId: number,
    desc: string,
    discount: number,
    imageURL: string
}

const Cart: React.FC = () => {
    const currentUser = useSelector((state: any) => state.auth.login?.currentUser)
    const navigate = useNavigate();

    const [cartItems, setCartItems] = useState<Product[]>([]);
    const [totalAmount, setTotalAmount] = useState<number>(0);

    const [editedProduct, setEditedProduct] = useState<Product | null>(null);
    const [confirmVisible, setConfirmVisible] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);

    const getMyCart = async () => {
        setTimeout(async () => {
            if (currentUser?.access_token) {
                try {
                    setLoading(true);
                    const res = await myCartAPI(currentUser?.access_token);
                    setLoading(false);
                    setCartItems(res?.data);
                } catch (e) {
                    console.log(e);
                }
            }
        }, 100);
    }


    const [editQuantity, setEditQuantity] = useState<number>()

    async function handleTotal() {
        if (currentUser) {
            const res = await getTotalAPI(currentUser?.access_token)
            setTotalAmount(res?.data);
        }
    }

    useEffect(() => {
        if (!currentUser) {

        }
        getMyCart();
    }, []);

    const handleQuantityChange = (productId: number, newQuantity: number) => {
        if (newQuantity < 1) return;

        setEditQuantity(newQuantity)

        setCartItems(prevItems =>
            prevItems.map(item =>
                (item.orderId === productId ? { ...item, quantity: newQuantity } : item))
        );

        const editedItem = cartItems.find(item => item.orderId === productId);
        if (editedItem) {
            setEditedProduct({ ...editedItem, quantity: newQuantity });
            setConfirmVisible(true);
        }
    };

    const handleViewItem = (productId: number) => {
        navigate(`/view-detail/${productId}`)
    };

    const handleRemoveItem = async (orderId: number) => {
        await deleteOrderAPI(currentUser.access_token, orderId)
        getMyCart()

    };

    const handleConfirm = async (cartId: number) => {
        if (editQuantity) {
            await updateMyCartAPI(currentUser?.access_token, cartId, editQuantity as number);
            setEditedProduct(null);
            getMyCart()
            setConfirmVisible(false);
            handleTotal()
        }
    };

    console.log(cartItems)

    useEffect(() => {
        // Tính tổng số tiền

        handleTotal()
    }, [cartItems]);

    return (
        <div className="p-4 container max-w-[1200px] mx-auto min-h-[300px]">
            <div className="flex justify-between">
                <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>
                <div className="mt-4 text-xl font-semibold">Total Amount: ${totalAmount.toFixed(2)}</div>
            </div>

            {
                !currentUser ? "Your cart is empty." :
                    (
                        <>
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr>
                                        <th className="text-left py-2">Id</th>
                                        <th className="text-left py-2">Image</th>
                                        <th className="text-left py-2">Name</th>
                                        <th className="text-left py-2">Quantity</th>
                                        <th className="text-left py-2">Total</th>
                                        <th className="text-left py-2">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((product, index) => (
                                        <tr key={product.orderId} className="border-t">
                                            <td className="py-4">{index + 1}</td>
                                            <td className="py-4"><img src={product.imageURL} alt={product.name} className="border border-gray-200 w-20 h-20 object-cover rounded" /></td>
                                            <td className="py-4">{product.name}</td>
                                            <td className="py-4">
                                                <div className="flex items-center">
                                                    <input
                                                        type="number"
                                                        value={product.quantity}
                                                        onChange={e => handleQuantityChange(product.orderId, parseInt(e.target.value))}
                                                        min="1"
                                                        max="100000"
                                                    />
                                                    {editedProduct && editedProduct.orderId === product.orderId && (
                                                        <button
                                                            className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded ml-2"
                                                            onClick={() => handleConfirm(product.orderId)}
                                                            disabled={!confirmVisible}
                                                        >
                                                            Confirm
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="py-4">${(product.price * product.quantity).toFixed(2)}</td>
                                            <td className="py-4">
                                                <button
                                                    className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
                                                    onClick={() => handleViewItem(product.id)}
                                                >
                                                    View
                                                </button>
                                                <button
                                                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded ml-2"
                                                    onClick={() => handleRemoveItem(product.orderId)}
                                                >
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    )
            }
        </div>
    );
};

export default Cart;
