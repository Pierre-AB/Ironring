const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  // uploader_id:{type: Schema.Types.ObjectId, ref: 'User'}, // vérifier la ref
  uploader_id: String, // OFF VIEW
  owners_id: [String], // push rec.body.co-users_mail, // OFF VIEW
  owners_mail: [String], // OFF VIEW
  course: String, // OFF VIEW
  module: { // "1, js" // ON VIEW
    type: String,
    enum: ['1', '2', '3', 'Personal']
  },
  campus: String, // OFF VIEW
  imageUrl: { // ON VIEW -> Multiple images = bonus
    type: [String],
    required: [true, 'img is required.']
  },
  name: { //'IronSecurity' // ON VIEW
    type: String,
    // required: [true, 'Your project name is required.']
  },
  description: { //project description // ON VIEW
    type: String,
    required: [true, 'The description is required.']
  },
  year_creation: { // ON VIEW
    type: Number,
    required: [true, 'The year of creation is required.']
  },
  techno: { // ON VIEW
    type: [String],
    // enum: ['HTML', 'CSS', 'JS', 'EXPRESS', 'MONGODB', 'REACT']
  },
  url: { // ON VIEW
    type: String,
    required: [true, 'The url of creation is required.']
  },
  github: String, // ON VIEW
  rank: {
    type: String,
    enum: ['1st', '2nd', '3rd', 'not_ranked']
  },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }] // ON VIEW
},
  {
    timestamps: true
  })

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;