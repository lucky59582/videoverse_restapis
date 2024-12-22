const path = require('path')
const PROJECT_ROOT = `${path.resolve(path.join(__dirname, '../'))}/`;

module.exports = {
    APP_PORT: 3000,
    API_KEY: 'b17ad3cc-1d3c-4de5-894a-c3eab59adb19',
    UPLOAD_VIDEOS: 'upload/videos',
    TRIMMED_VIDEOS: 'upload/trimmed_videos',
    MERGED_VIDEOS: 'upload/merged_videos',
    REENCODED_VIDEOS: 'upload/reencoded_videos',
    MIN_DURATION: 10,
    MAX_DURATION: 20,
    MAX_FILE_SIZE: 25,
    EXPIRY_TIME: 60,
    PROJECT_ROOT
}