import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['strength', 'cardio', 'flexibility'],
    required: true
  },
  duration: {
    type: Number,
    required: true 
  },
  exercises: [
    {
      name: String,
      reps: Number,
      sets: Number,
      duration: Number // duration for time-based exercises
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Workout', workoutSchema);
