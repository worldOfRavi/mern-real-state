import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import {signInStart, signInSuccess, signInFailure} from "../redux/user/userSlice";
import { useNavigate } from 'react-router-dom';

const useSignIn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
  const signin = async({email, password})=>{
   

    try {
        dispatch(signInStart());
        const res = await fetch("/api/auth/signin",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({ email, password})
        })

        const data = await res.json();
        if(data.success=== false) {
             dispatch(signInFailure(data.message));
             return;
        }

        dispatch(signInSuccess(data));
        navigate("/");
        
        
    } catch (error) {
        dispatch(signInFailure(error.message));

    }
  }
  return {signin}
}

export default useSignIn

