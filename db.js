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
    var db = yield MongoClient.connect(url);
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
      { $setOnInsert: {identity : {googleid : googleid}} },
      {upsert: true})
      .then(doc => {
        if (doc.ok != 1) {
          reject("upsert failed");
        } else if (doc.lastErrorObject.updatedExisting){
          resolve(doc.value._id);
        } else {
          resolve(doc.lastErrorObject.upserted);
        }
      });
  });
}

// returns a promise that resolves to the ObjectID of the inserted file.
function insertPost(userid, tags, audiostream) {
  return new Promise((resolve, reject) => {
    var metadata = {userid: userid, tags: tags};
    var options = {metadata: metadata, contentType: 'audio/wav'};
    var bucket = new mongodb.GridFSBucket(db, { bucketName: "post"});
    var uploadStream = bucket.openUploadStream('post.wav', options);
    uploadStream.once('finish', () => {
      console.log("file upload done");
      resolve(uploadStream.id);
    }).on('error', (err) => {
      reject(err);
    });
    audiostream.pipe(uploadStream);
  });
}

// returns a readStream of the file
// TODO add support for range requests, returning only the requested chunks
function getPost(fileidString) {
  // return new Promise((resolve, reject) => {
  var bucket = new mongodb.GridFSBucket(db, { bucketName: "post"});
  var fileid = ObjectID.createFromHexString(fileidString);
  var downloadStream = bucket.openDownloadStream(fileid);
  return downloadStream;
}

/**
*   returns a promise that resolves to an object containing metadata
*   {uploadDate: ISODate,
*    userid: ObjectID}
*/
function getPostMeta(fileidString, file) {
    // var bucket = new mongodb.GridFSBucket(db, { bucketName: "posts"});
  return new Promise((resolve, reject) => {
    var col = db.collection('post.files');
    var fileid = ObjectID.createFromHexString(fileidString);
    var fields = {contentType:1, uploadDate:1, metadata:1};
    col.findOne({_id: fileid}, {fields: fields}).then(doc => {
      resolve({
        postid: fileid,
        contentType: doc.contentType,
        uploadDate: doc.uploadDate,
        userid: doc.metadata.userid,
        tags: doc.metadata.tags
      });
    }).catch(err => reject(err));
  });
}

exports.findUserByIdString = findUserByIdString;
exports.findOrCreateGoogleUser = findOrCreateGoogleUser;
exports.insertPost = insertPost;
exports.getPost = getPost;
exports.getPostMeta = getPostMeta;
