import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import main from './src/config/db.js';
import authRouter from './src/routes/userAuth-routes.js';

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(cookieParser());


// routes
app.use('/user', authRouter);
app.use('/admin', authRouter);


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