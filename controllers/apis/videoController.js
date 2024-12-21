const multer = require('multer');
const path = require('path')
const CONFIG = require('../../config/config')
const { checkVideoDuration } = require('../services/videoService')
const Video = require('../../models/video');
const ffmpeg = require('fluent-ffmpeg')


const storage = multer.diskStorage({
    destination: path.join(CONFIG.PROJECT_ROOT, CONFIG.UPLOAD_VIDEOS),
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    },
  });

const upload = multer({
    storage: storage,
    limits: { fileSize: CONFIG.MAX_FILE_SIZE * 1024 * 1024 }, 
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('video/')) {
            return cb('File must be a video');
        }
        cb(null, true);
    },
}).single('video');

const uploadVideo = async (req, res) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
              res.status(500).send({ message: err.message ? err.message : err });
            } else {
              if (!req.file) {
                res.status(500).send({ message: 'No file uploaded' });
              } else {
                const videoPath = req.file.path;
                const duration = await checkVideoDuration(videoPath);
                if (duration < CONFIG.MIN_DURATION || duration > CONFIG.MAX_DURATION) {
                    return res.status(500).json({ message: `Duration must be between ${CONFIG.MIN_DURATION} and ${CONFIG.MAX_DURATION} seconds` });
                }
                const video = await Video.create({
                  path: videoPath,
                  duration: duration,
                });
                res.status(200).json({
                  message: 'Video uploaded successfully!',
                  id: video.id
                });
              }
            }
        });
    } catch (err) {
        console.log('Error while uploading a video', err)
        res.status(500).json({
          message: 'Error while uploading a video!',
        });
    }
}

const trimVideo = async (req, res) => {
  try {
    const videoId = req.body.video_id
    const startTime = req.body.start_time
    const endTime = req.body.end_time
    const videoData = await Video.findByPk(videoId, {
      raw: true
    })
    const trimmedVideo = path.join(CONFIG.PROJECT_ROOT, CONFIG.TRIMMED_VIDEOS, `trimmed_vid_${videoData.id}_${Date.now()}${ path.extname(videoData.path)}`)
    console.log('Trimmed Video', trimmedVideo)
    ffmpeg(videoData.path)
      .setStartTime(startTime)
      .setDuration(endTime - startTime)
      .output(trimmedVideo)
      .on('end', () => {
          res.status(200).json({ message: 'Video trimmed successfully' });
      })
      .on('error', (err) => {
          console.log('Error', err)
          res.status(500).json({ message: err.message });
      })
      .run();
    console.log('Video Id', videoData)
  } catch (err) {
    console.log('Error while trimming a video', err)
    res.status(500).json({
      message: 'Error while trimming a video!',
    });
  } 
}


module.exports = {
    uploadVideo,
    trimVideo
}