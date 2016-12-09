var express = require('express');
var router = express.Router();
// var passport = require('passport');
// var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var googleVerifier = require('google-id-token-verifier');
var db = require('../db');
var secrets = require('../secret/secrets')

// router.get('/google',
//   passport.authenticate('google', { scope: ['openid'] }));

// router.post('/google/callback', passport.authenticate('google'),
//   (req, res) => {
//     res.status(200).end();
//   });

router.post('/google/callback', (req, res) => {
  googleVerifier.verify(req.body.idtoken, secrets.google.clientID, (err, tokenInfo) => {
    if (err) {
      console.log(err);
      res.status(401).end();
    } else {
      // console.log(tokenInfo);
      db.findOrCreateGoogleUser(tokenInfo.sub)
        .then(id => {
          req.session.login = id;
          res.status(200);
          res.send(id);
          res.end();
        }).catch(err => res.status(500).end());
    }
  });
});

router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) { res.status(500).end(); }
    else { res.status(200).end(); }
  })
  // req.logout();
  // res.redirect('/');
  // res.status(200).end();
  // TODO investigate if user really is logged out
  // this will be easier when there is ui for it
});

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
// passport.use(new GoogleStrategy({
//     clientID: secrets.google.clientID,
//     clientSecret: secrets.google.clientSecret,
//     callbackURL: "/auth/google/callback"
//   },
//   function(accessToken, refreshToken, profile, done) {
//     db.findOrCreateGoogleUser(profile.id)
//       .then(user => done(null, user))
//       .catch(err => done(err));
//   }
// ));
// passport.serializeUser((user, done) => done(null, user._id));
// passport.deserializeUser((_id, done) => {
//   db.findUserByIdString(_id)
//     .then(user => {
//       if (user) {
//         done(null, user);
//       } else {
//         throw "User deserialization failed";
//       }
//     })
//     .catch(err => done(err));
// });

module.exports = router;
