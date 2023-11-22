import axios from '../axios'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { loginFailed, loginStart, loginSuccess, registerError, registerStart, registerSuccess } from './authSlice'
import { Dispatch } from '@reduxjs/toolkit'
import { format } from 'date-fns';

const token: string = process.env.ACCESS_TOKEN as string

export const loginUser = async (user: { email: string, password: string }, dispatch: Dispatch) => {
    dispatch(loginStart())
    try {
        const res = await axios.post("/auth/login", user)
        const userInfo = res.data
        dispatch(loginSuccess(userInfo))
    } catch (err) {
        dispatch(loginFailed())
        return err

    }
}

export const logout = async (accessToken: string, dispatch: Dispatch, navigate: NavigateFunction) => {
    dispatch(loginStart())
    try {
        const res = await axios.post("/auth/logout", {}, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        dispatch(loginSuccess(null))
        navigate("/")
    } catch (err) {
        dispatch(loginFailed())
    }
}

interface Register {
    username?: string
    email: string
    password: string
    address: string
}

export const registerUser = async (register: Register, navigate: NavigateFunction, dispatch: Dispatch) => {
    dispatch(registerStart())
    try {
        const res = await axios.post("/auth/register", register)
        dispatch(registerSuccess(res))
        navigate("/login")
    } catch (err) {
        dispatch(registerError())
    }
}

export const getUsers = async (accessToken: string, navigate: NavigateFunction) => {
    try {
        const res = await axios.get("/user", {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return res
    } catch (err) {
        navigate("/forbidden")
    }
}



enum ProductType {
    PHONE,
    LAPTOP,
    ACCESSORY,
    PC
}

type CreateProductType = {
    name: string
    price: number
    source: string
    type: string
    desc: string
    discount: number
}

export const createProduct = async (product: CreateProductType, accessToken: string, navigate: NavigateFunction) => {
    try {
        const res = await axios.post("/product", product, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        navigate("/myProduct")
    } catch (e) {
        console.log(e)
        navigate("/wrong")
    }
}

export const deleteUser = async (userId: number, accessToken: string, navigate: NavigateFunction) => {
    try {
        const res = await axios.delete(`/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
    } catch (e) {
        console.log(e)
        navigate('/forbidden')
    }
}

interface updateUserPayloadType {
    role?: string,
    banned?: boolean,
}

export const updateUser = async (updateUserPayload: updateUserPayloadType, userId: number, accessToken: string, navigate: NavigateFunction) => {
    try {
        const res = await axios.put(`user/${userId}`, updateUserPayload, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
    } catch (e) {
        navigate('/forbidden')
    }
}

export const myProduct = async (accessToken: string, navigate: NavigateFunction) => {
    try {
        const res = await axios.get("/product/myProduct", {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        if (res) {
            return res
        }
    } catch (e) {
        navigate("/")
    }
}
export const myProductDelete = async (accessToken: string, navigate: NavigateFunction) => {
    try {
        const res = await axios.get("product/myProductDelete", {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        if (res) {
            console.log(res)
            return res
        }
    } catch (e) {
        navigate("/")
    }
}

export const deleteMyProduct = async (productId: number, accessToken: string, navigate: NavigateFunction) => {
    try {
        const res = axios.delete(`/product/${productId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
    } catch (e) {
        navigate('/forbidden')
    }
}

export const deleteMyProducts = async (productIds: number[], accessToken: string, navigate: NavigateFunction) => {
    try {
        // Sử dụng map để tạo một mảng các promise cho từng yêu cầu xóa sản phẩm
        const deletePromises = productIds.map(productId => {
            return axios.delete(`/product/${productId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
        });

        // Sử dụng Promise.all để chờ tất cả các promise hoàn thành
        await Promise.all(deletePromises);

    } catch (e) {
        navigate('/forbidden')
    }
}
export const restoreMyProduct = async (productId: number, accessToken: string, navigate: NavigateFunction) => {
    try {
        const res = axios.get(`/product/restore/${productId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
    } catch (e) {
        navigate('/forbidden')
    }
}
export const restoreMyProducts = async (productIds: number[], accessToken: string, navigate: NavigateFunction) => {
    try {
        const restorePromises = productIds.map(productId => {
            return axios.get(`/product/restore/${productId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
        })
        await Promise.all(restorePromises)

    } catch (e) {
        navigate('/forbidden')
    }
}
export const restoreAllMyProduct = async (accessToken: string, navigate: NavigateFunction) => {
    try {
        const res = axios.get(`/product/restore`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
    } catch (e) {
        navigate('/forbidden')
    }
}

interface updateProductType {
    name?: string
    price?: number
    source?: string
    type?: string
    desc?: string
    discount?: number
}

export const editMyProduct = async (updateProduct: updateProductType, productId: number, accessToken: string, navigate: NavigateFunction) => {
    try {
        const res = axios.put(`/product/${productId}`, updateProduct, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        console.log(res)
    } catch (e) {
        console.log(e)
    }
}

export const getBestSellingProduct = async () => {
    try {
        const res = axios.get("/product/bestSelling")
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getBestDiscountProduct = async () => {
    try {
        const res = axios.get("/product/bestDiscount")
        return res
    }
    catch (e) {
        console.log(e)
    }
}

export const getAllProducts = async () => {
    try {
        const res = axios.get("/product")
        return res
    }
    catch (e) {
        console.log(e)
    }
}
export const getProduct = async (productId: string) => {
    try {
        const res = axios.get(`/product/${productId}`)
        return res
    }
    catch (e) {
        console.log(e)
    }
}

export const getUserGlobal = async (userId: number) => {
    try {
        const res = axios.get(`/user/userGlobal/${userId}`)
        return res
    } catch (e) {
        console.log(e)
    }
}

export const getMyProfileAPI = async (accessToken: string) => {
    try {
        const res = axios.get(`/auth/me`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return res
    } catch (e) {
        console.log(e)
    }
}


export const buyAPI = async (accessToken: string, productId: string, navigate: NavigateFunction) => {
    try {
        const res = await axios.post(`/order/buy/${productId}`, { quantity: 1 }, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        navigate("/cart")
    } catch (e) {
        console.log(e)
    }
}

export const myCartAPI = async (accessToken: string) => {
    try {
        const res = axios.get(`/order/cart`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        console.log(res)
        return res
    } catch (e) {
        console.log(e)
    }
}

export const updateMyCartAPI = async (accessToken: string, cartId: number, quantity: number | string) => {
    try {
        const res = axios.put(`/order/${cartId}`, { quantity }, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return res
    } catch (e) {
        console.log(e)
    }
}
export const getTotalAPI = async (accessToken: string) => {
    try {
        const res = axios.get(`/order/total`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return res
    } catch (e) {
        console.log(e)
    }
}
export const deleteOrderAPI = async (accessToken: string, orderId: number) => {
    console.log(orderId)
    try {
        const res = axios.delete(`/order/${orderId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return res
    } catch (e) {
        console.log(e)
    }
}


export function formatDate(dateString: string) {
    // Chuyển đổi chuỗi ngày thành đối tượng Date
    const date = new Date(dateString);

    // Sử dụng date-fns để định dạng ngày tháng năm
    return format(date, 'dd/MM/yyyy'); // Định dạng 'dd/MM/yyyy' cho ngày/tháng/năm
}
