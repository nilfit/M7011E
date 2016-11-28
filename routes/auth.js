var express = require('express');
var router = express.Router();
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var db = require('../db');

router.get('/google',
  passport.authenticate('google', { scope: ['openid'] }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
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
    clientID: "197500185071-lptrsekcf4fa4mjmi7kf2p86k9nebjt4.apps.googleusercontent.com",
    clientSecret: "Fw_H3S4OBX4t2i9M_A0rtUMX",
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    db.findOrCreateGoogleUser(profile.id)
      .then(user => done(null, user))
      .catch(err => done(err));
  }
));
passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser(function (_id, done) {
  db.findUserById(_id)
    .then(user => done(null, user))
    .catch(err => done(err));
});

module.exports = router;
