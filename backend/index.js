import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import main from './src/config/db.js';
dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get('/', (req, res) => {
    return res.status(200).json({
        msg: "dummy route"
    })
});


// database connection
main();

app.listen(port, () => {
    console.log(`server started on port: ${port}`);
})