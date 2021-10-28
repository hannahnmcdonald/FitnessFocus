const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Schema inludes required data like excercise type, name, and duration, as well as extra data like weight, reps, sets, or distance
const workoutSchema = new Schema({
  exercises: [
    {
      type: {
        type: String,
        trim: true,
        required: true,
      },
      name: {
        type: String,
        trim: true,
        required: true,
      },
      duration: {
        type: Number,
        required: true,
      },
      weight: {
        type: Number,
        required: false,
      },
      reps: {
        type: Number,
        required: false,
      },
      sets: {
        type: Number,
        required: false,
      },
      distance: {
        type: Number,
        required: false,
      },
    },
  ],
  day: {
    type: Date,
    default: Date.now,
  },
}, 
// Enabled Virtuals
{
  toJSON: {
    virtuals: true
  },
});

// Added Virtual to create summation of all the exercise durations with the array method: .reduce
workoutSchema.virtual('totalDuration').get(function() {
  return this.exercises.reduce((totalDuration, exercise) => {
    return totalDuration + exercise.duration
  }, 0)
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;