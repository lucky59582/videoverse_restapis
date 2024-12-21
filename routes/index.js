const express = require("express")
const videoRoutes = require("./videoRoutes")

const router = express.Router()


router.get('/ping', (req, res) => {
    res.send("pong")
});

router.use('/videos', videoRoutes);


module.exports = router


