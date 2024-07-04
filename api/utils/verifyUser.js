import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyUser = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return next(errorHandler(401, "Unauthorized"));
    }
    jwt.verify(token, process.env.SECRET, (err, user)=>{
        if(err) return next(errorHandler(403, 'forbidden'));
        req.user = user;
        next();
    })
  } catch (error) {
    next(error)
  }
};
