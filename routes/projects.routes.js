const express = require('express')
const router = express.Router();

const Project = require('../models/Project.model');
const User = require('../models/User.model');
const fileUploader = require('../configs/cloudinary.config.js');
const routeGuard = require('../configs/route-guard.config.js');
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

/***
 *     ######   ##        #######  ########     ###    ##       
 *    ##    ##  ##       ##     ## ##     ##   ## ##   ##       
 *    ##        ##       ##     ## ##     ##  ##   ##  ##       
 *    ##   #### ##       ##     ## ########  ##     ## ##       
 *    ##    ##  ##       ##     ## ##     ## ######### ##       
 *    ##    ##  ##       ##     ## ##     ## ##     ## ##       
 *     ######   ########  #######  ########  ##     ## ######## 
 */

// FUNCTION - TEST THE COURSE OF THE USER
function userCourses(user) {
  var courseWebDev;
  if (user.course === "Web-Dev") {
    courseWebDev = true;
  }

  var courseUX;
  if (user.course === "UX/UI") {
    courseUX = true;
  }

  // Renvoie true or undefined
  var courseData;
  if (user.course === "Data") {
    courseData = true;
  }

  // Permet de renvoyer forcément true ou false
  var courseCyber = user.course === "Cyber_Security";

  return {
    courseWebDev,
    courseUX,
    courseData,
    courseCyber
  }
}


// ######## ########  #### ########               ########  ########   #######        ## ########  ######  ######## 
// ##       ##     ##  ##     ##                  ##     ## ##     ## ##     ##       ## ##       ##    ##    ##    
// ##       ##     ##  ##     ##                  ##     ## ##     ## ##     ##       ## ##       ##          ##    
// ######   ##     ##  ##     ##       #######    ########  ########  ##     ##       ## ######   ##          ##    
// ##       ##     ##  ##     ##                  ##        ##   ##   ##     ## ##    ## ##       ##          ##    
// ##       ##     ##  ##     ##                  ##        ##    ##  ##     ## ##    ## ##       ##    ##    ##    
// ######## ########  ####    ##                  ##        ##     ##  #######   ######  ########  ######     ##    

// GET -> SINGLE PROJECT EDIT

router.get('/projects/:id/edit', (req, res, next) => {
  // Permet de renvoyer forcément true ou false  
  if (req.session.currentUser.projects.includes(req.params.id)) {
    var courseCyber = req.session.currentUser.course === "Cyber_Security";
    var courseWebDev = req.session.currentUser.course === "Web-Dev";
    var courseUX = req.session.currentUser.course === "UX/UI";
    var courseData = req.session.currentUser.course === "Data";


    Project.findById(req.params.id).then(projectFromDb => {
      if (req.session.currentUser._id != projectFromDb.uploader_id) {
        res.redirect(`/projects/${projectFromDb._id}`);
        console.log('😭');
        return;
      }
      User.find().then(usersFromDb => {
        console.log('user', req.session.currentUser)

        var courseWebDev;
        if (req.session.currentUser.course === "Web-Dev") {
          courseWebDev = true;
          console.log("🤖 we have a future web dev here !!")
        }

        var courseUX;
        if (req.session.currentUser.course === "UX/UI") {
          courseUX = true;
        }

        // Renvoie true or undefined
        var courseData;
        if (req.session.currentUser.course === "Data") {
          courseData = true;
        }

        // parcours tous les users de la database pour vérifier qui a développé le projet 
        // usersFromDb.forEach((user, i) => {
        //   if (projectFromDb.user.includes(user.id)) {
        //     user.selected = true
        //   }
        // })


        res.render('projects/project-edit', {   //// vérifier le nom du fichier hbs
          project: projectFromDb,
          users: usersFromDb,
          courseWebDev,
          courseUX,
          courseData
        })
      }).catch(err => next(err))


    }).catch(err => next(err))
  } else {
    res.redirect(`/projects/${req.params.id}`)
  }
})

// POST -> SINGLE PROJECT EDIT

