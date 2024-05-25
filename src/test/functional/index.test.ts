import { describe, it } from 'node:test';
import request from 'supertest';
import server from '../../app';
import express from 'express';
import supertest from 'supertest';
const app = express();

describe('Test My app server', function () {
  it('Should Get main route with just a few times', async () => {
    const { body, status } = await supertest(app)
      .get('/');
    expect(status).toBe(200);
    // expect(body).toBe({ message: "Server is running" });
    expect(body).toHaveProperty('message');
  })
});