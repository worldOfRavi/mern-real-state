import React from "react";

const CreateListing = () => {
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="font-semibold text-3xl text-center my-7">
        Create a Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-1 flex-col gap-4">
          <input
            type="text"
            id="name"
            placeholder="Name"
            className="border 
            p-3 rounded-lg"
            minLength="10"
            maxLength="62"
            required
          />
          <textarea
            id="description"
            placeholder="Description"
            className="border 
            p-3 rounded-lg"
            required
          />
          <input
            type="text"
            id="address"
            placeholder="Address"
            className="border 
            p-3 rounded-lg"
            required
          />

          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2 items-center ">
              <input
                type="number"
                id="bedroom"
                min="1"
                max="10"
                required
                className="border border-gray-300"
              />
              <p>Beds</p>
            </div>
            <div className="flex gap-2 items-center ">
              <input
                type="number"
                id="bathroom"
                min="1"
                max="10"
                required
                className="border border-gray-300"
              />
              <p>Baths</p>
            </div>
            <div className="flex gap-2 items-center ">
              <input
                type="number"
                id="regularPrice"
                min="1"
                max="10"
                required
                className="border border-gray-300"
              />
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                <span className="text-xs">($ / Month)</span>
              </div>
            </div>
            <div className="flex gap-2 items-center ">
              <input
                type="number"
                id="discountedPrice"
                min="1"
                max="10"
                required
                className="border border-gray-300"
              />
              <div className="flex flex-col items-center">
                <p>Discounted Price</p>
                <span className="text-xs">($ / Month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 xl-2">
              The first image will be cover (max 6)
            </span>
          </p>
          <div className="flex gap-2">
            <input
              type="file"
              id="images"
              multiple
              accept="image/*"
              className="p-3 border border-gary-300 rounded w-full"
            />
            <button
              className="border border-green-700 text-green-700 uppercase p-3
             rounded hover:shadow-lg disabled:opacity-85"
            >
              upload
            </button>
          </div>
          <button className="uppercase p-3 border bg-slate-700 text-white rounded-lg hover:opacity-90 disabled:opacity-80 ">create listing</button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
