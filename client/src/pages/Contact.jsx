import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Contact = ({listing}) => {
    const [landlord, setLandLord] = useState(null);
    const [message, setMessage] = useState("");
    console.log(message);
    useEffect(()=>{
        const getUser = async (id) =>{
            try {
                const res = await fetch(`/api/user/${id}`);
                const data = await res.json();
                setLandLord(data)
            } catch (error) {
                console.log(error.message);
            }
        }
        getUser(listing?.userRef)
    },[listing])
  return (
    <>
    {landlord && (
        <div className="flex flex-col gap-4">
            <p>Contact <span className='font-semibold'>{landlord.username}</span> for <span className='font-semibold'>{listing.name}</span> </p>
            <textarea id="message" rows="2" placeholder='Write your message here'
            className='p-2 border rounded-lg w-full' 
            value={message}  onChange={(e)=>setMessage(e.target.value)}></textarea>
            <Link to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`} className='bg-slate-700 p-3 rounded-lg text-white text-center
            hover:opacity-90'>Send Message</Link>
        </div>
    )}
    </> 
  )
}

export default Contact
