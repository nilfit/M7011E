var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var ObjectID = mongodb.ObjectID;
var co = require('co');

var url = 'mongodb://localhost:27017/bird';
var db;
// TODO ensure db is assigned before functions from this module try to use it
MongoClient.connect(url).then(value => db = value);

function findUserByIdString(useridString){
  return co(function*() {
    // var db = yield MongoClient.connect(url);
    var col = db.collection('user');
    var doc = yield col.findOne({_id : ObjectID.createFromHexString(useridString)});
    return doc;
  }).catch(function(err) {
    console.log(err.stack);
  });
}

function findOrCreateGoogleUser(googleid) {
  // TODO upsert with a partial index with unique constraints
  // TODO look into error handling
  return co(function*() {
    var col = db.collection('user');
    var doc = yield col.findOne({ identity : {googleid : googleid} });
    console.log("findUser..\n" + doc);
    if (doc == null) {
      doc = { identity: {googleid: googleid} };
      var r = yield col.insertOne(doc);
      console.log("user not found, inserted with _id " + doc._id);
    }
    return doc;
  });
}

exports.findUserByIdString = findUserByIdString;
exports.findUserById = findUserById;
exports.findOrCreateGoogleUser = findOrCreateGoogleUser;
