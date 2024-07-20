import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { RiMenuAddFill } from "react-icons/ri";
import { IoCloseSharp } from "react-icons/io5";
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

export default function Header() {

  const [isOpen, setIsOpen] = useState(false)
  const {currentUser} = useSelector(state => state.user)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }
  return (
    <div className='py-4 px-4 md:px-16 lg:px-24 bg-primary'>
      <header className='flex justify-between items-center'>
        <h1 className='text-3xl font-extrabold'>
          <span>up</span>
          <span className='uppercase text-red-600'>rising</span>
        </h1>
        <div className='lg:hidden'>
        {isOpen ? (
        <button onClick={toggleMenu} className='lg:hidden'><IoCloseSharp size={32} /></button>) :
        (<button onClick={toggleMenu} className='lg:hidden'><RiMenuAddFill size={32} /></button>)
        }
        </div>
        <form className='flex items-center border-[2px] border-black px-3 rounded-full max-lg:hidden'>
          <input type='text' placeholder='Search....'
          className='px-4 py-1 bg-transparent placeholder:text-black placeholder:italic focus:outline-none'
          />
          <FaSearch />
        </form>
        <ul className='gap-4 font-semibold hidden lg:flex lg:items-center'>
          <Link to='/'><li>Home</li></Link>
          <Link to='/about'><li>About</li></Link>
          {currentUser ? (<Link to='/profile'><img className='size-10 rounded-full object-cover' src={currentUser.avatar} alt='profile'/></Link>) : <Link to='/signin'><li>Sign In</li></Link>}
          
        </ul>
      </header>
      <div>
      {isOpen && 
        (<div>
          <ul className='flex flex-col gap-2 items-center pt-8 font-semibold lg:hidden'>
          <form className='flex items-center border-[2px] border-black px-3 rounded-full'>
          <input type='text' placeholder='Search....'
          className='px-4 py-1 bg-transparent placeholder:text-black focus:outline-none'
          />
          <FaSearch />
        </form>
            <Link to='/'><li>Home</li></Link>
            <Link to='/about'><li>About</li></Link>
            <Link to='/signin'><li>Sign In</li></Link>
          </ul>
        </div>)}
      </div>
    </div>
  )
}
