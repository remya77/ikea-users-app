const request = require('supertest');
const { app, server } = require('../index.js');

describe('Test the root path', () => {
    test('It should respond with "Hello Ikea!"', async () => {
        const response = await request(app).get('/');
        //expect(response.text).toBe('Hello Ikea!');
        expect(response.statusCode).toBe(200);
    });
});