router.post('/projects/:id/edit', fileUploader.single('image'), (req, res, next) => {

  const { owners_id, owners_mail, course, module, campus, name, description, year_creation, techno, url, github, rank, likes } = req.body;

  let imageUrl;
  if (req.file) {
    imageUrl = req.file.path;
  } else {
    imageUrl = req.body.existingImage;
  }
  // console.log(req.session.currentUser)
  Project.findByIdAndUpdate(req.params.id, {
    owners_mail,
    course,
    module,
    campus,
    imageUrl,
    name,
    description,
    year_creation,
    techno,
    url,
    github,
    rank,
    likes
  }, { new: true }).then(updatedProject => {
    console.log('title', updatedProject.title)
    res.redirect(`/projects/${updatedProject.id}`)
  }).catch(err => next(err))
})



// ##    ## ######## ##      ##               ########  ########   #######        ## ########  ######  ######## 
// ###   ## ##       ##  ##  ##               ##     ## ##     ## ##     ##       ## ##       ##    ##    ##    
// ####  ## ##       ##  ##  ##               ##     ## ##     ## ##     ##       ## ##       ##          ##    
// ## ## ## ######   ##  ##  ##    #######    ########  ########  ##     ##       ## ######   ##          ##    
// ##  #### ##       ##  ##  ##               ##        ##   ##   ##     ## ##    ## ##       ##          ##    
// ##   ### ##       ##  ##  ##               ##        ##    ##  ##     ## ##    ## ##       ##    ##    ##    
// ##    ## ########  ###  ###                ##        ##     ##  #######   ######  ########  ######     ##    


// GET - NEW PROJECT CREATION
router.get('/projects/new', (req, res, next) => {
  User.find({})
    .then(usersFromDb => {
      console.log('user', req.session.currentUser)

      const courses = userCourses(req.session.currentUser)

      res.render('projects/project-new', {   //// vérifier le nom du fichier hbs
        users: usersFromDb,
        ...courses
      })

    })
    .catch(err => next(err))
})


// POST -> NEW PROJECT CREATION
router.post('/projects/new', fileUploader.single('image'), (req, res, next) => {

  const { uploader_id, owners_id, owners_mail, course, module, campus, imageUrl, name, description, year_creation, techno, url, github, rank, likes } = req.body;
  const courses = userCourses(req.session.currentUser)

  if (!name) {
    res.render("projects/project-new", { errorMessage: "Please enter your project's name", ...courses },
    );
    return
  }

  if (!description) {
    res.render("projects/project-new", { errorMessage: "Please describe your project", ...courses });
    return
  }

  if (!year_creation) {
    res.render("projects/project-new", { errorMessage: "Please enter the year when it was created", ...courses });
    return
  }

  if (!module) {
    res.render("projects/project-new", { errorMessage: "Please enter select your module", ...courses });
    return
  }

  // if (!techno) {
  //   res.render("projects/project-new", { errorMessage: "Please select at least one techno"});
  //   return
  // }

  if (!rank) {
    res.render("projects/project-new", { errorMessage: "Please select your project's ranking", ...courses });
    return
  }

  if (!url && !github) {
    res.render("projects/project-new", { errorMessage: "Please enter at least your github or your URL", ...courses });
    return
  }

  if (!imageUrl) {
    res.render("projects/project-new", { errorMessage: "Please add an image", ...courses });
    return
  }  



  Project.create({
    uploader_id: req.session.currentUser._id,
    owners_id,
    owners_mail: req.session.currentUser.email,
    course: req.session.currentUser.course,
    module,
    campus: req.session.currentUser.campus,
    imageUrl: req.file && req.file.path || undefined,
    name,
    description,
    year_creation,
    techno,
    url,
    github,
    rank: rank || undefined,
    likes: likes || undefined
  }).then(newProject => {
    console.log('PROJECT ID=', newProject.id)

    User.findById(req.session.currentUser._id)
      .then(user => {
        user.projects.push(newProject.id);
        console.log('USER PROJECT LIST===', user.projects);
        user.save().then(userSaved => { console.log('PROJECT ADDED TO USER', userSaved) }).catch(err => next(err))
      })
      .catch(err => next(err))
    res.redirect(`/projects/${newProject.id}`);
  }).catch(err => {
    next(err);
  });

})


