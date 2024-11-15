import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingItem from "../components/ListingItem";
export default function Home() {
  const [offerListing, setOfferListing] = useState([]);
  const [saleListing, setSaleListing] = useState([]);
  const [rentListing, setRentListing] = useState([]);
  SwiperCore.use([Navigation]);
  useEffect(() => {
    // offer listing data
    const getOfferListing = async () => {
      try {
        const res = await fetch(`/api/listing/get?offer=true&limit=4`);
        const data = await res.json();
        if (data.success === false) {
          throw new Error(data.message);
        }
        setOfferListing(data);
        getSaleListing();
        getRentListing();
      } catch (error) {
        console.log(error.message);
      }
    };
    getOfferListing();

    // sale lsiting data
    const getSaleListing = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=sale&limit=4`);
        const data = await res.json();
        if (data.success === false) {
          throw new Error(data.message);
        }
        setSaleListing(data);
      } catch (error) {
        console.log(error.message);
      }
    };

    // rent
    const getRentListing = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=rent&limit=4`);
        const data = await res.json();
        if (data.success === false) {
          throw new Error(data.message);
        }
        setRentListing(data);
      } catch (error) {
        console.log(error.message);
      }
    };
  }, []);
  return (
    <div>
      {/* top */}
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 text-3xl lg:text-6xl">
          Find your next <span className="text-slate-500">perfect</span> <br />
          place with ease
        </h1>
        <div className=" text-slate-400 text-xs sm:text-sm">
          Raaj Estate is the best place to find your next perfect place to live.{" "}
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link
          to={"/search"}
          className="text-xs sm:text-sm text-blue-700 hover:underline "
        >
          Let's get started...
        </Link>
      </div>
      {/* swipper */}
      <Swiper navigation>
        {offerListing &&
          offerListing.length > 0 &&
          offerListing.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                style={{
                  background: `url(${listing.imageUrl[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[500px]"
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* listing for offer, rent and sale */}

      <div className="max-w-7xl  mx-auto p-3 flex flex-col gap-8 my-10">
      {/* offer listing */}
        {offerListing && offerListing.length > 0 && (
          <div>
            <div className="my-4">
              <h2 className="text-slate-600 text-2xl font-bold">
                Recent offers
              </h2>
              <Link
                to={"/search/?offer=true"}
                className="text-blue-700 hover:underline"
              >
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerListing.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {/* sale listing */}
        {saleListing && saleListing.length > 0 && (
          <div>
            <div className="my-4">
              <h2 className="text-slate-600 text-2xl font-bold">
                Recent places on sale
              </h2>
              <Link
                to={"/search/?type=sale"}
                className="text-blue-700 hover:underline"
              >
                Show more places for sale
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {saleListing.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {/* rent listing */}
        {rentListing && rentListing.length > 0 && (
          <div>
            <div className="my-4">
              <h2 className="text-slate-600 text-2xl font-bold">
                Recent places on rent
              </h2>
              <Link
                to={"/search/?type=rent"}
                className="text-blue-700 hover:underline"
              >
                Show more places for rent
              </Link>
            </div>
            <div className=" mx-w-6xl flex flex-wrap gap-4">
              {rentListing.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
