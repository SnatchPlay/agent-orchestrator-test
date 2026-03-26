import request from 'supertest';
import app from '../app';

describe('POST /api/v1/users', () => {
  it('returns 201 with valid body', async () => {
    const res = await request(app)
      .post('/api/v1/users')
      .send({ name: 'Alice', email: 'alice@example.com', age: 25 });
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      message: 'User created',
      user: { name: 'Alice', email: 'alice@example.com', age: 25 },
    });
  });

  it('returns 201 with valid body (age omitted)', async () => {
    const res = await request(app)
      .post('/api/v1/users')
      .send({ name: 'Bob', email: 'bob@example.com' });
    expect(res.status).toBe(201);
    expect(res.body.user.name).toBe('Bob');
  });

  it('returns 400 when name is missing', async () => {
    const res = await request(app)
      .post('/api/v1/users')
      .send({ email: 'alice@example.com' });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error', 'Validation failed');
    expect(Array.isArray(res.body.details)).toBe(true);
  });

  it('returns 400 when name is too short', async () => {
    const res = await request(app)
      .post('/api/v1/users')
      .send({ name: 'A', email: 'alice@example.com' });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error', 'Validation failed');
    expect(Array.isArray(res.body.details)).toBe(true);
  });

  it('returns 400 when email is invalid', async () => {
    const res = await request(app)
      .post('/api/v1/users')
      .send({ name: 'Alice', email: 'not-an-email' });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error', 'Validation failed');
    expect(Array.isArray(res.body.details)).toBe(true);
  });

  it('returns 400 when age is below 18', async () => {
    const res = await request(app)
      .post('/api/v1/users')
      .send({ name: 'Alice', email: 'alice@example.com', age: 16 });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error', 'Validation failed');
    expect(Array.isArray(res.body.details)).toBe(true);
  });

  it('returns 400 when age exceeds 150', async () => {
    const res = await request(app)
      .post('/api/v1/users')
      .send({ name: 'Alice', email: 'alice@example.com', age: 151 });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error', 'Validation failed');
    expect(Array.isArray(res.body.details)).toBe(true);
  });

  it('returns 400 when body is empty', async () => {
    const res = await request(app)
      .post('/api/v1/users')
      .send({});
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error', 'Validation failed');
    expect(Array.isArray(res.body.details)).toBe(true);
  });

  it('400 response has correct { error, details: [...] } shape with ZodIssue messages', async () => {
    const res = await request(app)
      .post('/api/v1/users')
      .send({ name: 'A', email: 'bad' });
    expect(res.status).toBe(400);
    expect(typeof res.body.error).toBe('string');
    expect(Array.isArray(res.body.details)).toBe(true);
    expect(res.body.details.length).toBeGreaterThan(0);
    res.body.details.forEach((d: { message: unknown }) => {
      expect(typeof d.message).toBe('string');
    });
  });
});
