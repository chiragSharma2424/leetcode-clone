import express from 'express';
import adminMiddleware from '../middleware/admin-middleware.js';
import { createProblem } from '../controllers/problem-controller.js';
const problemRouter = express.Router();

// here we need admin middleware
problemRouter.post('/create', adminMiddleware, createProblem);
problemRouter.patch('/:id');
problemRouter.delete('/:id');

// here normal user can visits
problemRouter.get('/:id');
problemRouter.get('/');
problemRouter.get('/user');

export default problemRouter;