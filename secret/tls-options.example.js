var fs = require('fs');
// change these paths so that key is your private key and cert is your certificate
var path = './secret/';
var key = fs.readFileSync(path + 'key.pem');
var cert = fs.readFileSync(path + 'cert.pem');

module.exports = {
  key: key,
  cert: cert
}
