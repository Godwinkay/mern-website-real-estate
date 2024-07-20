import React, { useState } from 'react';
import { FaRegEye } from 'react-icons/fa';
import { AiTwotoneMail } from 'react-icons/ai';
import { RiEyeCloseLine } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInFailure, signInSuccess } from '../app/userSlice';
import Oauth from '../components/Oauth';

export default function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({});
  const {loading, error} = useSelector((state) => state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      dispatch(signInStart());
  
      const res = await fetch('http://localhost:3001/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!res.ok) {
        // Handle HTTP error status
        const error = await res.json();
        if (res.status === 404) {
          throw new Error('User not found');
        } else if (res.status === 401) {
          throw new Error('Incorrect credentials');
        } else {
          throw new Error(error.message || 'Failed to sign in');
        }
      }
  
      // Successfully signed in
      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate('/'); // Redirect to homepage after successful login
  
    } catch (error) {
      // Handle network errors or fetch failures
      console.error('Error:', error.message);
      let errorMessage = 'Failed to sign in';
      
      if (error.message === 'User not found') {
        errorMessage = 'User not found. Please check your credentials.';
      } else if (error.message === 'Incorrect credentials') {
        errorMessage = 'Incorrect credentials. Please try again.';
      }
  
      dispatch(signInFailure(errorMessage)); // Dispatch specific error message based on the error
    }
  };
  

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='max-w-md mx-auto mt-12 md:mt-20 border-2 pt-6 border-primary shadow-2xl rounded-lg px-4'>
      <h1 className='text-center text-3xl font-bold py-4'>Sign In</h1>
      <form className='px-8 pt-8' onSubmit={handleSubmit}>
        
        <div className='relative'>
          <input
            type='email'
            placeholder='Email'
            id='email'
            required
            onChange={handleChange}
            className='border rounded-md w-full py-2 px-4 focus:outline-none'
          />
          <AiTwotoneMail className='absolute top-1/2 right-4 transform -translate-y-1/2' />
        </div>

        <div className='relative mt-4'>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder='Password'
            id='password'
            required
            onChange={handleChange}
            className='border rounded-md w-full py-2 px-4 focus:outline-none'
          />
          <button onClick={togglePassword} type='button'>
            {showPassword ? (
              <FaRegEye className='absolute top-1/2 right-4 transform -translate-y-1/2' />
            ) : (
              <RiEyeCloseLine className='absolute top-1/2 right-4 transform -translate-y-1/2' />
            )}
          </button>
        </div>

        {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}

        <div>
          <button className='bg-primary text-white py-2 px-4 rounded-md mt-4 w-full hover:scale-105 transition duration' disabled={loading}>
            {loading ? 'Loading' : 'Sign In'}
          </button>
        </div>
            <Oauth />
      </form>

      <div className='py-3'>
        <p className='pl-8'>
          Don't have an account? <Link to='/signup' className='text-blue-700 underline'>Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
