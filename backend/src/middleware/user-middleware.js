import jwt from 'jsonwebtoken';
import userModel from '../models/user-model.js';

const userMiddleware = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({ msg: "Token is not present" });
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const { _id } = payload;

        if (!_id) {
            return res.status(401).json({ msg: "Invalid token" });
        }

        const user = await userModel.findById(_id);

        if (!user) {
            return res.status(404).json({ msg: "User doesn't exist" });
        }

        
        req.user = user;

        next(); 
    } catch (err) {
        console.log(`error in user middleware ${err}`);
        return res.status(401).json({ msg: "Unauthorized - Invalid or expired token" });
    }
};

export default userMiddleware;