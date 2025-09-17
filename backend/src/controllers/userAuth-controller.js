import userModel from "../models/user-model.js";
import { validate } from "../utils/validator.js";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();
import bcrypt from 'bcrypt';

async function register(req, res) {
    try {
        // we have to validate data
        validate(req.body);
        const { firstName, emailId, password } = req.body;

        const existingUser = await userModel.findOne({ emailId });
        if(existingUser) {
            return res.status(400).json({
                msg: "user already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // creating user in db
        const user = await userModel.create({
            firstName: firstName,
            emailId: emailId,
            password: hashedPassword
        });

        
        // jwt.sign('payload', 'key', 'time')
        const token = jwt.sign({ _id: user._id, emailId: emailId }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // setting token in cookie
        res.cookie('token', token, {maxAge: 60*60*1000});


        return res.status(201).json({
            msg: "user register successfully",
            user: user
        });

    } catch(err) {
        console.log(`error in user auth controller ${err}`);
        return res.status(500).json({
            msg: "internal server error"
        })
    }
}
