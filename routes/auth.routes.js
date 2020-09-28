const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const User = require('../models/User.model');
const mongoose = require('mongoose');

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

router.post('/signup', /*uploader to add*/(req, res, next) => {
  const { email, password, ironhacker } = req.body;
  if (!email || !password) {
    res.render('auth/signup', { errorMessage: 'All Fields are mandatory.' })
  }

  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(password)) {
    res.status(500)
      .render('auth/signup', { errorMessage: 'Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.' })
    return
  }

  if (ironhacker) { //WARNING: Uploader not set-up yet
    //Specific variables for Ironhacker model
    const { firstName, lastName, expertise, campus, profileImgSrc } = req.body;

    //Hash password and create User (specific variables)
    bcryptjs.genSalt(saltRounds)
      .then(salt => bcryptjs.hash(password, salt))
      .then(hashedPassword => {
        return User.create({
          username,
          email,
          passwordHash: hashedPassword,
          firstName,
          lastName,
          expertise,
          campus,
          profileImgSrc //WARNING: Uploader not set up yet.
        })
      })
      .then(userFromDB => {
        console.log('🙌🏻 IRONHACKER CREE =', userFromDB);
        res.redirect('/userProfile'); //DEFINE VIEW NAME
      })
      .catch(error => {
        console.log('💥 IRONHACKER ERROR =', error);
        return;
      })
  }
  if (!ironhacker) {
    // JUST A VISITOR
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
      })
      .catch(error => {
        console.log('💥 VISITOR ERROR =', error);
        return;
      })
  }

  // ADD RECRUITER THERE WHETHER WE KEEP IT WITH A NEW IF



})



module.exports = router;