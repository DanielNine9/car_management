import React, { ChangeEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../axios'
import { useSelector } from 'react-redux';

const Register = () => {
  const isVietnamese = useSelector(
    (state: any) => state?.auth?.translate?.isVietnamese
  );
  const [username, setUsername] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate()

  const handleRegister = async () => {
    if (username === '' || address === '' || email === '' || password === '') {
      if (isVietnamese) {
        setError("Vui lòng nhập đủ các trường")
      } else {
        setError('All fields are required');

      }
      return
    }
    if (password !== confirmPassword) {
      if (isVietnamese) {
        setError("Xác nhận mật khẩu phải khớp với mật khẩu")
      }else {
        setError('Passwords do not match.');
      }
      return
    } else {
      setError('');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        if (isVietnamese) {
          setError('Phải đúng định dạng email')
        } else {
          setError('Invalid email address.');
        }
        return;
      }
      try {
        const response = await axios.post('/auth/register', { email, password, address });
        if (response) {
          // Đăng ký thành công
          navigate('/login'); // Chuyển hướng người dùng tới trang đăng nhập
        } else {
          setError('Registration failed.');
        }
      } catch (error: any) {
        if(error.response.data.message == "Email is already taken"){
          if(isVietnamese){
            setError("Email đã được sử dụng")
            return
          }
        }
        console.log(error.response.data.message)
        setError(error.response.data.message);
      }
    }
  };

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    setError('');
  };

  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
    setError('');
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError('');
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setError('');
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    setError('');
  };

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.value)
    setError('')
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-1/3">
        <h2 className="text-2xl font-semibold mb-4">{isVietnamese ? "Đăng ký tài khoản" : "Register"}</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-600 mb-1">{isVietnamese ? "Tên người dùng" : "Username"}</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 mb-1">{isVietnamese ? "Địa chỉ" : "Address"}</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            value={address}
            onChange={handleAddressChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Email</label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 mb-1">{isVietnamese ? "Mật khẩu" : "Password"}</label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 mb-1">{isVietnamese ? "Xác nhận mật khẩu" : "Confirm Password"}</label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>
        {/* <div className="mb-4">
          <label className="block text-gray-600 mb-1">Image</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            value={image}
            onChange={handleImage}
          />
        </div> */}
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full"
          onClick={handleRegister}
        >
          {isVietnamese ? "Đăng ký" : "Register"}
        </button>
        <div className="mt-4 text-sm text-gray-600">
          {isVietnamese ? "Bạn đã có tài khoản?" : "Already have an account?"} <Link to="/login" className='text-blue-400 hover:text-blue-300'>{isVietnamese ? "Đăng nhập tại đây" : "Login here"}</Link>
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

export default Register;
