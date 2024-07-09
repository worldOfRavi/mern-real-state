import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// logic for user sign up
export const signUp = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const userExist = await User.findOne({ $or: [{ username }, { email }] });

    if (userExist) {
      if (userExist.username === username) {
        return next(errorHandler(409, "Username already taken"));
      }
      if (userExist.email === email) {
        return next(errorHandler(409, "Email already taken"));
      }
    }
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    next(error);
  }
};

// logic for user sign in

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandler(404, "Either email or password do not match"));
    }
    const comparedPassowrd = await bcrypt.compare(password, user.password);
    if (!comparedPassowrd) {
      return next(errorHandler(404, "Credendials do not match"));
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: "15d",
    });
    // another method to exclude the password from the rest of the attributes
    const { password: pass, ...rest } = user._doc;
    res.cookie("token", token).status(200).json(rest);
  } catch (error) {
    next(error);
  }
};


// logic for google Oauth
export const google = async(req, res, next)=>{
  try {
    const user = await User.findOne({email:req.body.email});
    if(user){
      const token = jwt.sign({id:user._id}, process.env.SECRET,{
        expiresIn:"15d"
      });
      const {password:pass, ...rest} = user._doc;
      res.cookie("token",token,{httpOnly:true}).status(200).json(rest);
    }else{
      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword,10);
      const newUser = new User({
        username:req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
        email:req.body.email,
        password:hashedPassword,
        avatar:req.body.photo
      })
      await newUser.save();
      const token = jwt.sign({id:newUser._id}, process.env.SECRET,{
        expiresIn:"15d"
      });
      const {password:pass, ...rest} = newUser._doc;
      res.cookie("token",token,{httpOnly:true}).status(200).json(rest);

    }
  } catch (error) {
    next(error)
  }
}

export const userSignout = async (req, res, next)=>{
  try {
    res.clearCookie("token");
    res.status(200).json("User signout successful");
    
  } catch (error) {
    next(error)
  }
}