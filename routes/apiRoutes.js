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
      $push:
      {
        exercises:req.body
      }
    })
  .then(workoutdb => {
      res.json(workoutdb);
  })
  .catch(err => {
    res.json(err);
  });
})

// GET Request w/Range (With a 7 workout limit)
// Additional mongodb/mongoose references on $sum, $addFields,aggregate & references via MDN docs for .setDate & .getDate
router.get("/api/workouts/range", (req, res) => {
  //  new date model
let range = new Date();
range.setDate(range.getDate()-7);
// Today -7
// .setDate: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setDate
// .getDate: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDate
  Workout.aggregate(
    // Aggregate: https://mongoosejs.com/docs/api.html#aggregate_Aggregate
    [
    {$match: 
      {day: 
        {$gt: range}
      }
    },
    {$addFields: 
      // $addFields: https://docs.mongodb.com/manual/reference/operator/aggregation/addFields/
      {totalDuration: 
        {$sum: '$exercises.duration'}
        // $sum: https://docs.mongodb.com/manual/reference/operator/aggregation/sum/
      }
    }
  ])
  .then(workoutdb => {
      res.json(workoutdb);
  })
  .catch(err => {
    res.json(err);
  });
});

module.exports = router;