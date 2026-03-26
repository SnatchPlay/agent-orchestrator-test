import { Router, Request, Response } from 'express';
import { validate } from '../middleware/validate';
import { healthQuerySchema } from '../schemas/health.schema';

const router = Router();

router.get(
  '/',
  validate(healthQuerySchema, 'query'),
  (_req: Request, res: Response): void => {
    res.status(200).json({
      status: 'ok',
      timestamp: new Date().toISOString(),
    });
  },
);

export default router;
