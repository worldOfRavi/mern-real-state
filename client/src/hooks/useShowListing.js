import React, { useState } from "react";
import { useSelector } from "react-redux";

const useShowListing = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [listing, setListing] = useState([]);
  const [loading, setLoading] = useState(false);
  const showListing = async () => {
    setLoading(true);
    try {
      const res = await fetch(`api/user/listing/${currentUser._id}`);
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        throw new Error(data.message);
      }
      setListing(data);
    } catch (error) {
      setLoading(false);
      return { success: false, message: error.message };
    }
  };
  return {listing, loading, showListing}
};

export default useShowListing;
