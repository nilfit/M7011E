var express = require('express');
var router = express.Router();
var co = require('co');
var db = require('../db');
var streamifier = require('streamifier');
var dataUri = require('strong-data-uri')

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
      res.type('audio/wav')
      readStream.pipe(res);
    } catch (err) {
    }
  } else {
    // The request cannot be fulfilled due to bad syntax.
    res.status(400).end();
  }
});

router.get('/post/:postid/meta', (req, res) => {
  var postid = req.params['postid'];
  if (typeof postid === 'string') {
    db.getPostMeta(postid).then(doc => res.json(doc));
  } else {
    // The request cannot be fulfilled due to bad syntax.
    res.status(400).end();
  }
});

router.post('/post', (req, res) => {
  // userid has been checked and is valid if this route handler was invoked
  var userid = req.session.login;
  var tags = req.body.tags;
  var audioUri = req.body.audio;
  if(tags && audioUri) {
    var audio = dataUri.decode(audioUri);
    if (audio.mimetype !== 'audio/wav') {
      throw 'wrong mime type';
    }
    var audiostream = streamifier.createReadStream(audio);
    db.insertPost(userid, tags, audiostream).then(() => {
      res.status(200).end();
    });
  } else {
    // The request cannot be fulfilled due to bad syntax.
    res.status(400).end();
  }
});

router.get('/feed/:beforeDate', (req, res) => {
  var beforeDate = req.params['beforeDate'];
  if (typeof beforeDate === 'string') {
    var date = new Date(beforeDate);
    var pageSize = 10;
    db.getFeedBeforeDate(date, pageSize).then(feed => res.json(feed));
  } else {
    // The request cannot be fulfilled due to bad syntax.
    res.status(400).end();
  }
});

router.get('/feed', (req, res) => {
  var date = new Date();
  var pageSize = 10;
  db.getFeedBeforeDate(date, pageSize).then(feed => res.json(feed));
});

router.get('/tag/:tag/:beforeDate', (req, res) => {
  var beforeDate = req.params['beforeDate'];
  var tag = req.params['tag'];
  if (typeof beforeDate === 'string' && typeof tag === 'string') {
    var date = new Date(beforeDate);
    var pageSize = 10;
    db.getTagFeedBeforeDate(tag, date, pageSize).then(feed => res.json(feed));
  } else {
    // The request cannot be fulfilled due to bad syntax.
    res.status(400).end();
  }
});

router.get('/tag/:tag', (req, res) => {
  var tag = req.params['tag'];
  if (typeof tag === 'string') {
    var date = new Date();
    var pageSize = 10;
    db.getTagFeedBeforeDate(tag, date, pageSize).then(feed => res.json(feed));
  } else {
    // The request cannot be fulfilled due to bad syntax.
    res.status(400).end();
  }
});


// router.get('/profile/:username', function(req, res, next) {


module.exports = router;
