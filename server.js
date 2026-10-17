require('dotenv').config();

const mongoose = require('mongoose');
const app = require('./app');

const DB = process.env.DATABASE;

mongoose.connect(DB)
  .then(con => {
    console.log('DB connection successful!');
  })
  .catch(err => {
    console.log('DB connection failed!');
    console.log(err);
  });

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});