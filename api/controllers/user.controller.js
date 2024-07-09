import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js"

export const updateUser = async(req, res, next)=>{
    try {
        const id = req.params.id;
        if(req.user.id !== id) return next(errorHandler(401,"You can only update your own account!"));
        const {username, email, password, avatar} = req.body;

        // no need to hash password for my app as it is done in my user model
        const updateFields = {};
        if (username) updateFields.username = username;
        if (email) updateFields.email = email;
        if (password) updateFields.password = password;
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