import { Router, Request, Response } from 'express';
import { validate } from '../middleware/validate';
import { createUserSchema, CreateUserInput } from '../schemas/user.schema';

const router = Router();

router.post(
  '/',
  validate(createUserSchema, 'body'),
  (req: Request, res: Response): void => {
    const { name, email, age } = req.body as CreateUserInput;

    res.status(201).json({
      message: 'User created',
      user: { name, email, age },
    });
  },
);

export default router;
