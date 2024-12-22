// __tests__/videoService.test.js
const { checkVideoDuration } = require('../../controllers/services/videoService');
const ffmpeg = require('fluent-ffmpeg');

jest.mock('fluent-ffmpeg', () => {
    const mockFFmpeg = jest.fn(() => ({
        ffprobe: jest.fn((path, cb) => {
            cb(null, { format: { duration: 120 } }); // Mock a 120-second duration
        }),
    }));
    return mockFFmpeg;
});

describe('Video Service', () => {
    test('should return the correct video duration', async () => {
        const duration = await checkVideoDuration('mock/video/path.mp4');
        expect(duration).toBe(120); // Expect duration to be 120 seconds
    });
});
