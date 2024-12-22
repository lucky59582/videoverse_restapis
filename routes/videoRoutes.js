const express = require("express")
const { uploadVideo, trimVideo, mergeVideo, accessVideo } = require("../controllers/apis/videoController")

const router = express.Router()

router.post('/upload', uploadVideo)
router.post('/trim', trimVideo)
router.post('/merge', mergeVideo)
router.get('/access', accessVideo)


module.exports = router