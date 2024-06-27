import "dotenv/config";
import express from 'express';
import { connectDB } from "./db/connectDB.js";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
const app = express();

// const PORT = process.env.PORT || 3000;
const PORT =  3000;

app.use(express.json());
app.use("/api/auth",authRouter);
app.use("/api/user",userRouter);


connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server is running at port ${PORT}`);
    })
})

