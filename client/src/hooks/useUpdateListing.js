import React, { useState } from 'react'

const useUpdateListing = () => {
  const [loading, setLoading] = useState(false);
  const updateListing = async(id,formData)=>{
    setLoading(true)
    try {
        const res = await fetch(`/api/listing/update/${id}`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(formData)
        })
        const data = await res.json();
        setLoading(false)
        if(data.success === false){
            throw new Error(data.message)
        } 
        return {success:true, data}
    } catch (error) {
        setLoading(false);
        return {success:false, message:error.message}
        
    }
  }
  return {loading, updateListing};
}

export default useUpdateListing
