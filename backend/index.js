import express from 'express';
import dotenv from 'dotenv';
import main from './src/config/db.js';
dotenv.config();
const app = express();
const port = process.env.PORT;

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