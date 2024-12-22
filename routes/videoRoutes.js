const express = require("express")
const { uploadVideo, trimVideo, mergeVideo } = require("../controllers/apis/videoController")

const router = express.Router()

router.post('/upload', uploadVideo)
router.post('/trim', trimVideo)
router.post('/merge', mergeVideo)


module.exports = router