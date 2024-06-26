import mongoose from 'mongoose';

const compassURI = process.env.COMPASS_URI;
const atlas_uri = process.env.ATLAS_URI;
 export const connectDB = async()=>{
    try {
       await mongoose.connect(atlas_uri,{
        useUnifiedTopology: true, // Use the Unified Topology layer
       });
        console.log("Database connection successful");
    } catch (error) {
        console.log("Database connection error", error.message);
        process.exit(0);
    }

}

