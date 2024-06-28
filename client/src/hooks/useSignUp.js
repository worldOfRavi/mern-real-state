import React, { useState } from 'react'

const useSignUp = () => {
  const [loading, setLoading]  = useState(false);
// const[error, setError]
  const signup = async({username, email, password})=>{
    setLoading(true);
    try {
        const res = await fetch("/api/auth/signup",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({username, email, password})
        })

        const data = await res.json();
        if(data.success=== false) {
            throw new Error(data.message)
        }
        return data
    } catch (error) {
        throw new Error(error.message);

    }finally{
        setLoading(false)
    }
  }
  return { loading, signup}
}

export default useSignUp
