import React, { useState } from 'react'

const useCreateListing = () => {
  const [loading, setLaoding]  = useState(false);
  const createListing = async({formData})=>{
    setLaoding(true);
    try {
        const res = await fetch("api/listing/create",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(formData)
        })
        const data = await res.json();
        setLaoding(false)
        if(data.success === false){
            throw new Error(data.message)
        }
       return {success:true,data};
    } catch (error) {
        setLaoding(false);
        return { success: false, message: error.message };
    }
  }
  return {loading, createListing}
}

export default useCreateListing
