var express = require('express');
var router = express.Router();
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var db = require('../db');
var secrets = require('../secret/secrets')

// router.get('/google',
//   passport.authenticate('google', { scope: ['openid'] }));

router.post('/google/callback', passport.authenticate('google'),
  (req, res) => {
    res.status(200).end();
  });

router.get('/logout', (req, res) => {
  req.logout();
  // res.redirect('/');
  res.status(200).end();
  // TODO investigate if user really is logged out
  // this will be easier when there is ui for it
});

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
    clientID: secrets.google.clientID,
    clientSecret: secrets.google.clientSecret,
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    db.findOrCreateGoogleUser(profile.id)
      .then(user => done(null, user))
      .catch(err => done(err));
  }
));
passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser((_id, done) => {
  db.findUserByIdString(_id)
    .then(user => {
      if (user) {
        done(null, user);
      } else {
        throw "User deserialization failed";
      }
    })
    .catch(err => done(err));
});

module.exports = router;
