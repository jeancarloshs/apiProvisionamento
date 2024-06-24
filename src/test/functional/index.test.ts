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
    const userEmail = 'user@example.com';
    const userPassword = 'password@example.com';
    
    const requestPayload  = {
      "email": userEmail,
      "password": userPassword
    }

    const response = await supertest(server).post('/login').send(requestPayload);
    const { body, status } = response;

    console.log(`Response: ${JSON.stringify(body)} - \n Status: ${status}`);

    if (status !== 200) {
      expect(status).toBe(500);
    } else {
      expect(status).toBe(200);
      expect(body).toHaveProperty('token');
    }

    // const sent = {
    //   code: jest.fn()
    // }

    // const { body, status } = await supertest(server)
    //   .post('/login');
    // expect(status).toBe(200);
    // expect(body).toHaveProperty('token');
  }, 15000);
})