import express from 'express';
import healthRouter from './routes/health';
import usersRouter from './routes/users';

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/health', healthRouter);
app.use('/api/v1/users', usersRouter);

export default app;
