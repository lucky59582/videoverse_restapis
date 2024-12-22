const { Sequelize } = require('sequelize');
const CONFIG = require('../config/config');
const path = require('path');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(CONFIG.PROJECT_ROOT, 'videoverse_db', 'videoverse.sqlite'),
    logging: true,
});

const connectDB = async () => {
    try {
      await sequelize.authenticate();
      console.log('Database connected successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
};


module.exports = {
    sequelize,
    connectDB
};

