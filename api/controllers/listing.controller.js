import { errorHandler } from "../utils/error.js";
import Listing from "../models/listing.model.js";
import { json } from "express";
export const createListing = async(req, res, next) =>{
    try {
        const listing = await Listing.create(req.body);
        res.status(201).json(listing);

    } catch (error) {
        next(error)
    }
};

export const deleteListing = async(req, res, next)=>{
        const listId = req.params.id;
        const listing = await Listing.findOne({_id:listId});
        if(!listing) return next(errorHandler(404, "Listing is not found..."));

        if(listing.userRef !== req.user.id) return next(errorHandler(401,"You can delete your listing only..."));

    try {
        
        await Listing.findByIdAndDelete(listId);
        res.status(200).json("Listing has been deleted");
    } catch (error) {
        next(error)
    }
}

export const updateListing = async(req, res, next)=>{
    try {
        const id = req.params.id;
        const listing = await Listing.findOne({_id:id});
        if(!listing) return next(errorHandler(404,"No listing found"));

        if(listing.userRef !== req.user.id) return next(errorHandler(401, "You can only modify your listing"));
        const updatedListing = await Listing.findByIdAndUpdate(
            id,
            req.body,
            {new:true}
        )
        res.status(201).json(updatedListing);
    } catch (error) {
        next(error)
    }
}

export const getListing = async(req, res, next) =>{
    try {
        const id = req.params.id;
        const listing = await Listing.findOne({_id:id});
        if(!listing) return next(errorHandler(404,"Listing not found"));
        res.status(200).json(listing);
    } catch (error) {
        next(error)
    }
}