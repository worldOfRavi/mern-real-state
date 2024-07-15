import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore from 'swiper';
import {Navigation} from 'swiper/modules';
import 'swiper/css/bundle';
import {
    FaBath,
    FaBed,
    FaChair,
    FaMapMarkedAlt,
    FaMapMarkerAlt,
    FaParking,
    FaShare,
  } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Contact from './Contact';

const Listing = () => {
    const {currentUser} = useSelector((state)=>state.user)
    SwiperCore.use([Navigation]);
    const {id} = useParams();
    const [loading, setLoading] = useState(false);
    const [listing, setListing] = useState(null);
    const [error, setError] = useState(false);
    const [copied, setCopied] = useState(false);
    const [contact, setContact] = useState(false);


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
            <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
            <FaShare
              className='text-slate-500'
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>
              Link copied!
            </p>
          )}
          <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-2'>
          <p className='font-semibold text-2xl'>
          {listing.name} - ${' '}
          {listing.offer
          ? listing.discountedPrice
          :listing.regularPrice }
          {listing.type === 'rent' && ' /month'}
          </p>
          <p className="flex items-center gap-2 text-slate-600 my-2 text-sm">
            <FaMapMarkerAlt className='text-green-700' />
            {listing.address}
          </p>
          <div className="flex gap-4">
            <p className="bg-red-700 w-full max-w-[200px]
             text-white text-center p-1 rounded-md">
             {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
            </p>
            {
                listing.offer && (
                    <p className="bg-green-900 w-full max-w-[200px]
             text-white text-center p-1 rounded-md">
                ${+listing.regularPrice - +listing.discountedPrice}
             </p>
                )
            }
          </div>
          <p className='text-slate-700'>
            <span className="font-semibold">Description - </span>
            {listing.description}
          </p>
          <ul className='flex items-center text-green-900 font-semibold text-sm
          gap-4 sm:gap-6 flex-wrap'>
            <li className='flex items-center gap-1 whitespace-nowrap'>
                <FaBed className='text-lg' />
                {listing.bedroom > 1 ? `${listing.bedroom} Beds` : `${listing.bedroom} Bed` }
            </li>
            <li className='flex items-center gap-1 whitespace-nowrap'>
                <FaBath className='text-lg' />
                {listing.bathroom > 1 ? `${listing.bathroom} Baths` : `${listing.bathroom} Bath` }
            </li>
            <li className='flex items-center gap-1 whitespace-nowrap'>
                <FaParking className='text-lg' />
                {listing.parking ? "Parking-spot" : 'No Parking' }
            </li>
            <li className='flex items-center gap-1 whitespace-nowrap'>
                <FaChair className='text-lg' />
                {listing.furnished ? "Furnished" : "Unfurnished"}
            </li>

          </ul>
          {currentUser && listing?.userRef !== currentUser._id && !contact &&  (
          <button onClick={()=>setContact(true)} className='bg-slate-700 text-white uppercase p-3 hover:opacity-85 rounded-lg my-4'>contact landlord</button>
          )}
          {contact && <Contact listing={listing} />}
          </div>
        </div>
    }
    </main>
  )
}

export default Listing
