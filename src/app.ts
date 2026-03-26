import express from 'express';
import usersRouter from './routes/users';

const app = express();

app.use(express.json());

app.use('/api/v1/users', usersRouter);

export default app;
