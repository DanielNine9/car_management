import React, { useState, useEffect } from 'react';
import Loading from '../Loading';
import { Product } from './type';
import { formatDate, getBestSellingProduct } from '../../redux/apiRequest';
import { useNavigate } from 'react-router-dom';

const NewsPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 5;

    const [hotProd, setHotProd] = useState<Product[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()

    const [user, setUser] = useState({})

    const getProducts = async () => {
        setTimeout(async () => {
            try {
                setLoading(true)
                const res = await getBestSellingProduct().then(res => {
                    setHotProd(res?.data)
                    setLoading(false)

                })

            } catch (e) {
                console.log(e)
            }
        }, 100);

    }


    useEffect(() => {
        getProducts()
    }, [])

    if (loading) {
        return <Loading />
    }

    const totalPages = Math.ceil(hotProd.length / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const currentProducts = hotProd.slice(startIndex, endIndex);

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

    const handleMoveIn = (prodId: number) => {
        navigate(`/view-detail/${prodId}`)
    }

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-3xl font-semibold mb-8">Trang tin tức</h1>
            {hotProd.map((prod, index) => (
                <div
                    key={prod.id}
                    className={`bg-white p-4 rounded shadow-md mb-4 flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                        }`}
                >
                    <div className="w-2/3 h-[369px] bg-cover">
                        <img src={prod.imageURL} alt={prod.name} className="w-full h-full" />
                    </div>
                    <div className="w-full p-4">
                        <div className="h-[96%] overflow-y-scroll">
                            <h2 className="text-xl font-semibold">{prod.name}</h2>
                            <p className="text-gray-600">Price: {prod.price}</p>
                            <p className="text-gray-600">Local: {prod.local}</p>
                            <p className="text-gray-600">Source: {prod.source}</p>
                            <p className="text-gray-600">Order count: {prod.orderCount}</p>
                            <p className="text-gray-600">Type: {prod.type}</p>
                            <p className="text-gray-600">Description: {prod.desc}</p>
                            <p className="text-gray-500">Created at: {formatDate(prod.created_at)}</p>
                        </div>
                        <button className='text-center w-full bg-green-600 p-1 mt-[-2px] hover:bg-green-400' onClick={() => handleMoveIn(prod.id)}>
                            Move in
                        </button>

                    </div>

                </div>
            ))}
        </div>
    );
};

export default NewsPage;
