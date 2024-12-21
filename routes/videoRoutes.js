const express = require("express")
const { uploadVideo, trimVideo } = require("../controllers/apis/videoController")

const router = express.Router()

router.post('/upload', uploadVideo)
router.post('/trim', trimVideo)


module.exports = router