const express = require('express')
const router  = express.Router();

const Project = require('../models/Project.model');
const User = require('../models/User.model');
const fileUploader = require('../configs/cloudinary.config.js');

/*
 _______                                                     __               
|       \                                                   |  \              
| $$$$$$$\  ______    ______       __   ______    _______  _| $$_     _______ 
| $$__/ $$ /      \  /      \     |  \ /      \  /       \|   $$ \   /       \
| $$    $$|  $$$$$$\|  $$$$$$\     \$$|  $$$$$$\|  $$$$$$$ \$$$$$$  |  $$$$$$$
| $$$$$$$ | $$   \$$| $$  | $$    |  \| $$    $$| $$        | $$ __  \$$    \ 
| $$      | $$      | $$__/ $$    | $$| $$$$$$$$| $$_____   | $$|  \ _\$$$$$$\
| $$      | $$       \$$    $$    | $$ \$$     \ \$$     \   \$$  $$|       $$
 \$$       \$$        \$$$$$$__   | $$  \$$$$$$$  \$$$$$$$    \$$$$  \$$$$$$$ 
                            |  \__/ $$                                        
                             \$$    $$                                        
                              \$$$$$$                                         
*/ 

router.get('/projects/:id/edit', (req, res, next) => {
  Project.findById(req.params.id).then(projectFromDb => {
    User.find().then(usersFromDb => {

      // parcours tous les users de la database pour vérifier qui a développé le projet 
      // usersFromDb.forEach((user, i) => {
      //   if (projectFromDb.user.includes(user.id)) {
      //     user.selected = true
      //   }
      // })

      res.render('projects/project-edit', {   //// vérifier le nom du fichier hbs
        project: projectFromDb,
        users: usersFromDb
      })
    }).catch(err => next(err))

    
  }).catch(err => next(err))
  
})

router.post('/projects/:id/edit', fileUploader.single('image'), (req, res, next) => {

  const { owners_id, owners_mail, course, module, campus, name, description, theme, year_creation, techno, url, github, rank, likes  } = req.body;
  
  let imageUrl;
  if (req.file) {
    imageUrl = req.file.path;
  } else {
    imageUrl = req.body.existingImage;
  }
  console.log(req.session.currentUser)
  Project.findByIdAndUpdate(req.params.id, {
    owners_mail, 
    course,
    module,
    campus,
    imageUrl,
    name, 
    description, 
    theme, 
    year_creation, 
    techno, 
    url, 
    github, 
    rank, 
    likes
  }, {new: true}).then(updatedProject => {
    console.log('title', updatedProject.title)
    res.redirect(`/projects/${updatedProject.id}`)
  }).catch(err => next(err))
})

router.get('/projects/new', (req, res, next) => {
  User.find({}).then(usersFromDb => {
    res.render('projects/project-new', {   //// vérifier le nom du fichier hbs
      users: usersFromDb 
    })
  }).catch(err => next(err))

  
})

router.post('/projects/new', fileUploader.single('image'), (req, res, next) => {
  const {uploader_id, owners_id, owners_mail, course, module, campus, imageUrl, name, description, theme, year_creation, techno, url, github, rank, likes  } = req.body;
  Project.create({
    uploader_id: req.session.currentUser._id,
    owners_id,
    owners_mail: req.session.currentUser.email,
    course, 
    module, 
    campus, 
    imageUrl: req.file.path, 
    name, 
    description, 
    theme, 
    year_creation, 
    techno, 
    url, 
    github, 
    rank: rank || undefined, 
    likes: likes || undefined
  }).then(newProject => {
    res.redirect(`/projects/${newProject.id}`);
  }).catch(err => {
    next(err);
  });

})

router.get('/projects', (req, res, next) => {
  console.log('user: 🤑', req.session.currentUser)
  Project.find({})
    .then((allProjectsFromDb) => {
      //
      res.render('projects/projects-list', { //// vérifier le nom du fichier hbs
        projects: allProjectsFromDb
      })
    })
    .catch(err => {
      console.log('💥', err)
      next(err); // 
    })
})

router.get('/projects/:id', (req, res, next) => {
  const id = req.params.id
  
  Project.findOne({_id: id})
    .populate('user') //vérifier nom
    .then((project) => {
      console.log('project 🤠', project.uploader_id, 'user 🙄', req.session.currentUser)
      if (project.uploader_id === req.session.currentUser._id) {
        var userIsUploader = true
        console.log("👻")
        res.render('projects/project-details', {
          project: project,
          userIsUploader
        })
      }
      res.render('projects/project-details', {
        project: project,
        userIsUploader
      })
    })
    .catch(err => {
      console.log('boom', err);
      next(err);
    })
})

router.post('/projects/:id/delete', (req, res, next) => {
  // 
  Project.findByIdAndDelete(req.params.id).then(() => {
    res.redirect('/projects')
  }).catch(err => next(err))

})

module.exports = router;


