const {
  Schema,
  model
} = require('mongoose');

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
    unique: true,
    lowercase: true,
    trim: true
  },
  passwordHash: {
    type: String,
    required: [true, 'Password is required.']
  },
  ironhacker: {
    type: Boolean,
  },
  profileImgSrc: String,
  firstName: String,
  lastName: String,
  expertise: String,
  gitHub: String,
  linkedIn: String,
  courses: String,
  promo: String,
  campus: {
    type: String,
    enum: ['Amsterdam', 'Barcelona', 'Berlin', 'Lisboa', 'Madrid', 'Mexico', 'Miami', 'Paris', 'Sao Paulo'],
    required: [true, 'Write your campus']
  },
  timing: String, // PART-TIME OU FULL-TIME
  current_location: String, //WHAT LOCATION ATTRIBUTE IS ABOUT?
  projects: {
    type: Schema.Types.ObjectId,
    ref: 'Project'
  },
})

module.exports = model('User', userSchema);