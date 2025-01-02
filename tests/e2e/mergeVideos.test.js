const request = require('supertest');
const app = require('../../server');
const CONFIG = require('../../config/config')
describe('Link Sharing Endpoint', () => {
    test('should create a shareable link for a video', async () => {
        const response = await request(app)
            .post('/api/videos/merge')
            .set('x-api-key', CONFIG.API_KEY)
            .send({
                "video_ids": [32, 33, 34]
            });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Videos merged successfully');
    }, 60000);
});