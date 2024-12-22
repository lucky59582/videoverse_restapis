// __tests__/videoUpload.test.js
const request = require('supertest');
const app = require('../../server');
const fs = require('fs');
const path = require('path');

describe('Video Upload Endpoint', () => {
    test('should upload a video successfully', async () => {
        const response = await request(app)
            .post('/api/videos/upload')
            .attach('video', path.resolve(__dirname, './sample.mp4'))
            .field('minDuration', 10)
            .field('maxDuration', 300);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Video uploaded successfully');
        expect(response.body.video).toHaveProperty('path');
    });
});
