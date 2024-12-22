const { checkVideoDuration } = require('../../controllers/services/videoService');
const CONFIG = require('../../config/config')


describe('Video Service', () => {
    test('should return the correct video duration', async () => {
        const duration = await checkVideoDuration('/upload/videos/test.mp4');
        console.log('Duration:::', duration)
        expect(duration).toBeLessThan(CONFIG.MAX_DURATION);
    });
});
