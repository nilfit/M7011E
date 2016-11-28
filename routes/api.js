var express = require('express');
var router = express.Router();
var co = require('co');
var db = require('../db');

router.get('/user/:id', function(req, res, next) {
  var userid = req.params['id'];
  if (typeof userid === 'string') {
    co(function* (){
      var doc = yield db.findUserByIdString(userid);
      res.json(doc);
    }).catch(function(err) {
      console.log(err.stack);
    });;
  }
});

// router.get('/profile/:username', function(req, res, next) {
//   var username = req.params['username'];
//   if (typeof username === 'string') {
//     MongoClient.connect(dburl, function(err, db) {
//       var collection = db.collection('users');
//       collection.find({username : username}).each(function(err, doc) {
//         db.close();
//         res.json(doc);
//         // terminate the each
//         return false;
//       });
//     });
//   }
// });

module.exports = router;
