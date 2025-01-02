// __tests__/linkSharing.test.js
const request = require('supertest');
const app = require('../../server');
const CONFIG = require('../../config/config')

describe('Link Sharing Endpoint', () => {
    test('should create a shareable link for a video', async () => {
        const response = await request(app)
            .post('/api/links/generate')
            .set('x-api-key', CONFIG.API_KEY)
            .send({ video_id: 32 });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Link generated successfully');
    });
});
