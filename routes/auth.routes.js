const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const saltRounds = 10;
const User = require("../models/User.model");
const mongoose = require("mongoose");
const uploader = require('../configs/cloudinary.config'); //pour ajouter l'image dans l'edit du profile

// ROUTE GUARD
const routeGuard = require('../configs/route-guard.config');

// UPLOADER


// ########     ###    ########     ###    ##     ##  ######     ########  ########   #######  ######## #### ##       ######## 
// ##     ##   ## ##   ##     ##   ## ##   ###   ### ##    ##    ##     ## ##     ## ##     ## ##        ##  ##       ##       
// ##     ##  ##   ##  ##     ##  ##   ##  #### #### ##          ##     ## ##     ## ##     ## ##        ##  ##       ##       
// ########  ##     ## ########  ##     ## ## ### ##  ######     ########  ########  ##     ## ######    ##  ##       ######   
// ##        ######### ##   ##   ######### ##     ##       ##    ##        ##   ##   ##     ## ##        ##  ##       ##       
// ##        ##     ## ##    ##  ##     ## ##     ## ##    ##    ##        ##    ##  ##     ## ##        ##  ##       ##       
// ##        ##     ## ##     ## ##     ## ##     ##  ######     ##        ##     ##  #######  ##       #### ######## ######## 


//ROUTE TO DISPLAY CREATOR PROFILE PAGE

router.get('/creatorProfile/:id', (req, res, next) => {
  const id = req.params.id;
  console.log('🥶', id);
  User.findById(id).then(creator => {
    const creatorCourses = userCourses(creator);
    console.log("CREATOR===", creator)
    res.render('users/creator-profile', { creator, ...creatorCourses });
  }).catch(err => next(err));
});



// PICTURE UPLOADER TO ADD

//  ######  ####  ######   ##    ##    ##     ## ########
// ##    ##  ##  ##    ##  ###   ##    ##     ## ##     ##
// ##        ##  ##        ####  ##    ##     ## ##     ##
//  ######   ##  ##   #### ## ## ##    ##     ## ########
//       ##  ##  ##    ##  ##  ####    ##     ## ##
// ##    ##  ##  ##    ##  ##   ###    ##     ## ##
//  ######  ####  ######   ##    ##     #######  ##

// GET -> Sign Up page
router.get("/signup", (req, res, next) => res.render("auth/signup"));

router.post("/signup", uploader.single('image'), (req, res, next) => {


  /*uploader to add*/


  // const { email, password, ironhacker } = req.body;
  const {
    email,
    password,
    ironhacker,
    firstName,
    lastName,
    expertise,
    campus,
    course,
    profileImgSrc,
  } = req.body;

  if (!email || !password) {
    res.render("auth/signup", { errorMessage: "All Fields are mandatory." });
    return;
  }
  // Strong password validation
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(password)) {
    res.render("auth/signup", {
      errorMessage: "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.",
      values: {
        email, ironhacker: ironhacker === "true" ? true : false

        , firstName, lastName, expertise, campus, course
      }
    });
    return;
  }

  if (ironhacker === "true") {
    //WARNING: Uploader not set-up yet
    //Hash password and create User (specific variables)
    /*  Need to verify:
    - firstname
    - lastname
    - expertise
    - campus
    - course
*/
    if (!firstName) {
      res.render("auth/signup", {
        errorMessage: "Please enter your Firstname",
        //STOCKAGE TEMPORAIRE ??
      });
    }

    if (!lastName) {
      res.render("auth/signup", { errorMessage: "Please enter your Lastname" });
    }
    if (!campus) {
      res.render("auth/signup", { errorMessage: "Please enter your campus ?" });
    }
    if (!course) {
      res.render("auth/signup", {
        errorMessage: "Please enter your course ?",
      });
    }
  } else {
    //   // JUST A VISITOR
    console.log("👍 Just a visitor");

  }

  // Encryption for user password
  bcryptjs
    .genSalt(saltRounds)
    .then((salt) => bcryptjs.hash(password, salt))
    .then((hashedPassword) => {
      return User.create({
        email,
        passwordHash: hashedPassword,
        ironhacker,
        firstName: firstName, // ""
        lastName, // ""
        expertise,
        campus: campus || undefined,
        course: course || undefined,
        // profileImgSrc: req?.file?.path || ''    // à voir avec Antoine
        profileImgSrc: req.file && req.file.path || 'https://res.cloudinary.com/dbsnbga7z/image/upload/v1602320361/Ironring/Profile.png.png'
      });
    })
    .then((userFromDB) => {
      console.log("🙌🏻 USER CREATED =", userFromDB);
      req.session.currentUser = userFromDB;
      res.redirect('/projects'); //REDIRECT ON ROUTEGUARD   //changed by Gonzalo 
      //PROBABLY REDIRECT ON PROJECTS VIEW WITH ALL FILTERS AVAILABLE
      return;
    })
    .catch((error) => {
      console.log("💥 USER ERROR =", error);
      res.render('auth/login', { errorMessage: "Please login - email is already existing" });
      next(error);
      return;
    });

  // ADD RECRUITER THERE WHETHER WE KEEP IT WITH A NEW IF
});

