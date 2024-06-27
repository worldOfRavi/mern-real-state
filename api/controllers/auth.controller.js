import User from '../models/user.model.js';
export const signUp  = async(req, res)=>{
    try {
        console.log(req.body);
        const {username, email, password} = req.body;
        const userExist = await User.findOne({username});
        if(userExist){
            res.status(400).json({message:"User already exists try another username"});
        }
        const newUser = new User({username, email, password});
        await newUser.save();
        res.status(201).json({message:"Registration successful"});

    } catch (error) {
        console.error("Error in sign up controller", error.message);
        res.status(500).json({error:"Server error"})
    }
}