const request = require('supertest');
const app = require('../../server');
const CONFIG = require('../../config/config')

describe('Video Upload Endpoint', () => {
    test('should upload a video successfully', async () => {
        const videoPath = 'upload/videos/test.mp4'

        const response = await request(app)
            .post('/api/videos/upload')
            .set('x-api-key', CONFIG.API_KEY)
            .attach('video', videoPath)// 'video' should match the field name expected by your API

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Video uploaded successfully!');
    }, 10000);
});
