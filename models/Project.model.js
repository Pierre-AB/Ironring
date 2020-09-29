const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  uploader_id:{type: Schema.Types.ObjectId, ref: 'User'}, // vérifier la ref
  owners_id: [String], // push rec.body.co-users_mail,
  owners_mail: [String], 
  course: {  // "webdev"
    type: String,
    required: [true, 'course is required.']
  },
  module: { // "1, js"
    type: String,
    required: [true, 'The module is required.']
  },
  campus: { //'London'
    type: String,
    required: [true, 'The campus is required.']
  },
  img: { 
    type: [String],
    required: [true, 'img is required.']
  },
  name: { //'IronSecurity'
    type: String,
    required: [true, 'Your project name is required.']
  },
  description: { //project description
    type: String,
    required: [true, 'The description is required.']
  },
  theme: {
    type: String,
    required: [true, 'The theme is required.']
  },
  year_creation: {
    type: String,
    required: [true, 'The year of creation is required.']
  },
  techno: {
    type: [String],
    required: [true, 'The techno of creation is required.']
  },
  url: {
    type: String,
    required: [true, 'The url of creation is required.']
  },
  github: String,
  rank: Number,
  likes: [{type: Schema.Types.ObjectId, ref: 'User'}]
}, 
{
  timestamps: true
})

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;