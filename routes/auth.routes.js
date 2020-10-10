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

router.post("/signup", uploader.single('image'),(req, res, next) => {


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
        profileImgSrc: req.file.path
      });
    })
    .then((userFromDB) => {
      console.log("🙌🏻 USER CREATED =", userFromDB);
      req.session.currentUser = userFromDB;
      res.redirect('/userProfile'); //REDIRECT ON ROUTEGUARD 
      //PROBABLY REDIRECT ON PROJECTS VIEW WITH ALL FILTERS AVAILABLE
      return;
    })
    .catch((error) => {
      console.log("💥 USER ERROR =");
      res.render('auth/login', { errorMessage: "Please login - email is already existing" });

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
        res.redirect('/userProfile');
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

//GET -> USER EDIT
router.get('/userEdit', routeGuard, (req, res) => {
  res.render('users/user-edit', { user: req.session.currentUser });
});

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
    // profileImgSrc, CHANGE PROFILE IMAGE
  } = req.body;

  let profileImgSrc;
  if (req.file) {
    profileImgSrc = req.file.path;
  } else {
    profileImgSrc = req.body.existingImage;
  }

  User.findByIdAndUpdate(req.session.currentUser._id, {
    email,
    // password,
    ironhacker,
    profileImgSrc,
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
