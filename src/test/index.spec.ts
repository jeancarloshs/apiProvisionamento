import { describe, it } from 'node:test';
const request = require('supertest');
import app from '../app';

describe('Test My app server', function() {
  it('Should Get main route', async (done) => {
    const res = await request(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200, done);

    // Verificar se a resposta possui a propriedade 'message'
    expect(res.body).toHaveProperty('message');
  });
});
