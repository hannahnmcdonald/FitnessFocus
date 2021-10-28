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

// PUT Request (findOneAndUpdate)
router.put("/api/workouts/:id", (req, res) => {
  Workout.findOneAndUpdate(
    {
      _id: req.params.id
    }, 
    {
      // Adds new exercise to the exercise array with push
      $push:{exercises:req.body
      }
    })
  .then(workoutdb => {
      res.json(workoutdb);
  })
  .catch(err => {
    res.json(err);
  });
})

// Limit(7) only retrieves 7 workouts and is not organized by most recent or by date
router.get("/api/workouts/range", (req, res) => {
  Workout.find({})
    .limit(7)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});


module.exports = router;