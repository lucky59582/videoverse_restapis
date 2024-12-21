const CONFIG = require('../config/config')

const auth_api_key = async (req,res,next) => {
    const token = req.headers['x-api-key']
    if (token == CONFIG.API_KEY) {
        return next()
    }
    return res.status(403).json({ message: 'Access Forbidden' });
}

module.exports = auth_api_key