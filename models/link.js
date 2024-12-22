const sequelize = require('./db').sequelize; 
const { DataTypes } = require('sequelize');

const Link = sequelize.define('Link', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    videoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    token: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    expiry: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    tableName: 'links',
});

module.exports = Link;