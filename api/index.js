import "dotenv/config";
import express from 'express';
import { connectDB } from "./db/connectDB.js";

const app = express();

// const PORT = process.env.PORT || 3000;
const PORT =  3000;
app.get("/",(req, res)=>{
      res.send("Hello Ravi");
})

connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server is running at port ${PORT}`);
    })
})

