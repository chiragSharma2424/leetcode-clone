import express from 'express';
const authRouter = express.Router();

authRouter.post('/register');
authRouter.post('/login');
authRouter.post('/logout');
authRouter.get('/getProfile');


export default authRouter;