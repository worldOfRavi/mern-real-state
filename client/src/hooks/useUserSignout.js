import React from 'react'
import { useDispatch } from 'react-redux'
import { userSignouteStart, userSignouteSuccess, userSignouteFailure } from '../redux/user/userSlice';

const useUserSignout = () => {
    const dispatch =  useDispatch();
  const userSignout = async ()=>{
    dispatch(userSignouteStart())
    try {
        const res = await fetch("/api/auth/signout");
    const data = await res.json();
    if(data.succes === false){
        dispatch(userSignouteFailure(data.message));
        return;
    }
    dispatch(userSignouteSuccess(data));
    } catch (error) {
        dispatch(userSignouteFailure(error.message))
    }
    
  }
  return {userSignout}
}

export default useUserSignout
