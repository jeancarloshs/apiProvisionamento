import { describe, it } from 'node:test';
import request from 'supertest';
import server from '../../app';
import express from 'express';
import supertest from 'supertest';
const app = express();

// DESCRIBE -> bloco de testes - tests suites
// IT or TEST -> declara um unico teste unitario - tests cases
// EXPECT-> asserções do resultado - validar resultados

describe('Test My app server', () => {
  test('Should Get main route with just a few times', async () => {
    const { body, status } = await supertest(server)
      .get('/');
    expect(status).toBe(200);
    expect(body).toHaveProperty('message');
  })
});

describe('Test Login Route', () => {
  test('Should return a token', async () => {
    const request = {
      body: {
        "email": "????",
        "password": "????"
      }
    }

    const sent = {
      code: jest.fn()
    }

    console.log('req', sent)
    // const { body, status } = await supertest(server)
    //   .post('/login');
    // expect(status).toBe(200);
    // expect(body).toHaveProperty('token');
  });
})