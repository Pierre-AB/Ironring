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
    courses,
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
      errorMessage:
        "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.",
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
    - courses
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
    if (!courses) {
      res.render("auth/signup", {
        errorMessage: "Please enter your courses ?",
      });
    }
  } else {
    //   // JUST A VISITOR

    console.log("👍 Just a visitor");
    //Factoring?
  }

  // genSaltSync  hqshSync
  bcryptjs
    .genSalt(saltRounds)
    .then((salt) => bcryptjs.hash(password, salt))
    .then((hashedPassword) => {
      return User.create({
        email,
        passwordHash: hashedPassword,
        firstName: firstName, // ""
        lastName, // ""
        expertise,
        campus: campus || undefined,
        courses: courses || undefined,
        // profileImgSrc //WARNING: Uploader not set up yet.
      });
    })
    .then((userFromDB) => {
      console.log("🙌🏻 USER CREATED =", userFromDB);
      // res.redirect('users/userProfile'); //DEFINE VIEW NAME
      return;
    })
    .catch((error) => {
      console.log("💥 USER ERROR =", error);
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
        console.log("USER===", user)
        req.session.currentUser = user;
        res.render('/userProfile');
      } else {
        res.render('auth/login', { errorMessage: 'Incorrect password.' });
      }
    })
    .catch(error => next(error))

})


// ##        #######   ######    #######  ##     ## ######## 
// ##       ##     ## ##    ##  ##     ## ##     ##    ##    
// ##       ##     ## ##        ##     ## ##     ##    ##    
// ##       ##     ## ##   #### ##     ## ##     ##    ##    
// ##       ##     ## ##    ##  ##     ## ##     ##    ##    
// ##       ##     ## ##    ##  ##     ## ##     ##    ##    
// ########  #######   ######    #######   #######     ##    


router.post('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

router.get('/userProfile', routeGuard, (req, res) => {
  res.render('users/user-profile');
});


module.exports = router;
