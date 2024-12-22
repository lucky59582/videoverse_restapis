const multer = require('multer');
const path = require('path');
const CONFIG = require('../../config/config');
const { checkVideoDuration, reencodeVideo } = require('../services/videoService');
const Video = require('../../models/video');
const Link = require('../../models/link');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const moment = require('moment');


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
  } catch (err) {
    console.log('Error while trimming a video', err)
    res.status(500).json({
      message: 'Error while trimming a video!',
    });
  } 
}

const mergeVideo = async (req, res) => {
  try {
    const videoIds  = req.body.video_ids;
    const videoPaths = [];

    for (let id of videoIds) {
      const video = await Video.findByPk(id, {
        raw: true
      });
      videoPaths.push(video.path);
    }

    const mergedVideo = path.join(CONFIG.PROJECT_ROOT, CONFIG.MERGED_VIDEOS, `merged_vid_${Date.now()}${path.extname(videoPaths[0])}`)
    const reencodedPaths = await Promise.all(videoPaths.map((video, index) => reencodeVideo(video, index)));
    const fileListPath = path.join(CONFIG.PROJECT_ROOT, 'filelist.txt');
    const fileListContent = reencodedPaths.map(video => `file '${video}'`).join('\n');
    fs.writeFileSync(fileListPath, fileListContent);

    ffmpeg()
      .input(fileListPath)
      .inputOptions('-f', 'concat')
      .inputOptions('-safe', '0')
      .outputOptions('-c:v', 'libx264')
      .outputOptions('-c:a', 'aac') 
      .output(mergedVideo)
      .on('start', function (commandLine) {
        console.log('FFmpeg process started with command: ' + commandLine);
      })
      .on('end', function () {
        console.log('Merging finished!');
        fs.unlinkSync(fileListPath);
        reencodedPaths.forEach((video) => {
          fs.unlink(video, (err) => {
            if (err) {
              console.error(`Error deleting file ${video}: `, err);
            } else {
              console.log(`Deleted re-encoded video: ${video}`);
            }
          });
        });
        res.status(200).json({ message: 'Videos merged successfully' });
      })
      .on('error', function (err) {
        console.error('Error: ' + err.message);
        res.status(500).json({ message: 'Error during video merge', error: err.message });
      })
      .run();
  } catch (err) {
    console.log('Error while merging videos', err)
    res.status(500).json({
      message: 'Error while merging videos!!',
    });
  }
}

const accessVideo = async (req, res) => {
  const videoId = req.query.video_id;
  const token = req.query.token
  try {
      const videoLink = await Link.findOne({
          where: { videoId, token },
          raw: true
      });
      if (!videoLink) {
          return res.status(400).json({ message: 'Invalid link' });
      }
      const currentTime = moment().toISOString();
      if (moment(videoLink.expiryTime).isBefore(currentTime)) {
          return res.status(400).json({ message: 'Link has expired' });
      }
      const video = await Video.findByPk(videoId);
      if (!video) {
          return res.status(404).json({ message: 'Video not found' });
      }
      res.sendFile(video.path);
    } catch (err) {
      console.log('Err', err)
      res.status(500).json({ message: 'Error while accessing video' });
    }
}

module.exports = {
    uploadVideo,
    trimVideo,
    mergeVideo,
    accessVideo
}