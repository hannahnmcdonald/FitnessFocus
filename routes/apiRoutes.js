const router = require('express').Router();
const Workout = require('../models/Workout.js');

// POST Request
router.post('/api/workouts', (req, res) => {
  Workout.create({})
    .then((workoutdb) => {
      res.json(workoutdb);
    })
    .catch((err) => {
      res.json(err);
    });
});

// GET Request
router.get("/api/workouts", (req, res) => {
  Workout.find({})
  .then(workoutdb => {
      res.json(workoutdb);
  })
  .catch(err => {
    res.json(err);
  });
})

// TO DO: PUT Request (findOneAndUpdate)

// TO DO: GET Request w/Range (With a limit)

module.exports = router;