import request from 'supertest';
import { app } from '../../server';

describe('GET /api/v1/health', () => {
  it('returns 200 with status ok and a numeric timestamp', async () => {
    const res = await request(app).get('/api/v1/health');

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ status: 'ok' });
    expect(typeof res.body.timestamp).toBe('number');
  });
});

describe('GET /api/v1/info', () => {
  it('returns 200 with version and name', async () => {
    const res = await request(app).get('/api/v1/info');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      version: '1.0.0',
      name: 'agent-orchestrator-test',
    });
  });
});

describe('unknown routes', () => {
  it('returns 404 for unregistered paths', async () => {
    const res = await request(app).get('/does-not-exist');

    expect(res.status).toBe(404);
    expect(res.body).toMatchObject({ error: 'Not Found' });
  });
});