//    ###    ##       ##                     ########  ########   #######        ## ########  ######  ########  ######  
//   ## ##   ##       ##                     ##     ## ##     ## ##     ##       ## ##       ##    ##    ##    ##    ## 
//  ##   ##  ##       ##                     ##     ## ##     ## ##     ##       ## ##       ##          ##    ##       
// ##     ## ##       ##          #######    ########  ########  ##     ##       ## ######   ##          ##     ######  
// ######### ##       ##                     ##        ##   ##   ##     ## ##    ## ##       ##          ##          ## 
// ##     ## ##       ##                     ##        ##    ##  ##     ## ##    ## ##       ##    ##    ##    ##    ## 
// ##     ## ######## ########               ##        ##     ##  #######   ######  ########  ######     ##     ######  

// GET -> ALL PROJECTS 

router.get('/projects', (req, res, next) => {
  console.log('user: 🤑', req.session.currentUser)
  console.log("❓  ", req.query);
  // ---------
  //   var query = {};
  // if(req.query.module) query.module = req.query.module;
  // if(req.query.campus) query.campus = req.query.campus;
  // if(req.query.techno) query.techno = req.query.techno;


  // Project.find(query, function (err, filteredProject) {
  //     if(err) return res.json({status : 500, error : err});
  //     if(!filteredProject) return res.json({status : 404, error : "Project not found"});
  //     return res.json(filteredProject);
  // });   
  // ---------
  Project.find()
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

/*
███████ ██ ██   ████████ ███████ ██████  ███████ 
██      ██ ██      ██    ██      ██   ██ ██      
█████   ██ ██      ██    █████   ██████  ███████ 
██      ██ ██      ██    ██      ██   ██      ██ 
██      ██ ███████ ██    ███████ ██   ██ ███████ 
*/


// GET ONLY FILTERED PROJECTS
router.get('/projects/q', function (req, res) {

  var query = {};
  if (req.query.module) query.module = req.query.module;
  if (req.query.campus) query.campus = req.query.campus;
  if (req.query.techno) query.techno = req.query.techno;
  if (req.query.course) query.course = req.query.course;
  if (req.query.rank) query.rank = req.query.rank;


  console.log("❓❓❓❓  ", req.query);


  // A supprimer, c'est simplement pour retourner de JSON pour tester

  // Project.find(query, function (err, filteredProject) {
  //     if(err) return res.json({status : 500, error : err});
  //     if(!filteredProject) return res.json({status : 404, error : "Project not found"});
  //     return res.json(filteredProject);
  // })

  Project.find(query)
    .then((filteredProject) => {

      // J'ai besoin de marquer le course comme true pour les autres filtres

      var courseWebDevFilter;
      var courseName = req.query.course
      if (req.query.course === "Web-Dev") {
        courseWebDevFilter = true;
        console.log("WE ARE LOOKING FOR PARIS 🗼🇫🇷", filteredProject)
      }
      var courseUXFilter;
      if (req.query.course === "UX/UI") {
        courseUXFilter = true;
      }

      // Renvoie true or undefined
      var courseDataFilter;
      if (req.query.course === "Data") {
        courseDataFilter = true;
      }

      var courseCyberFilter;
      if (req.query.course === "Cyber_Security") {
        courseName = 'Cyber Security'
        courseCyberFilter = true;
      }

      res.render('projects/project-filtered', { //// vérifier le nom du fichier hbs
        filteredProject,
        courseWebDevFilter,
        courseUXFilter,
        courseDataFilter,
        courseCyberFilter,
        courseName
      })
    })
    .catch(err => {
      console.log('💥', err)
      next(err); // 
    })

})







// ########  ######## ########    ###    #### ##        ######             ########  ########   #######        ## ########  ######  ######## 
// ##     ## ##          ##      ## ##    ##  ##       ##    ##            ##     ## ##     ## ##     ##       ## ##       ##    ##    ##    
// ##     ## ##          ##     ##   ##   ##  ##       ##                  ##     ## ##     ## ##     ##       ## ##       ##          ##    
// ##     ## ######      ##    ##     ##  ##  ##        ######     ####### ########  ########  ##     ##       ## ######   ##          ##    
// ##     ## ##          ##    #########  ##  ##             ##            ##        ##   ##   ##     ## ##    ## ##       ##          ##    
// ##     ## ##          ##    ##     ##  ##  ##       ##    ##            ##        ##    ##  ##     ## ##    ## ##       ##    ##    ##    
// ########  ########    ##    ##     ## #### ########  ######             ##        ##     ##  #######   ######  ########  ######     ##    

// router.get('/filters'), (req, res, next) => {
//   console.log('QUERY===', req.query);
// }


// GET -> PROJECT DETAILS

router.get('/projects/:id', routeGuard, (req, res, next) => {
  const id = req.params.id

  Project.findOne({ _id: id })
    .populate('user') //vérifier nom
    .then((project) => {
      var userIsUploader
      console.log('project 🤠', project, 'user 🙄', req.session.currentUser)
      // VALIDATION IF USER
      if (project.uploader_id == req.session.currentUser._id) { // NOT THE SAME FORMAT ????
        userIsUploader = true
        console.log('📤📤📤📤 The current user is the uploader', userIsUploader)
      }
      User.findById(project.uploader_id).then((creator) => {
        res.render('projects/project-details', {
          project: project,
          userIsUploader,
          creator
        })
      }).catch(err => {
        console.log('CREATOR NOT FOUND===', err);
        next(err);
      })
    })
    .catch(err => {
      console.log('PROJECT NOT FOUND', err);
      next(err);
    })
})






// ########  ######## ##       ######## ######## ########               ########  ########   #######        ## ########  ######  ######## 
// ##     ## ##       ##       ##          ##    ##                     ##     ## ##     ## ##     ##       ## ##       ##    ##    ##    
// ##     ## ##       ##       ##          ##    ##                     ##     ## ##     ## ##     ##       ## ##       ##          ##    
// ##     ## ######   ##       ######      ##    ######      #######    ########  ########  ##     ##       ## ######   ##          ##    
// ##     ## ##       ##       ##          ##    ##                     ##        ##   ##   ##     ## ##    ## ##       ##          ##    
// ##     ## ##       ##       ##          ##    ##                     ##        ##    ##  ##     ## ##    ## ##       ##    ##    ##    
// ########  ######## ######## ########    ##    ########               ##        ##     ##  #######   ######  ########  ######     ##    






// POST -> PROJECT DELETE

router.post('/projects/:id/delete', (req, res, next) => {
  // 
  Project.findById(req.params.id).then((projectToDelete) => {

    console.log('PROJECT TO DELETE===', projectToDelete);

    //find the project to delete within the user database.
    User.findById(projectToDelete.uploader_id).then((userToModify) => {
      let indexToDelete = userToModify.projects.indexOf(req.params.id)
      userToModify.projects.splice(indexToDelete, 1);
      userToModify.save().then(
        Project.findByIdAndDelete(projectToDelete._id)
          .then(() => {
            console.log('🙌🏻  DELETE COMPLETE')
            res.redirect('/projects')
          })
          .catch(err => {
            console.log('COULD NOT FIND PROJECT TO DELETE', err)
            next(err)
          })
      ).catch(next);
    }).catch(err => {
      console.log('NO USER PROJECTS DELETION POSSIBLE ===', err)
      next(err)
    })

    //find the the project and delete it


  }).catch(err => {
    console.log("COMPLETE DELETION FAILED", err)
    next(err)
  })

})


// ##       #### ##    ## ########  ######  
// ##        ##  ##   ##  ##       ##    ## 
// ##        ##  ##  ##   ##       ##       
// ##        ##  #####    ######    ######  
// ##        ##  ##  ##   ##             ## 
// ##        ##  ##   ##  ##       ##    ## 
// ######## #### ##    ## ########  ######  


router.post('/likes/:id', (req, res, next) => {
  var projectId = req.params.id

  Project.findById(projectId).then((projectLiked) => {
    User.findById(req.session.currentUser._id).then((liker) => {
      projectLiked.likes.push(liker._id)
      projectLiked.save().then((projectSaved) => {
        res.redirect('back');
      }).catch(err => next(err))
    }).catch(err => next(err))

  }).catch(err => next(err))
})





module.exports = router;