// ##        #######   ######   #### ##    ##
// ##       ##     ## ##    ##   ##  ###   ##
// ##       ##     ## ##         ##  ####  ##
// ##       ##     ## ##   ####  ##  ## ## ##
// ##       ##     ## ##    ##   ##  ##  ####
// ##       ##     ## ##    ##   ##  ##   ###
// ########  #######   ######   #### ##    ##


router.get('/login', (req, res) => res.render('auth/login'));

router.post('/login', (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.render('auth/login', {
      errorMessage: 'Please enter both, email and passwors to login.'
    });
    return;
  }

  User.findOne({ email })
    .then(user => {
      if (!user) {
        res.render('auth/login', { errorMessage: "Email not found. Try with another email" });
        return;
      } else if (bcryptjs.compareSync(password, user.passwordHash)) {
        req.session.currentUser = user;
        console.log('REQ.SESSION.USER===', user);
        res.redirect('/projects');
      } else {
        res.render('auth/login', { errorMessage: 'Incorrect password.' });
      }
    })
    .catch(error => next(error))

})

// ######## ########  #### ######## 
// ##       ##     ##  ##     ##    
// ##       ##     ##  ##     ##    
// ######   ##     ##  ##     ##    
// ##       ##     ##  ##     ##    
// ##       ##     ##  ##     ##    
// ######## ########  ####    ##


// FUNCTION - TEST THE CAMPUS OF THE USER
function userCampus(user) {
  // Crée une variable en renvoyant true ou false.
  // Sert au préremplissage du edit-profile.hbs pour preselect option
  var userCampusAmsterdam = user.campus === "Amsterdam";
  var userCampusBarcelona = user.campus === "Barcelona";
  var userCampusBerlin = user.campus === "Berlin";
  var userCampusLisboa = user.campus === "Lisboa";
  var userCampusMadrid = user.campus === "Madrid";
  var userCampusMexico = user.campus === "Mexico";
  var userCampusMiami = user.campus === "Miami";
  var userCampusParis = user.campus === "Paris";
  var userCampusRemote = user.campus === "Remote";
  var userCampusSaoPaulo = user.campus === "Sao_Paulo";

  return {
    userCampusAmsterdam,
    userCampusBarcelona,
    userCampusBerlin,
    userCampusLisboa,
    userCampusMadrid,
    userCampusMexico,
    userCampusMiami,
    userCampusParis,
    userCampusRemote,
    userCampusSaoPaulo
  }
}

function userFormat(user) {
  // Crée une variable en renvoyant true ou false.
  // Sert au préremplissage du edit-profile.hbs pour preselect option
  var userFormatPT = user.campus === "Full-Time";
  var userFormatFT = user.campus === "Part-Time";

  return {
    userFormatPT,
    userFormatFT
  }
}

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


//GET -> USER EDIT
router.get('/userEdit', routeGuard, (req, res, next) => {
  User.find({})
  .then(usersFromDb => {
    const campus = userCampus(req.session.currentUser);
    const courses = userCourses(req.session.currentUser);
    const format = userFormat(req.session.currentUser);
    res.render('users/user-edit', {
    user: req.session.currentUser,
    ...campus,
    ...courses,
    ...format
    })
  })
  .catch(err => next(err))
})


