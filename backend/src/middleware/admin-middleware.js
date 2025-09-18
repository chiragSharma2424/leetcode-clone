import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import userModel from '../models/user-model.js';

const adminMiddleware = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if(!token) {
            throw new Error("Token is not present");
        }
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const { _id } = payload;
        if(!_id) {
            throw new Error("Invalid token");
        }
        const result = await userModel.findById(_id);

        if(payload.role != 'admin') {
            throw new Error("Invalid token, admin nhi ho");
        }

        if(!result) {
            throw new Error("User does not exist");
        }

        req.result = result

    } catch(err) {
        console.log(`error aaya h admin middleware me ${err}`);
        return res.status(500).json({
            msg: "internal server error"
        })
    }
}

export default adminMiddleware