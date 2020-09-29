const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const User = require('../models/User.model');
const mongoose = require('mongoose');

// //Install and use jQuery
// var jsdom = require("jsdom");
// const { JSDOM } = jsdom;
// const { window } = new JSDOM();
// const { document } = (new JSDOM('')).window;
// global.document = document;
// var $ = jQuery = require('jquery')(window);

// ROUTE GUARD TO ADD

//PICTURE UPLOADER TO ADD

//  ######  ####  ######   ##    ##    ##     ## ########  
// ##    ##  ##  ##    ##  ###   ##    ##     ## ##     ## 
// ##        ##  ##        ####  ##    ##     ## ##     ## 
//  ######   ##  ##   #### ## ## ##    ##     ## ########  
//       ##  ##  ##    ##  ##  ####    ##     ## ##        
// ##    ##  ##  ##    ##  ##   ###    ##     ## ##        
//  ######  ####  ######   ##    ##     #######  ##        


// GET -> Sign Up page
router.get('/signup', (req, res, next) => res.render('auth/signup'));

router.post('/signup', (req, res, next) => { /*uploader to add*/
  // const { email, password, ironhacker } = req.body;
  const { email, password, ironhacker, firstName, lastName, expertise, campus, courses, profileImgSrc } = req.body;


  if (!email || !password) {
    res.render('auth/signup', { errorMessage: 'All Fields are mandatory.' });
    return;
  }
  // Strong password validation
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(password)) {
    // res.status(500) ????? A QUOI CELA SERT ???
    res.render('auth/signup', { errorMessage: 'Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.' })
    return;
  }

  if (ironhacker === 'true') { //WARNING: Uploader not set-up yet
    //Hash password and create User (specific variables)
    bcryptjs.genSalt(saltRounds)
      .then(salt => bcryptjs.hash(password, salt))
      .then(hashedPassword => {
        return User.create({
          email,
          passwordHash: hashedPassword,
          firstName,
          lastName,
          expertise,
          campus,
          courses
          // profileImgSrc //WARNING: Uploader not set up yet.
        })
      })
      .then(userFromDB => {
        console.log('🙌🏻 IRONHACKER CREE =', userFromDB);
        // res.redirect('/userProfile'); //DEFINE VIEW NAME
        return;
      })
      .catch(error => {
        console.log('💥 IRONHACKER ERROR =', error);
        return;
      })
  }
  if (ironhacker != 'true') {
    //   // JUST A VISITOR
    console.log('Just a visitor');
    //Factoring?
    bcryptjs.genSalt(saltRounds)
      .then(salt => bcryptjs.hash(password, salt))
      .then(hashedPassword => {
        return User.create({
          email,
          passwordHash: hashedPassword,
        })
      })
      .then(userFromDB => {
        console.log('🙌🏻 VISITOR CREE =', userFromDB);
        return;
      })
      .catch(error => {
        console.log('💥 VISITOR ERROR =', error);
        return;
      })
  }

  // ADD RECRUITER THERE WHETHER WE KEEP IT WITH A NEW IF



})






module.exports = router;