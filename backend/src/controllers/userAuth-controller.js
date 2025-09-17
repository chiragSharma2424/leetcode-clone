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
        const { firstName, emailId, password, lastName } = req.body;

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
            lastName: lastName,
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


// login controller
async function login(req, res) {
    try {
        const { emailId, password } = req.body;

        if(!emailId) {
            throw new Error("Invalid credentials");
        }
        if(!password) {
            throw new Error("Invalid credentials");
        }

        const user = await userModel.findOne({ emailId });

        const isValidPassword = await bcrypt.compare(password, user.password);

        if(!isValidPassword) {
            throw new Error("Invalid credentials");
        }

        const token = jwt.sign({_id: user._id, emailId: user._id}, process.env.JWT_SECRET, { expiresIn: '1h'});
        res.cookie('token', token, { maxAge: 60*60*1000 });

        return res.status(200).json({
            msg: "user logged in successfully",
            token
        })

    } catch(err) {
        console.log(`error in login controller ${err}`);
        return res.status(500).json({
            msg: "Internal server error"
        })
    }
}



// logout controller
async function logout(req, res) {
    try {
      // validate the token
      // token added to redis to blocklist
    } catch(err) {
        console.log(`error in logout controller ${err}`);
        return res.status(500).json({
            msg: "internal server error"
        })
    }
}


export { register, login, logout };