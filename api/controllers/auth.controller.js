import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
export const signUp  = async(req, res, next)=>{
    try {
        const {username, email, password} = req.body;
        const userExist = await User.findOne({username});
        if(userExist){
            // return next(errorHandler(409,"user already exists"));
            // return res.status(400).json({message:"User already exists try another username"});
            // return next(new Error("User already exists try another username"))
        }
        const newUser = new User({username, email, password});
        await newUser.save();
        res.status(201).json({message:"Registration successful"});

    } catch (error) {
        if (error.code === 11000) {
            // Duplicate key error
            // console.log(error.keyValue);
            if (error.keyValue.username) {
                return next(errorHandler(409,"username already taken!"));
            }
            if (error.keyValue.email) {
                return next(errorHandler(409,"Email already taken!"));
            }
          }
        next(error)
    }
}