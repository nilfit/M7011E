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

// returns the _id of the user
function findOrCreateGoogleUser(googleid) {
  return new Promise((resolve, reject) => {
    var col = db.collection('user');
    col.findOneAndUpdate({ identity : {googleid : googleid} },
      { identity : {googleid : googleid} },
      {upsert: true})
      .then(doc => {
        if (doc.ok != 1) {
          reject("upsert failed");
        } else if (doc.lastErrorObject.updatedExisting){
          resolve(doc.value);
        } else {
          resolve(doc.lastErrorObject.upserted);
        }
      });
  });
}

exports.findUserByIdString = findUserByIdString;
exports.findOrCreateGoogleUser = findOrCreateGoogleUser;
