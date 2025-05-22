import request from 'supertest';
import mongoose, { mongo } from 'mongoose';
import {mongoServer} from 'mongodb-memory-server';
import app from '../../src/app.js';
import User from '../../src/models/user.js';

let mongoServer;

beforeAll(async () => {
    mongoServer = await mongoServer.create();
    const uri = mongoServer.getUri();

    await mongoose.connect(mongoUri);
});
afterAll (async()=>{
    await mongoose.connection.close();
    await mongoServer.stop();
});
afterEach(async() => {
    await User.deleteMany();
});
describe('integracion de Test del controlador authController.js', () => {
    test('Registro de Ususario Exitoso', async () => {
        const response = await request (app)
        .post('/api/v1/auth/register')
        .send({
            "name": "Pilar Mondragon Hernandez",
            "email": "pmh@gmail.com",
            "password": "aguacate",
        });
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body).toHaveProperty('tokenAccess');
        expect(response.body.email).toBe('pmh@gmail.com');
        expect(response.body.name).toBe('Pilar Mondragon Hernandez');
    });
});

