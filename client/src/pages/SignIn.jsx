import React from 'react'
import { Link } from 'react-router-dom';

export default function SignIn() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
     <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
     <form className='flex flex-col gap-4'>
      <input type="text" id='username' placeholder='username' 
      className='p-3 rounded-lg' />
      <input type="email" id='email' placeholder='email' 
      className='p-3 rounded-lg' />
      <input type="password" id='password' placeholder='password' 
      className='p-3 rounded-lg' />
      <button className='bg-slate-700 text-white p-3 rounded-lg uppercase 
      hover:opacity-95 disabled:opacity-80'>Sign In</button>
      <div className="flex gap-3 mt-3">
        <p>Don't have an account?</p>
        <Link to={"/sign-up"} className='text-blue-700 '>Sign-Up</Link>
      </div>
     </form>
    </div>
  )
}
