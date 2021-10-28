const express = require('express');
const mongoose = require('mongoose');
// Require Routes
const apiRoute = require("./routes/apiRoutes");
const htmlRoute = require("./routes/htmlRoutes");
// morgan dependency
const logger = require('morgan');

// Port
const PORT = 3002;

const app = express();
// Use logger
app.use(logger('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

// Connects either to MongoDB Atlas if on heroku site or to the local, if running locally
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/workoutdb',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});

// routes
app.use(htmlRoute);
app.use(apiRoute);

// Listening- Starting the server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});