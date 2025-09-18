import express from 'express';
import { adminRegister, login, logout, register } from '../controllers/userAuth-controller.js';
import userMiddleware from '../middleware/user-middleware.js';
import adminMiddleware from '../middleware/admin-middleware.js';
const authRouter = express.Router();


authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.get('/logout', userMiddleware, logout);

// admin routes
// we have to admin middleware
authRouter.post('/register', adminMiddleware, adminRegister);
export default authRouter;