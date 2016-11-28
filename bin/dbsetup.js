var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var co = require('co');

var url = 'mongodb://localhost:27017/bird';

co(function* () {
  var db = yield MongoClient.connect(url);
  var user = db.collection('user');
  var r = yield user.createIndex({'identity.googleid': 1},
    {unique: true, sparse: true});
  console.log(r);
  db.close();
});
