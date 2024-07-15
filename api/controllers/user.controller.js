import User from "../models/user.model.js";
import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";
import bcrypt from 'bcrypt';

export const updateUser = async(req, res, next)=>{
    try {
        const id = req.params.id;
        if(req.user.id !== id) return next(errorHandler(401,"You can only update your own account!"));
        const {username, email, password, avatar} = req.body;

        // no need to hash password for my app as it is done in my user model
        const updateFields = {};
        if (username) updateFields.username = username;
        if (email) updateFields.email = email;
        if (password){
            const salt = await bcrypt.genSaltSync(10);
            const hashedPassword = await bcrypt.hash(password,salt)
            updateFields.password = hashedPassword;
        } 
        if (avatar) updateFields.avatar = avatar;
    
        const updatedUser = await User.findByIdAndUpdate(
          id,
          { $set: updateFields },
          { new: true }
        );
    
        // console.log(updatedUser);
        const {password:pass, ...rest} = updatedUser._doc;
        res.status(201).json(rest)
    } catch (error) {
        next(error)
    }
}

export const deleteUser = async(req, res, next)=>{
    if(req.user.id != req.params.id) 
        return next(errorHandler(401, "You can only delete your account"));
    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('token');
        res.status(200).json("User deleted successfully!");
    } catch (error) {
        next(error)
    }
}

export const getUserListing = async(req, res, next)=>{
    try {
        const id = req.params.id;

        if(id !== req.user.id){
            return next(errorHandler(401,"You can view to your listings only..."))
        }
        const listing = await Listing.find({userRef:id});
        res.status(200).json(listing)

    } catch (error) {
        next(error)
    }
}


export const getUser = async(req, res, next)=>{
    try {
        const id = req.params.id;
        const user = await User.findOne({_id:id},{password:0});
        if(!user) return next(errorHandler(404,"No use is available"))
        

        res.status(200).json(user)

    } catch (error) {
        next(error)
    }
}