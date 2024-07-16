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

export const getListings = async(req, res, next) =>{
    try {
        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0;
        let offer = req.query.offer;
        
        if(offer === undefined || offer === 'false'){
            offer = {$in: [false, true]}
        }
        let furnished = req.query.furnished;

        if(furnished === undefined || furnished === 'false'){
            furnished = {$in:[false, true]}
        }
        let parking = req.query.parking;
        if(parking === undefined || parking === 'false'){
            parking = {$in:[false, true]}
        }
        
        let type = req.query.type;
        if(type === undefined || type ==='all'){
            type = {$in:['sale','rent']}
        }

        const searchTerm = req.query.searchTerm || '';
        const sort = req.query.sort || 'createdAt';
        const order = req.query.order || 'desc';
        const listing = await Listing.find({
            name: {$regex: searchTerm, $options:"i"},
            offer,
            furnished,
            parking,
            type
        }).sort({[sort]:order}
        ).limit(limit).skip(startIndex);
        res.status(200).json(listing);
    } catch (error) {
        next(error)
    }
}



