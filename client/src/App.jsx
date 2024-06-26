import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

export default function App() {
  return (
    <>
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/profile' element={<Profile />} />
    <Route path='/about' element={<About />} />
    <Route path='/signin' element={<SignIn />} />
    <Route path='/signup' element={<SignUp />} />
  </Routes>
    </>
  )
}
