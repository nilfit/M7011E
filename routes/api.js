var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var co = require('co');

var dburl = 'mongodb://localhost:27017/bird';

// router.get('/', function(req, res, next) {
//   var example = {user : 'testuser', about : 'i am an example'};
//   res.json(example);
// });

router.get('/user/:id', function(req, res, next) {
  var userid = req.params['id'];
  if (typeof userid === 'string') {
    co(function*() {
      var db = yield MongoClient.connect(dburl);
      var col = db.collection('user');
      var cursor = col.find({_id : userid}).limit(1);
      // if (yield cursor.hasNext()) {
      var doc = cursor.next();
      res.json(doc);
      // }
      db.close();
    }).catch(function(err) {
      console.log(err.stack);
    });
  }
});

router.post('/user/:id', function(req, res, next) {
  // var userid = req.params['id'];
  // if (typeof userid === 'string') {
  //   co(function*() {
  //     var db = yield MongoClient.connect(dburl);
  //     var col = db.collection('user');
  //     var cursor = col.find({_id : userid}).limit(1);
  //     // if (yield cursor.hasNext()) {
  //     var doc = cursor.next();
  //     res.json(doc);
  //     // }
  //     db.close();
  //   }).catch(function(err) {
  //     console.log(err.stack);
  //   });
  // }
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
