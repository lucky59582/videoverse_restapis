const { connectDB, sequelize } = require('./db');
const Video = require('./video');
const Link = require('./link');

const initializeModels = async () => {
  await sequelize.sync({ alter: true  });
  console.log('All models synchronized.');
};

const run = async () => {
  await connectDB();
  await initializeModels();

};

run().catch((error) => console.error(error));
