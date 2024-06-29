import React, { useState } from 'react'

const useSignIn = () => {
  const [loading, setLoading]  = useState(false);
  const signin = async({email, password})=>{
    setLoading(true);
    try {
        const res = await fetch("/api/auth/signin",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({ email, password})
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
  return { loading, signin}
}

export default useSignIn

