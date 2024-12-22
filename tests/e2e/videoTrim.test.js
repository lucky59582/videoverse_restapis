const request = require('supertest');
const app = require('../../server');
const CONFIG = require('../../config/config')
describe('Link Sharing Endpoint', () => {
    test('should create a shareable link for a video', async () => {
        const response = await request(app)
            .post('/api/videos/trim')
            .set('x-api-key', CONFIG.API_KEY)
            .send({
                "video_id": 10,
                "start_time": 3,
                "end_time": 10
            });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Video trimmed successfully');
    }, 20000);
});