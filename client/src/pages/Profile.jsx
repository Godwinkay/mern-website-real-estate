import React from 'react'
import { useSelector } from 'react-redux'

export default function Profile() {
    const {currentUser} = useSelector(state => state.user)
  return (
    <div className='max-w-lg flex flex-col justify-center mx-auto mt-8 w-full'>
      <h1 className='text-center text-3xl font-bold mb-4'>Profile</h1>
      <img src={currentUser.avatar} alt='profile picture' className='size-24 rounded-full self-center mb-8'/>
      
      <form className='flex flex-col gap-4'>
        <input type='text' placeholder='usermame' id='usernmame'  className='border-2 border-gray-200 p-2 rounded-lg focus:outline-none' />
        <input type='email' placeholder='email' id='email' className='border-2 border-gray-200 p-2 rounded-lg focus:outline-none' />
        <input type='password' placeholder='password' id='password' className='border-2 border-gray-200 p-2 rounded-lg focus:outline-none' />
        <button className='p-2 font-bold text-white bg-primary rounded-lg w-full hover:bg-primary/75'>Update</button>
      </form>

      <div className='mt-2 flex justify-between'>
        <span className='text-red-500 italic'>
            Delete Account
        </span>
        <span className='text-red-500 italic'>
            Sign Out
        </span>
      </div>

    </div>
  )
}
