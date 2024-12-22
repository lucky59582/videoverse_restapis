const express = require('express');
const Link = require('../models/link');
const CONFIG = require('../config/config');
const crypto = require('crypto');
const router = express.Router();

router.post('/generate', async (req, res) => {
    try {
        const videoId = req.body.video_id;
        const expiryTime = CONFIG.EXPIRY_TIME * 60 // 60 minutes in seconds
        const token = crypto.randomBytes(20).toString('hex');
        const expiry = Date.now() + expiryTime * 1000;
        const linkData = await Link.create({ 
            videoId, 
            token, 
            expiry 
        })
        res.status(200).json({
            message: 'Link generated successfully',
            link: `http://localhost:${CONFIG.APP_PORT}/api/videos/access/?video_id=${videoId}&token=${token}`
        })
    } catch (err) {
        console.log('Error while generating link', err)
        res.status(500).json({
            message: 'Error while generating link'
        })
    }
})


module.exports = router

