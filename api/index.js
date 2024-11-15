import "dotenv/config";
import express from 'express';
import { connectDB } from "./db/connectDB.js";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";
import cookieParser from "cookie-parser";
import path from 'path';

const __dirname = path.resolve();
// __dirname contains the current running directory
const app = express();

// const PORT = process.env.PORT || 3000;
const PORT =  3000;

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRouter);
app.use("/api/user",userRouter);
app.use("/api/listing",listingRouter);

// when we run the build command, a dist folder is created containing index.html file.
app.use(express.static(path.join(__dirname, "/client/dist")));
// when we run the site and the url is other than then above then then following command get executed where it send the static file index.htmll located in dist folder
app.get("*",(req, res)=>{
    res.sendFile(path.join(__dirname,'client','dist','index.html'));
})


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

