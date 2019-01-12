const {SHA256} = require('crypto-js');
//sha256 is now s hashing function

const bcrypt = require('bcryptjs');

let password = '123abc';

// bcrypt.genSalt(10, (err, salt)=>{
//   bcrypt.hash(password, salt, (err, hash)=>{
//     console.log(hash);
//   });
// });

let hashedPassword = "$2a$10$0XPZxax44I4ibt5BBndPieiIfxtwPlP.XVkBeOV.1zYh7LCq9NfWG";


bcrypt.compare(password, hashedPassword, (err, res)=>{
  console.log(res);
});


// const jwt = require('jsonwebtoken');
//
// let data = {
//   id: 10
// };
//
// let token = jwt.sign(data, '123abc'); //this will be sent to the Client
// console.log(token);
//
// let decoded = jwt.verify(token, '123abc');
// console.log('decoded', decoded);
