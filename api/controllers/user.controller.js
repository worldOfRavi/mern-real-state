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