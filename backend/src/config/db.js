import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

function main() {
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("db connected")
    }).catch((err) => {
        console.log(`error in db connection ${err}`);
    })
}

export default main;