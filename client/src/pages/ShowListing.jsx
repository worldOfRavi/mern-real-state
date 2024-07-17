import React, { useEffect, useState } from 'react'
import useShowListing from '../hooks/useShowListing'
import { Link } from 'react-router-dom';

const ShowListing = () => {
    const {listing, loading, showListing} = useShowListing();
    const [deletetionError, setDeletionError] = useState("");
    useEffect(()=>{
        showListing();
    },[])

    const deleteListing = async(id)=>{
        try {
            const res = await fetch(`api/listing/delete/${id}`,{
                method:"DELETE"
            });
            const data = await res.json();
            if(data.success === false){
                setDeletionError(data.message);
            }
            showListing();
        } catch (error) {
            setDeletionError(error.message)
        }
       
    }
  return (
    <div className=''>
        {listing.length>0 ? (<div>
        <h1 className="font-semibold text-center my-6">Your Listings</h1>
        {loading ? <p>Loading...</p> : (
            <div className="flex max-w-lg">
                {listing.map((list, index)=>(
                    <div key={index} className="border rounded-md flex gap-2 my-2 justify-between items-center p-2">
                        <div className="flex items-center gap-2">
                        <Link to={`/listing/${list._id}`} className='flex-1/2'>

                            <img src={list.imageUrl[0]} className='w-20 h-20 object-contain rounded-sm' />
                        </Link>
                        <Link to={`/listing/${list._id}`} className='truncate flex-1/2'>
                            <h1 className='font-semibold hover:underline truncate '>{list.name}</h1>
                        </Link>
                        </div>
                        <div className="flex-1">
                            <p className='text-red-700 cursor-pointer' onClick={()=>deleteListing(list._id)}>DELETE</p>
                            <Link to={`/update/${list._id}`}>
                            <p className='text-green-700 cursor-pointer text-center'>EDIT</p>
                            </Link>
                        </div>
                    </div>
                ))}
                {deletetionError && <p className='text-red-700 text-sm'>{deletetionError}</p> }
            </div>
        ) }
    </div>)  : <p className='text-center my-6'>You have not created any listing yet...</p>}
    </div>
  )
}

export default ShowListing
