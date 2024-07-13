import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore from 'swiper';
import {Navigation} from 'swiper/modules';
import 'swiper/css/bundle';

const Listing = () => {
    SwiperCore.use([Navigation]);
    const {id} = useParams();
    const [loading, setLoading] = useState(false);
    const [listing, setListing] = useState(null);
    const [error, setError] = useState(false);

    useEffect(()=>{
        const getListing = async(id) =>{
            setLoading(true)
            try {
                const res = await fetch(`/api/listing/get/${id}`);
                const data = await res.json();
                setLoading(false)
                if(data.success === false){
                    setError(true);
                }
                setListing(data);
            } catch (error) {
                setError(true)
            }
        }
        getListing(id);
    },[id])


  return (
    <main>
        {loading && <p className='text-center my-6 text-2xl'>Loading...</p> }
        {error && (<div className='flex flex-col items-center justify-center my-10 gap-4'>
            <p className='text-red-700 text-2xl font-semibold'>Something went wrong...!</p>
            <Link to={"/"} className='hover:underline text-green-600'>
                Go to home page
            </Link>
        </div>) }
        {listing && !loading && !error && <div>
            <Swiper navigation>
                {listing.imageUrl.map((url)=>(
                    <SwiperSlide key={url}>
                        <div className="h-[65vh]" style={{background:`url(${url}) center no-repeat`, backgroundSize:"cover"}} ></div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div> }
    </main>
  )
}

export default Listing
