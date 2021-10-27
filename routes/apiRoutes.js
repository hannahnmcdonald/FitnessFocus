const router = require('express').Router();
const Workout = require('../models/Workout.js');

router.post('/api/workouts', (req, res) => {
  Workout.create({})
    .then((workoutdb) => {
      res.json(workoutdb);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/api/workouts", (req, res) => {
  Workout.find({})
  .then(workoutdb => {
      res.json(workoutdb);
  })
  .catch(err => {
    res.json(err);
  });
})

module.exports = router;