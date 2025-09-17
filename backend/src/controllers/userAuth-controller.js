import userModel from "../models/user-model.js";
import { validate } from "../utils/validator.js";

async function register(req, res) {
    try {
        const { firstName, emailId, password } = req.body;

        // we have to validate the data

        if(!firstName || !emailId || !password) {
            return res.status(400).json({
                msg: "All fields are required"
            })
        }
    } catch(err) {
        console.log(`error in user auth controller ${err}`);
        return res.status(500).json({
            msg: "internal server error"
        })
    }
}
