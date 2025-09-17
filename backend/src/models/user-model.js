import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20
    },
    lastName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        immutable: true
    },
    age: {
        type: Number,
        min: 6,
        max: 80
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    problemSolved: {
        type: [String]
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const userModel = mongoose.model('user', userSchema);

export default userModel;