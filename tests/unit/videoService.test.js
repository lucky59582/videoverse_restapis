const { checkVideoDuration } = require('../../controllers/services/videoService');
const CONFIG = require('../../config/config')
const path = require('path')


describe('Video Service', () => {
    test('should return the correct video duration', async () => {
        const videoPath = path.join(CONFIG.PROJECT_ROOT, CONFIG.UPLOAD_VIDEOS, 'test.mp4')
        const duration = await checkVideoDuration(videoPath);
        console.log('Duration:::', duration)
        expect(duration).toBeLessThan(CONFIG.MAX_DURATION);
    });
});
