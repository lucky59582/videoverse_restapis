// __tests__/linkSharing.test.js
const request = require('supertest');
const app = require('../../server');

describe('Link Sharing Endpoint', () => {
    test('should create a shareable link for a video', async () => {
        const response = await request(app)
            .post('/generate')
            .send({ videoId: 10 });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Link created successfully');
        expect(response.body.link).toHaveProperty('token');
    });
});
