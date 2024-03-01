import React, { ChangeEvent, Dispatch, useState, } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from '../../axios'
import { loginUser } from '../../redux/apiRequest';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
  const isVietnamese = useSelector(
    (state: any) => state?.auth?.translate?.isVietnamese
  );
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('');
  const errorAPI = useSelector((state: any) => state.auth.login?.error)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const prePath = location.state

  if (loading) {
    if (errorAPI) {
      setError(errorAPI)
    }
    return (<>
      <div className="flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 ">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>
    </>)
  }

  const handleLogin = async () => {
    if(email == "" || password == ""){
      if(isVietnamese){
        setError("Vui lòng nhập đầy đủ các trường")
      }else {
        setError("Plese, fill all fields")
      }
      return

    }
    setLoading(true)
    loginUser({ email, password }, dispatch).then((res: any) => {
      if (res?.message) {
        setLoading(false)
        if(res.response.data.message == "Account is banned" && isVietnamese){
          setError("Tài khoản này đã bị khóa")
          return
        }
        if(res.response.data.message == "email must be an email" && isVietnamese){
          setError("Email phải đúng định dạng")
          return
        }
        if(res.response.data.message == "User or password aren't correct" && isVietnamese){
          setError("Tài khoản hoặc mật khẩu không chính xác")
          return
        }
        setError(res.response.data.message)
      } else {
        navigate(prePath || '/')
      }
    })
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError('');
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setError('');
  };

  if (isAuthenticated) {
    return (
      <div className="text-center">
        {isVietnamese ? "Chào mừng": "Welcome"}, {email}! <br />
        <Link to="/logout">{isVietnamese ? "Đăng xuất": "Logout"}</Link>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-1/3">
        <h2 className="text-2xl font-semibold mb-4">{isVietnamese ? "Đăng nhập": "Login"}</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Email</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 mb-1">{isVietnamese ? "Mật khẩu": "Password"}</label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="my-3 mt-[-10px] text-sm text-gray-600 text-right">
          <Link to="/forgot-password" className='hover:opacity-80'>{isVietnamese ? "Quên mật khẩu": "Forgot Password?"}</Link>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full"
          onClick={handleLogin}
        >
         {isVietnamese ? "Đăng nhập": "Login"} 
        </button>
        <div className="mt-4 text-sm text-gray-600">
         {isVietnamese ? "Hiện chưa có tài khoản?": "Don't have an account?"}  <Link to="/register" className='text-blue-400 hover:text-blue-300'>{isVietnamese ? "Đăng ký tại đây": "Register here"}</Link>
        </div>
      </div>
      <Link to="/" className="absolute left-4 top-4">
        <button className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-3 py-1 rounded">
          {isVietnamese ? "Trở lại trang chủ" : "Back to Home"}
        </button>
      </Link>
    </div>
  );
};

export default Login;
