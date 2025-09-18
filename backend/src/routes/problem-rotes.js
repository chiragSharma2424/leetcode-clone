import express from 'express';
const problemRouter = express.Router();

// here we need admin middleware
problemRouter.post('/create');
problemRouter.patch('/:id');
problemRouter.delete('/:id');

// here normal user can visits
problemRouter.get('/:id');
problemRouter.get('/');
problemRouter.get('/user');

export default problemRouter;