const express = require('express');
const mongoose = require('mongoose');
// Require Routes
const apiRoute = require("./routes/apiRoutes");
const htmlRoute = require("./routes/htmlRoutes");
// morgan dependency
const logger = require('morgan');

// Port
const PORT = 3001;

const app = express();
// Use logger
app.use(logger('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

mongoose.connect('mongodb://localhost/workout', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// routes
app.use(htmlRoute);
app.use(apiRoute);

// Listening
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});