// POST -> USER EDIT
router.post('/userEdit', uploader.single('image'), (req, res) => {

  const {
    email,
    // password, CHANGE PASSWORD FEATURES
    ironhacker,
    firstName,
    lastName,
    expertise,
    campus,
    course,
    gitHub,
    linkedIn,
    promo,
    format
  } = req.body;

  //update image picture


  function editProfileInfos() {
    User.findByIdAndUpdate(req.session.currentUser._id, {
      // email,
      // password,
      ironhacker,
      firstName,
      lastName,
      expertise,
      gitHub,
      linkedIn,
      course,
      promo,
      campus,
      format
    }, { new: true }).then(updatedUser => {
      console.log('USER UPDATED ===', updatedUser)
      res.redirect('/userProfile')
    }).catch(err => next(err));
  }

  if (req.file) {
    User.findById(req.session.currentUser._id).then((user) => {
      user.profileImgSrc = req.file.path;
      user.save()
        .then(
          editProfileInfos()
        ).catch(err => next(err))
    }).catch(err => {
      console.log('PROFILE PICTURE UPDATE FAILED', err);
      next(err)
    })
  } else {
    editProfileInfos();
  }


  // User.findById(req.session.currentUser._id).then((user) => {
  //   if (ironhacker != user.ironhacker) {
  //     user.ironhacker = ironhacker;
  //   }
  //   if (req.file != user.profileImgSrc) {
  //     user.profileImgSrc = profileImgSrc;
  //   }
  //   if (firstName != user.firstName) {
  //     user.firstName = firstName;
  //   }
  //   if (lastName != user.lastName) {
  //     user.lastName = lastName;
  //   }
  //   if (expertise != user.expertise) {
  //     user.expertise = expertise;
  //   }
  //   if (gitHub != user.gitHub) {
  //     user.gitHub = gitHub;
  //   }
  //   if (linkedIn != user.linkedIn) {
  //     user.linkedIn = linkedIn;
  //   }
  //   if (course != user.course) {
  //     user.course = course;
  //   }
  //   if (promo != user.promo) {
  //     user.promo = promo;
  //   }
  //   if (campus != user.campus) {
  //     user.campus = campus;
  //   }
  //   if (format != user.format) {
  //     user.format = format;
  //   }


  //   user.save().then((updatedUser) => {
  //     console.log('USER UPDATED ===', updatedUser)
  //     res.redirect('/userProfile')
  //   }).catch(err => {
  //     console.log('UPDATED USER NOT SAVED ===', err);
  //     next(err);
  //   })
  // }).catch(err => {
  //   console.log('USER UPDATE FAILED===', err);
  //   next(err);
  // });

});








// ##     ## ##    ##         ########  ########   #######        ## ########  ######  ########  ######  
// ###   ###  ##  ##          ##     ## ##     ## ##     ##       ## ##       ##    ##    ##    ##    ## 
// #### ####   ####           ##     ## ##     ## ##     ##       ## ##       ##          ##    ##       
// ## ### ##    ##    ####### ########  ########  ##     ##       ## ######   ##          ##     ######  
// ##     ##    ##            ##        ##   ##   ##     ## ##    ## ##       ##          ##          ## 
// ##     ##    ##            ##        ##    ##  ##     ## ##    ## ##       ##    ##    ##    ##    ## 
// ##     ##    ##            ##        ##     ##  #######   ######  ########  ######     ##     ######  


//FAIRE UNE ROUTE PARAM

router.get('/myProjects', routeGuard, (req, res, next) => {
  res.render('users/user-projects', { user: req.session.currentUser });
})



// ##        #######   ######    #######  ##     ## ######## 
// ##       ##     ## ##    ##  ##     ## ##     ##    ##    
// ##       ##     ## ##        ##     ## ##     ##    ##    
// ##       ##     ## ##   #### ##     ## ##     ##    ##    
// ##       ##     ## ##    ##  ##     ## ##     ##    ##    
// ##       ##     ## ##    ##  ##     ## ##     ##    ##    
// ########  #######   ######    #######   #######     ##    

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

// router.post('/logout', (req, res) => {
//   req.session.destroy();
//   res.redirect('/');
// });

//ROUTEGUARD INCLUDED

router.get('/userProfile', routeGuard, (req, res) => {
  if (req.session.currentUser._id) {
    res.render('users/user-profile', { user: req.session.currentUser });
  }

});






module.exports = router;