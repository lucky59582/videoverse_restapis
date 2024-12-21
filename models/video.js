const sequelize = require('./db').sequelize; 
const { DataTypes } = require('sequelize');

const Video = sequelize.define('Video', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    path: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    duration: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    tableName: 'videos',
});

module.exports = Video;
