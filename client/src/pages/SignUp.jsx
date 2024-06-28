import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useSignUp from '../hooks/useSignUp';
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

export default function SignUp() {
  const navigate = useNavigate();
  const { loading, signup } = useSignUp();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    signup({ username, email, password }).then(() => navigate("/sign-in")).catch((err) => {
      setError(err.message);
    });
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder='username' 
          className='border p-3 rounded-lg' 
          name='username' 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <input 
          type="email" 
          placeholder='email' 
          className='border p-3 rounded-lg' 
          name='email' 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <div className="relative">
          <input 
            type={showPassword ? "text" : "password"} 
            placeholder='password' 
            className='border p-3 rounded-lg w-full' 
            name='password' 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <button 
            type="button" 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-950 transition-all duration-300 delay-100" 
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />} 
          </button>
        </div>
        <button 
          className={`bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 ${loading ? 'disabled' : ''}`} 
          disabled={loading}
        >
          {loading ? "loading..." : "Sign Up"}
        </button>
        <div className="flex gap-2 mt-5">
          <p>Have an account?</p>
          <Link to={"/sign-in"} className='text-blue-700 '>Sign-In</Link>
        </div>
        {error && <p className='text-red-500'>{error}</p>}
      </form>
    </div>
  );
}
