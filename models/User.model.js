const {
  Schema,
  model
} = require('mongoose');

const userSchema = new Schema(
  {
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
    //EMBEDDED IRONHACKER PROPERTY ? DOES THE REQUIRED FIELD CAN BE CONDITIONAL
    profileImgSrc: String,
    firstName: String,
    lastName: String,
    expertise: String,
    gitHub: String,
    linkedIn: String,
    courses: { type: String, enum: ['Web-Dev', 'UX/UI', 'Data', 'Cyber Security'], required: [true, 'What did you study ?'] },
    promo: String,
    campus: {
      type: String,
      enum: ['Amsterdam', 'Barcelona', 'Berlin', 'Lisboa', 'Madrid', 'Mexico', 'Miami', 'Paris', 'Remote', 'Sao Paulo'],
      required: [true, 'Where was your campus ?']
    },
    format: { type: String, enum: ['Full-Time', 'Part-Time'] }, // PART-TIME OU FULL-TIME
    current_location: String, //WHAT LOCATION ATTRIBUTE IS ABOUT?
    projects: {
      type: Schema.Types.ObjectId,
      ref: 'Project'
    },
    // OBJET DANS OBJET POUR user AND recruiter MODEL REQUIRED FIELD ?
    recruiter: {
      type: Boolean,
    },
    title: {
      type: String,
      required: [true, "What is your current position ?"]
    },
    company: {
      type: String,
      required: [true, "Please enter your company"]
    },
    contact: {
      type: String,
    },
    favorites: [String]
  },
  {
    timestamps: true
  }
);

module.exports = model('User', userSchema);