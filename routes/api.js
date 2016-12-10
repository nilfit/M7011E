var express = require('express');
var router = express.Router();
var co = require('co');
var db = require('../db');

router.get('/user/:id', (req, res, next) => {
  var userid = req.params['id'];
  if (typeof userid === 'string') {
    co(function* (){
      var doc = yield db.findUserByIdString(userid);
      res.json(doc);
    }).catch(function(err) {
      console.log(err.stack);
    });
  }
});

router.get('/post/:postid', (req, res) => {
  // TODO investigate if url parameters parsed by the router really need to be
  // string checked (or are they always strings?)
  var postid = req.params['postid'];
  if (typeof postid === 'string') {
    readStream = db.getPost(postid);
    try {
      // can fail with FileNotFound
      readStream.on('error', (err) => {
        // file not found
        if (err.code === 'ENOENT') {
          res.status(404).end();
        } else {
          res.status(500).end();
        }
      });
      readStream.pipe(res);
    } catch (err) {
    }
  } else {
    // generic server error
    res.status(500).end();
  }
});

router.get('/post/:postid/meta', (req, res) => {
  var postid = req.params['postid'];
  if (typeof postid === 'string') {
    db.getPostMeta(postid).then(doc => res.json(doc));
  } else {
    // generic server error
    res.status(500).end();
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
