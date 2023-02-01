const mongoose = require('mongoose');

require('dotenv').config();

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

function connectToDb() {
  mongoose
    .connect(process.env.MONGOOSE_URL, connectionParams)
    .then(() => {
      console.log('Connected to the database');
    })
    .catch((err) => {
      console.error(`Err connecting to the database. n${err}`);
    });
}

module.exports = connectToDb;
