import express from 'express';
import { login, logout, register } from '../controllers/userAuth-controller.js';
import userMiddleware from '../middleware/user-middleware.js';
const authRouter = express.Router();


authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', userMiddleware, logout);


export default authRouter;