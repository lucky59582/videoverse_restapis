const ffmpeg = require('fluent-ffmpeg');
const CONFIG = require('../../config/config')
const path = require('path')

const checkVideoDuration = (filePath) => {
    return new Promise((resolve, reject) => {
        ffmpeg.ffprobe(filePath, (err, metadata) => {
            if (err) reject(err);
            resolve(metadata.format.duration);
        });
    });
};

const reencodeVideo = (video, index) => {
    return new Promise((resolve, reject) => {
      const output = path.join(CONFIG.PROJECT_ROOT, CONFIG.REENCODED_VIDEOS, `reencoded_video_${index}_${Date.now()}${path.extname(video)}`);
      
      ffmpeg(video)
        .output(output)
        .outputOptions('-c:v', 'libx264')
        .outputOptions('-c:a', 'aac')
        .outputOptions('-r', '30')
        .outputOptions('-s', '1280x720')
        .on('end', function () {
          console.log(`Re-encoded ${video} successfully!`);
          resolve(output);  
        })
        .on('error', function (err) {
          console.error('Error during re-encoding: ' + err.message);
          reject(err);
        })
        .run();
    });
  }

module.exports = { 
    checkVideoDuration,
    reencodeVideo
};