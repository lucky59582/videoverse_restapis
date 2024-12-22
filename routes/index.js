const express = require('express');
const videoRoutes = require('./videoRoutes');
const linkRoutes = require('./linkRoutes');

const router = express.Router()


router.get('/ping', (req, res) => {
    res.send("pong")
});

router.use('/videos', videoRoutes);
router.use('/links', linkRoutes);


module.exports = router


