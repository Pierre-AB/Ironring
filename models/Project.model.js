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
    enum: ['Front', 'Back', 'React']
  },
  campus: {
    type: String,
    enum: ['Amsterdam', 'Barcelona', 'Berlin', 'Lisboa', 'Madrid', 'Mexico', 'Miami', 'Paris', 'Remote', 'Sao_Paulo']
  },
  imageUrl: { 
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
    enum: ['game', 'monsters']
  },
  year_creation: {
    type: String,
    required: [true, 'The year of creation is required.']
  },
  techno: {
    type: [String],
    enum: ['HTML', 'CSS', 'CANVAS']
  },
  url: {
    type: String,
    required: [true, 'The url of creation is required.']
  },
  github: String,
  rank: {
    type: String,
    enum: ['1', '2', '3']
  },
  likes: [{type: Schema.Types.ObjectId, ref: 'User'}]
}, 
{
  timestamps: true
})

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;