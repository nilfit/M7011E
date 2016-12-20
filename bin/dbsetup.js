var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var co = require('co');

var url = 'mongodb://localhost:27017/bird';

co(function* () {
  var db = yield MongoClient.connect(url);

  var user = db.collection('user');
  console.log("drop indexes from user")
  yield user.dropIndexes();
  console.log("index user collection with googleid");
  var r = yield user.createIndex({'identity.googleid':1},
    {unique: true, sparse: true});
  console.log(r);

  var post = db.collection('post.files');
  console.log("index post.files collection tags and upload date");
  r = yield post.createIndex({'metadata.tags':1, 'metadata.userid':1, 'uploadDate':-1});
  console.log(r);

  var follow = db.collection('follow');
  console.log("drop indexes from follow")
  yield follow.dropIndexes();
  console.log("index follow collection by follower");
  var r = yield follow.createIndex({followerid:1, followedid:1},
    {unique: true});
  // console.log(r);
  // console.log("index follow collection by followed");
  // var r = yield follow.createIndex({followedid:1});
  // console.log(r);

  db.close();
});
