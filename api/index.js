import "dotenv/config";
import express from 'express';
import { connectDB } from "./db/connectDB.js";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";
import cookieParser from "cookie-parser";
const app = express();

// const PORT = process.env.PORT || 3000;
const PORT =  3000;

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRouter);
app.use("/api/user",userRouter);
app.use("/api/listing",listingRouter);


app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server error';
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    })
})


connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server is running at port ${PORT}`);
    })
})

