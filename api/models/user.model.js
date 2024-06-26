import {Schema, model} from 'mongoose';

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        uique:true
    },
    email:{
        type:String,
        required:true,
        uique:true
    },
    password:{
        type:String,
        required:true,
    }
},{timestamps:true});

const User  = model("User",userSchema);

export default User;

