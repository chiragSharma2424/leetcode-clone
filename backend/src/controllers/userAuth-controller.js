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

        // this line will register user as "user" only not admin
        req.body.role = 'user'

        // creating user in db
        const user = await userModel.create({
            firstName: firstName,
            lastName: lastName,
            emailId: emailId,
            password: hashedPassword
        });

        
        // jwt.sign('payload', 'key', 'time')
        const token = jwt.sign({ _id: user._id, emailId: emailId, role: 'user'}, process.env.JWT_SECRET, { expiresIn: '1h' });
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

        const token = jwt.sign({_id: user._id, emailId: user._id, role: user.role}, process.env.JWT_SECRET, { expiresIn: '1h'});
        res.cookie('token', token, { maxAge: 60*60*1000 });

        return res.status(200).json({
            msg: "user logged in successfully",
            token
        });
        
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

        res.clearCookie("token");
        return res.status(200).json({
            msg: "user logged out successfully"
        })
    } catch(err) {
        console.log(`error in logout controller ${err}`);
        return res.status(500).json({
            msg: "internal server error"
        })
    }
}



// admin register
async function adminRegister(req, res) {
    try {
        validate(req.body);
        const { firstName, emailId, password } = req.body;

        req.body.password = await bcrypt.hash(password, 10);


        const user = await userModel.create(req.body);
        const token = jwt.sign({_id:user._id, emailId: emailId, role: user.role}, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { maxAge: 60*60*1000 });
        res.status(201).json({
            msg: "Admin registered successfully"
        });
    } catch(err) {
        console.log(`error in admin register ${err}`);
        return res.status(500).json({
            msg: "Internal server error"
        })
    }
}

export { register, login, logout, adminRegister };