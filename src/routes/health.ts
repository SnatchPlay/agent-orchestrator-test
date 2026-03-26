import { Router, Request, Response } from 'express';

const router = Router();

/**
 * GET /health
 * Returns service health status and current timestamp.
 */
router.get('/', (_req: Request, res: Response): void => {
  res.status(200).json({
    status: 'ok',
    timestamp: Date.now(),
  });
});

export default router;
