const {SHA256} = require('crypto-js');
//sha256 is now s hashing function

const jwt = require('jsonwebtoken');

var data = {
  id: 10
};

var token = jwt.sign(data, '123abc'); //this will be sent to the Client
console.log(token);

var decoded = jwt.verify(token, '123abc');
console.log('decoded', decoded);
