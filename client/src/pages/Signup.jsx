import React, { useState } from 'react';
import { FaRegUser, FaRegEye } from 'react-icons/fa';
import { AiTwotoneMail } from 'react-icons/ai';
import { RiEyeCloseLine } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import Oauth from '../components/Oauth';

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const res = await fetch('http://localhost:3001/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Failed to sign up');
      }

      const data = await res.json();
      setIsLoading(false);
      navigate('/signin'); // Redirect to signin page after successful signup

    } catch (error) {
      console.error('Error:', error);
      setError('Failed to sign up. Please try again.');
      setIsLoading(false);
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='max-w-md mx-auto mt-12 md:mt-20 border-2 pt-6 border-primary shadow-2xl rounded-lg px-4'>
      <h1 className='text-center text-3xl font-bold py-4'>Sign Up</h1>
      <form className='px-8 pt-8' onSubmit={handleSubmit}>
        <div className='relative'>
          <input
            type='text'
            placeholder='Username'
            id='username'
            onChange={handleChange}
            required
            className='border rounded-md w-full py-2 px-4 focus:outline-none'
          />
          <FaRegUser className='absolute top-1/2 right-4 transform -translate-y-1/2' />
        </div>

        <div className='relative mt-4'>
          <input
            type='email'
            placeholder='Email'
            id='email'
            onChange={handleChange}
            required
            className='border rounded-md w-full py-2 px-4 focus:outline-none'
          />
          <AiTwotoneMail className='absolute top-1/2 right-4 transform -translate-y-1/2' />
        </div>

        <div className='relative mt-4'>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder='Password'
            id='password'
            onChange={handleChange}
            required
            className='border rounded-md w-full py-2 px-4 focus:outline-none'
          />
          <button onClick={togglePassword} type='button'>
            {showPassword ? (
              <RiEyeCloseLine className='absolute top-1/2 right-4 transform -translate-y-1/2' />
            ) : (
              <FaRegEye className='absolute top-1/2 right-4 transform -translate-y-1/2' />
            )}
          </button>
        </div>

        {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}

        <div>
          <button className='bg-primary text-white py-2 px-4 rounded-md mt-4 w-full hover:scale-105 transition duration' disabled={isLoading}>
            {isLoading ? 'Loading' : 'Sign Up'}
          </button>
        </div>

        <Oauth />
      </form>

      <div className='py-3'>
        <p className='pl-8'>
          Already have an account? <Link to='/signin' className='text-blue-700 underline'>Sign In</Link>
        </p>
      </div>
    </div>
  );
}
