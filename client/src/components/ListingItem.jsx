import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

const ListingItem = ({ listing }) => {
  
  return (
    <div
      className="bg-white shadow-md hover:shadow-lg transition-shadow 
    overflow-hidden rounded-lg w-full sm:w-[300px]"
    >
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrl[0]}
          alt="listing_cover"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105
        transition-scale duration-300"
        />
        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="text-lg font-semibold text-slate-700 truncate">
            {listing.name}
          </p>
          <div className="flex gap-1 items-center">
            <MdLocationOn className="w-4 h-4 text-green-700" />
            <p className="text-sm text-gray-600 truncate">{listing.address}</p>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">{listing.description}</p>
          <p className="text-slate-500 mt-2 font-semibold">
            ${listing.offer ? listing.discountedPrice.toLocaleString('en-US') : listing.regularPrice.toLocaleString('en-US')}
            {listing.type==='rent' && ' / month'}
          </p>
          <div className="flex gap-4 font-semibold text-xs text-slate-700">
          <div className="">
                {listing.bedroom} {listing.bedroom > 1 ? "beds" : "bed"}
            </div>
            <div className="">
                {listing.bathroom} {listing.bathroom > 1 ? "baths" : "bath"}
            </div>
          </div>
            
        </div>
      </Link>
    </div>
  );
};

export default ListingItem;
