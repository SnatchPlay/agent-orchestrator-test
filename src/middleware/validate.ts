import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

type ValidationTarget = 'body' | 'query' | 'params';

export function validate(schema: ZodSchema, target: ValidationTarget = 'body') {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req[target]);

    if (!result.success) {
      res.status(400).json({
        error: 'Validation failed',
        details: result.error.errors,
      });
      return;
    }

    if (target === 'body') {
      req.body = result.data;
    } else if (target === 'query') {
      (req as unknown as { query: unknown }).query = result.data;
    } else {
      req.params = result.data as Record<string, string>;
    }

    next();
  };
}
