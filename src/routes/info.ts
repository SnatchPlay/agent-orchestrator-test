import { Router, Request, Response } from 'express';

const router = Router();

/**
 * GET /api/v1/info
 * Returns service name and version.
 */
router.get('/', (_req: Request, res: Response): void => {
  res.status(200).json({
    version: '1.0.0',
    name: 'agent-orchestrator-test',
  });
});

export default router;
