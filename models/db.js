const { Sequelize } = require('sequelize');
const Video = require('./video');
const CONFIG = require('../config/config');
const path = require('path');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(CONFIG.PROJECT_ROOT, 'videoverse_db', 'videoverse.sqlite'),
    logging: true,
});

sequelize
    .authenticate()
    .then(() => console.log('Database connected via Sequelize'))
    .catch((err) => console.error('Error connecting to the database:', err));


sequelize.sync({ force: false })
    .then(() => console.log('Models synchronized with the database'))
    .catch((error) => console.error('Error syncing models:', error));


module.exports = {
    sequelize,
    Video
};

