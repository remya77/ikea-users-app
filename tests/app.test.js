const request = require('supertest');
const { app, server } = require('../index.js');

let id = 0;

describe('Test the endpoints', () => {
    test('It should respond with user created', async () => {
        const response = await request(app).post('/api/users')
            .send({ name: "Johan Finndahl", isAdmin: true, jobTitle: "Engineering Manager" });
        id = response.body.id;
        expect(response.body.name).toBe('Johan Finndahl');
        expect(response.statusCode).toBe(200);
    });

    test('It should respond with user returned', async () => {
        const response = await request(app).get('/api/users/' + id)
        expect(response.body.name).toBe('Johan Finndahl');
        expect(response.statusCode).toBe(200);
        console.log(response.body);
    });


    test('It should respond with user updated', async () => {
        const response = await request(app).put('/api/users/' + id)
            .send({ isAdmin: false });
        expect(response.body.isAdmin).toBe(false);
        expect(response.statusCode).toBe(200);
        console.log(response.body);
    });

    test('It should respond with user deleted', async () => {
        const response = await request(app).delete('/api/user/' + id)
        //expect(response.body.isadmin).toBe(false);
        expect(response.statusCode).toBe(200);
        console.log(id);
    });
});