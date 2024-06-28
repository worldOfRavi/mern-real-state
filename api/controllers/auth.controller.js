import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// logic for user sign up
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

// logic for user sign in

export const signIn = async(req, res, next)=>{
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return next(errorHandler(404,"Either email or password do not match"));
        }
        const comparedPassowrd = await bcrypt.compare(password,user.password);
        if(!comparedPassowrd){
            return next(errorHandler(404,"Credendials do not match"));
        }
        const token = jwt.sign({id:user._id},
            process.env.SECRET,
            {
                expiresIn:"15d"
            }
        )
        // another method to exclude the password from the rest of the attributes
        const {password:pass, ...rest} = user._doc; 
        res.cookie('token',token).status(200).json(rest);
    } catch (error) {
        next(error)
    }
} 